import pymysql
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

parser = reqparse.RequestParser()

'''
projectsInfo APIs 

'''
parser.add_argument('id')
parser.add_argument('project')
parser.add_argument('summary')
parser.add_argument('date_start')
parser.add_argument('date_end')

class ProjectsInfo(Resource):
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

        sql = "SELECT * FROM `projects_info` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id)) 
        result = cursor.fetchall()
        
        projectslist = [{"id" : i[0],"project" : i[1],"summary" : i[2], "date_start" : i[3], "date_end" : i[4]} for i in result]

        db.commit()
        db.close()

        return jsonify(status = "success", result = projectslist)

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
        sql = "INSERT INTO `projects_info` (`project`,`summary`,`date_start`,`date_end`,`user_id`) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql, (args['project'], args['summary'], args['date_start'], args['date_end'], user_id))
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

        cursor = db.cursor()

        user = get_jwt_identity()
        args = parser.parse_args()
        sql = "UPDATE `projects_info` SET `project` = %s, `summary` = %s, `date_start` = %s, `date_end` = %s WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['project'], args['summary'], args['date_start'], args['date_end'], args['id'],  user_id))
        db.commit()
        db.close()

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

        user = get_jwt_identity()

        if user['id'] == user_id:
            cursor = db.cursor()
            sql = "DELETE FROM `projects_info` WHERE `id` IN (SELECT id FROM (SELECT id FROM `projects_info` WHERE `user_id` = %s ORDER BY id DESC LIMIT 1) AS t)"
            cursor.execute(sql, (user_id))

            db.commit()
            db.close()

            return self.get(user_id)


