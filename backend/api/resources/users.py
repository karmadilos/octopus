import pymysql
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

"""
Login/Register APIs

"""

parser = reqparse.RequestParser()
parser.add_argument('email')
parser.add_argument('username')
parser.add_argument('descriptions')


class UserProfile(Resource):
    
    def get(self, user_id):
        
        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        cursor = db.cursor()

        
        sql = "SELECT * FROM `user` WHERE id = (%s)"
        cursor.execute(sql, (user_id))
        result = cursor.fetchone()
        db.commit()
        db.close()

        return jsonify(status = "success", 
            result = {
                "id" : result[0],
                "username" : result[1],
                "email" : result[2],
                "descriptions" :result[4]
            }               
        )          
    
    @jwt_required() 
    def put(self, user_id):

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        cursor = db.cursor()

        user = get_jwt_identity()
        args = parser.parse_args()

        if user['id'] == user_id:
            if args['username']:
                sql = "UPDATE `user` SET `username` = (%s) WHERE `id` = (%s)"
                cursor.execute(sql,(args['username'], user_id))

            if args['descriptions']:
                sql = "UPDATE `user` SET `descriptions` = (%s) WHERE `id` = (%s)"
                cursor.execute(sql,(args['descriptions'], user_id))

        # if image
        
        db.commit()
        db.close()
        return self.get(user_id)

"""
UserProfileList API 

"""

parser.add_argument('search')

class UserList(Resource):
    def get(self):

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        cursor = db.cursor()
        args = parser.parse_args()

        if args['search'] == None or args['search'] == "":
            sql = "SELECT * FROM `user`"
            cursor.execute(sql)
            result = cursor.fetchall()
            userlist = [{"id": i[0],"username": i[1], "email": i[2], "description": i[4] } for i in result]

        else:
            search = '%' + args['search'] + '%'
            sql = "SELECT * FROM `user` WHERE `username` Like (%s) "
            cursor.execute(sql, (search))
            result = cursor.fetchall()
            userlist = [{"id": i[0],"username": i[1], "email": i[2], "description": i[4] } for i in result]
            
        db.commit()
        db.close()
        return jsonify(status = "success", result = userlist)

