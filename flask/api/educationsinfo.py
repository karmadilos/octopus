from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

from db import cursor


parser = reqparse.RequestParser()



'''
EducationInfo APIs - 게시판 글 CRUD

'''
parser.add_argument('id')
parser.add_argument('school')
parser.add_argument('major')
parser.add_argument('degree')

class EducationsInfo(Resource):
    def get(self):  
        user = get_jwt_identity()
        sql = "SELECT * FROM `educations_info` WHERE user_id = (%s)"
        cursor.execute(sql, (args['id'])) 
        result = cursor.fetchall()
        
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "INSERT INTO `educations_info` (`school`,`major`,`degree`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (args['school'], args['major'], args['degree'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "created")
    
    @jwt_required()    
    def put(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "UPDATE `educations_info` SET `school` = %s, `major` = %s, `degree` = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['school'], args['major'], args['degree'], args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "updated")
    
    @jwt_required()
    def delete(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "DELETE FROM `educations_info` WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result =  "deleted")