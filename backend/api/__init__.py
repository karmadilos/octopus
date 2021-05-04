import re
import pymysql
from flask_cors import CORS
from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity
)

from resources.auth import auth
from resources.educationinfo import EducationInfo
from resources.awardsinfo import AwardsInfo
from resources.certificationsinfo import CertificationsInfo
from resources.projectsinfo import ProjectsInfo
from resources.users import UserProfile, UserList

def create_app():
    app = Flask(__name__)
    api = Api(app)
    
    app.config["JWT_SECRET_KEY"] = "secretkeybyjwt"
    jwt = JWTManager(app)
    CORS(app)

    app.register_blueprint(auth, url_prefix="")
    api.add_resource(EducationInfo, '/educationinfo/<int:user_id>')
    api.add_resource(AwardsInfo, '/awardsinfo/<int:user_id>')
    api.add_resource(CertificationsInfo, '/certificationsinfo/<int:user_id>')
    api.add_resource(ProjectsInfo, '/projectsinfo/<int:user_id>')
    api.add_resource(UserProfile, '/userprofile/<int:user_id>')
    api.add_resource(UserList, '/userlist')

    return app