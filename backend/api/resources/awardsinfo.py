import pymysql

from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()

'''
AwardsInfo APIs 

'''
parser.add_argument('id')
parser.add_argument('award')
parser.add_argument('summary')

class AwardsInfo(Resource):

    def get(self, user_id = None): 

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        cursor = db.cursor()

        sql = "SELECT * FROM `awards_info` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id)) 
        result = cursor.fetchall()
        
        awardslist = [{"id" : i[0],"award" : i[1],"summary" : i[2]} for i in result]

        db.commit()
        db.close()

        return jsonify(status = "success", result = awardslist)

    @jwt_required()    
    def post(self, user_id):

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
        sql = "INSERT INTO `awards_info` (`award`,`summary`,`user_id`) VALUES (%s,%s,%s)"
        cursor.execute(sql, (args['award'], args['summary'], user_id))
        
        db.commit()
        db.close()
        
        return self.get(user_id)
    
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

        # user = get_jwt_identity()
        
        # if user['id'] == user_id:
        cursor = db.cursor()
        args = parser.parse_args()
        sql = "UPDATE `awards_info` SET award = %s, summary = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['award'], args['summary'], args['id'], user_id))
        db.commit()
        
        return self.get(user_id)
    
    @jwt_required()
    def delete(self, user_id):

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        cursor = db.cursor()
        sql = "DELETE FROM `awards_info` WHERE `id` IN (SELECT id FROM (SELECT id FROM `awards_info` \
            WHERE `user_id` = %s ORDER BY id DESC LIMIT 1) AS t)"
        cursor.execute(sql, (user_id))

        db.commit()
        db.close()

        return self.get(user_id)


