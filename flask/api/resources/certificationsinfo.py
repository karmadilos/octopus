import pymysql
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

db = pymysql.connect(
    user="root",
    passwd="",
    host="localhost",
    port=3306,
    db="racer",
    charset="utf8",
    )


cursor = db.cursor()

parser = reqparse.RequestParser()

'''
certificatesInfo APIs 

'''
parser.add_argument('id')
parser.add_argument('certification')
parser.add_argument('organization')
parser.add_argument('date_validate')

class CertificationsInfo(Resource):
    
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
        sql = "SELECT * FROM `certifications_info` WHERE `user_id` = %s"
        cursor.execute(sql, (user_id)) 
        result = cursor.fetchall()
        
        certificationslist = [{"id" : i[0], "certification" : i[1],"organization" : i[2], "date_validate" : i[3]} for i in result]

        db.commit()
        db.close()

        return jsonify(status = "success", result = certificationslist)

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

        sql = "INSERT INTO `certifications_info` (`certification`,`organization`, `date_validate`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (args['certification'], args['organization'], args["date_validate"], user_id))
        
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
        args = parser.parse_args()

        sql = "UPDATE `certifications_info` SET `certification` = %s, `organization` = %s, `date_validate` = %s \
                WHERE `id` = %s AND `user_id` = %s"
        cursor.execute(sql, (args['certification'], args['organization'], args["date_validate"], args['id'], user_id))
       
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

        cursor = db.cursor()
        sql = "DELETE FROM `certifications_info` WHERE `id` IN (SELECT id FROM (SELECT id FROM `certifications_info` \
            WHERE `user_id` = %s ORDER BY id DESC LIMIT 1) AS t)"
        cursor.execute(sql, (user_id))

        db.commit()
        db.close()

        return self.get(user_id)

