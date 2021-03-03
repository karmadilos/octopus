from flask import Flask, jsonify, request, Blueprint
from flask_restful import reqparse, abort, Api
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

from db import cursor

search_user = Blueprint('search_user', __name__)

parser.add_argument('id')
parser.add_argument('school')
parser.add_argument('major')