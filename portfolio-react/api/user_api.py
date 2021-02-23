import pymysql
from flask import Flask, jsonify, request, render_template, redirect, session, url_for, flash
from flask_restful import reqparse, abort, Api, Resource

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

app = Flask(__name__)
api - Api(app)

#db 가상환경 구축 방법 검색 필요
db = pymysql.connect(
        user = 'root',
        passwd = '1234',
        host = '127.0.0.1',
        port = 3306,
        db = 'portfolio',
        charset = 'utf8'
)

cursor = db.cursor()

# User APIs : Register / Login / Logout

# REGISTER API

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password')
parser.add_argument('check_password')

@app.route('/registration', methods = ('GET', 'POST'))
def register():
    if request.method == 'POST':
        args = parser.parse_args()
        sql = "SELECT 'email' FROM 'user' WHERE 'email' = %s"
        cursor.execute(sql, (args['email'],))
        email = cursor.fetchone()
    
        error = None

        if email is not None : 
            error = '이미 등록된 계정입니다.'

        # if args['username'], args['email'], args['password'] is None : if email exists return wrong email

        if args['check_password'] != args['password']:
            error = '비밀번호를 다시 입력해주시기 바랍니다.'

        if error is None:
            sql = "INSERT INTO 'user' ('username', 'email', 'password') VALUES (%s, %s, %s)"
            cursor.execute(sql, (args['username'], args['email'], generate_password_hash(args['password'])))
            db.commit()

            return return jsonify(status = "success", result = {"registered"})
        
        return jsonify(status = "fail", result = {"error": error})


#LOGIN API

# session을 위한 secret_key 설정
app.config.from_mapping(SECRET_KEY='dev')

parser.add_argument('email')
parser.add_argument('password')

@app.route('/', methods = ('GET', 'POST'))
def login(self):
    if request.method = 'POST':
        args = parser.parse_args() 
        sql = "SELECT 'email', 'password' FROM user WHERE email = %s"
        cursor.execute(sql, (args['email'],))
        user = cursor.fetchone()

        error = None

        if user in None:
            error = "등록되지 않은 계정입니다."

        if not (user == None or check_password_hash(user[1], password)):
            error = '비밀번호를 확인해주세요'

        if error is None:
            session.clear()
            session['user_email'] = args['email']

            return jsonify(status = "success", result = {"login"})
        
        return  jsonify(status = "fail", result = {"error": error})


#LOGOUT API

@app.route('/')
def logout():
    if session is None:
        return  jsonify(status = "fail", result = {"error": "로그인 상태가 아닙니다."})
    else:
        session.clear()

        return jsonify(status = "success", result = {"msg": "logout!"})


if __name__ == '__main__':
    app.run()