from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

from db import cursor

portfolio = Blueprint('portfolio', __name__)

parser = reqparse.RequestParser()

# '''
# UserProfile APIs - 게시판 글 CRUD

# '''
# parser.add_argument('id')
# parser.add_argument('descriptions')

# class UserProfile(Resource):
#     def get(self):  
#         sql = "SELECT * FROM `educations_info` WHERE user_id = (%s)"
#         cursor.execute(sql, (args['id'])) 
#         result = cursor.fetchall()
#         return jsonify(status = "success", result = result)



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




'''
AwardsInfo APIs - 게시판 글 CRUD

'''

parser.add_argument('id')
parser.add_argument('award')
parser.add_argument('summary')

class AwardsInfo(Resource):
    def get(self):    
        user = get_jwt_identity()
        sql = "SELECT * FROM `awards_info` WHERE user_id = (%s)"
        cursor.execute(sql, (user['id'])) 
        result = cursor.fetchall()
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "INSERT INTO `awards_info` (`award`,`summary`,`user_id`) \
            VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (args['award'], args['summary'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "created")
    
    @jwt_required()    
    def put(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "UPDATE `awards_info` SET award = %s, summary = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['award'], args['summary'], args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "updated")
    
    @jwt_required()
    def delete(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "DELETE FROM awards_info` WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result =  "deleted")


# api.add_resource(AwardsInfo, '/awardsinfo')

'''
projectsInfo APIs - 게시판 글 CRUD

'''
parser.add_argument('id')
parser.add_argument('project')
parser.add_argument('summary')
parser.add_argument('date_start')
parser.add_argument('date_end')

class ProjectsInfo(Resource):
    def get(self):  
        user = get_jwt_identity()
        sql = "SELECT * FROM `projects_info` WHERE user_id = (%s)"
        cursor.execute(sql, (user['id'])) 
        result = cursor.fetchall()
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "INSERT INTO `projects_info` (`project`,`summary`,`date_start`, `date_end`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (args['project'], args['summary'], args['date_start'], args['date_end'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "created")
    
    @jwt_required()    
    def put(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "UPDATE `projects_info` SET `project` = %s, `summary` = %s, `date_start` = %s, `date_end` = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['project'], args['summary'], args['date_start'], args['date_end'], args['id'],  user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "updated")
    
    @jwt_required()
    def delete(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "DELETE FROM `projects_info` WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result =  "deleted")


# api.add_resource(ProjectsInfo, '/projectsinfo')

'''
certificatesInfo APIs - 게시판 글 CRUD

'''
parser.add_argument('id')
parser.add_argument('cerifications')
parser.add_argument('organization')
parser.add_argument('date_get')

class CertificationsInfo(Resource):
    @jwt_required()
    def get(self):  
        user = get_jwt_identity()
        sql = "SELECT * FROM `certifications_info` WHERE user_id = (%s)"
        cursor.execute(sql, (user['id'])) 
        result = cursor.fetchall()
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "INSERT INTO `certifications_info` (`certifications`,`organization`,`date_get`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (args['certifications'], args['organization'], args['date_get'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "created")
    
    @jwt_required()    
    def put(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "UPDATE `certifications_info` SET `certifications` = %s, `organizations` = %s, `date_get` = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['certifications'], args['organizations'], args['date_get'], args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result = "updated")
    
    @jwt_required()
    def delete(self):
        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "DELETE FROM `certifications_info` WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['id'], user['id']))
        db.commit()
        
        return jsonify(status = "success", result =  "deleted")


# api.add_resource(CertificationsInfo, '/certificationsinfo')