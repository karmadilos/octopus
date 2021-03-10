import re
import pymysql
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

auth = Blueprint('auth', __name__)

# User APIs : Register / Login / Logout

# REGISTER API

parser = reqparse.RequestParser()
parser.add_argument('email')
parser.add_argument('password')
parser.add_argument('passwordcheck')
parser.add_argument('username')

@auth.route("/register", methods=["GET", "POST"])
def register():

    db = pymysql.connect(
    user="root",
    passwd="",
    host="localhost",
    port=3306,
    db="racer",
    charset="utf8",
    )

    cursor = db.cursor()

    c_email = re.compile('^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$')
    c_password = re.compile('^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$')

    if request.method == "POST":
        args = parser.parse_args()
        sql = "SELECT * FROM `user` WHERE `email` = %s"
        cursor.execute(sql, (args['email'],))
        email = cursor.fetchone()
        lst = []
        error = None

        if args['email'] == "" or args['password'] == "" or args['username'] == "":
            if args['email'] == "":
                lst.append("erroremail")
            if args['password'] == "":
                lst.append("errorpassword")
            if args['username'] == "":
                lst.append("errorusername")

            error = "fill in the blanks"
            return jsonify(status="fail", result={"error": error, "code" : lst}), 404

        if email is not None:
            error = "already registered"
            return jsonify(status="fail", result={"error": error}), 404

        if c_email.match(args['email']) == None : 
            error = "email not valid"
            return jsonify(status="fail", result={"error": error}), 404

        if c_password.match(args['password']) == None : 
            error = "password not valid"
            return jsonify(status="fail", result={"error": error}), 404
        
        if  args['password'] != args["passwordcheck"]: 
            error = "check password"
            return jsonify(status="fail", result={"error": error}), 404

        if error is None:
            sql = "INSERT INTO `user` (`username`, `email`, `password`) VALUES (%s, %s, %s)"
            cursor.execute(
                sql,
                (
                    args['username'],
                    args['email'],
                    generate_password_hash(args['password']),
                ),
            )
            db.commit()
            db.close()

            return jsonify(status="success", result="registered")



# LOGIN API

# session을 위한 secret_key 설정
# app.config.from_mapping(SECRET_KEY='dev')


@auth.route("/login", methods=["GET", "POST"])
def login():

    db = pymysql.connect(
        user="root",
        passwd="",
        host="localhost",
        port=3306,
        db="racer",
        charset="utf8",
    )

    cursor = db.cursor()


    if request.method == "POST":
        args = parser.parse_args()
        sql = "SELECT `email`, `password`, `id` FROM user WHERE `email` = %s"
        cursor.execute(sql, (args['email'],))
        user = cursor.fetchone()

        error = None

        if user is None:
            error = "Not registered"

        if not (user == None or check_password_hash(user[1], args['password'])):
            error = "Wrong password"

        if error is None:
            identifications = {'id': user[2], 'email': user[0]}
            access_token = create_access_token(identity=identifications, expires_delta=False)
            
            return jsonify(status="success", access_token = access_token, result = user[2])

        db.close()
        return jsonify(status="fail", result={"error": error}), 404

