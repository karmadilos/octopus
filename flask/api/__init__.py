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

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

from user_api import user
from educationsinfo import EducationsInfo

def create_app():
    app = Flask(__name__)
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = "secretkeybyjwt"
    jwt = JWTManager(app)

    CORS(app)

    app.register_blueprint(user, url_prefix="")

    api.add_resource(EducationsInfo, '/educationsinfo')


    return app