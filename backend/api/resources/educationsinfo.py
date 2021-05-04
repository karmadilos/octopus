import pymysql
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()

'''
EducationInfo APIs - 게시판 글 CRUD

'''
parser.add_argument('id')
parser.add_argument('school')
parser.add_argument('major')
parser.add_argument('degree')

class EducationInfo(Resource):

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

        sql = "SELECT * FROM `educations_info` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id)) 
        result = cursor.fetchall()

        educationlist = [{"id" : i[0],"school" : i[1], "major" : i[2], "degree" : i[3]} for i in result]

        db.commit()
        db.close()

        return jsonify(status = "success", result = educationlist)

    @jwt_required()    
    def post(self, user_id = None):

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        user = get_jwt_identity()
        error = None

        cursor = db.cursor()
        args = parser.parse_args()
        
        if not args['school']:
            error = "add school"
        if not args['major']:
            error = "add school"
        if not args['degree']:
            error = "add school"

        if error is None:
            sql = "INSERT INTO `educations_info` (`school`,`major`,`degree`,`user_id`) VALUES (%s,%s,%s,%s)"
            cursor.execute(sql, (args['school'], args['major'], args['degree'], user_id))
            db.commit()

            return self.get(user_id)
            
        db.commit()
        db.close()

        return jsonify(status="fail", result={"error": error}), 404

    @jwt_required()    
    def put(self, user_id = None):

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

        sql = "UPDATE `educations_info` SET `school` = %s, `major` = %s, `degree` = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['school'], args['major'], args['degree'], args['id'], user_id))
        
        db.commit()
        db.close()

        return self.get(user_id)
    
    @jwt_required()
    def delete(self, user_id = None):

        db = pymysql.connect(
            user="root",
            passwd="",
            host="localhost",
            port=3306,
            db="racer",
            charset="utf8",
            )

        user = get_jwt_identity()
        
        if user['id'] == user_id:
            cursor = db.cursor()
            sql = "DELETE FROM `educations_info` WHERE `id` IN (SELECT id FROM (SELECT id FROM `educations_info` \
                WHERE `user_id` = %s ORDER BY id DESC LIMIT 1) AS t)"
            cursor.execute(sql, (user_id))

            db.commit()
            db.close()

            return self.get(user_id)