import os
import pymysql

from flask import Flask, request, jsonify, Blueprint
from werkzeug.utils import secure_filename

# 파일 업로드
@app.route('/fileupload', methods=['POST']
def file_upload():
	file = request.files['file']
    	
        filename = secure_filename(file.filename)
    	os.makedirs(image_path, exists_ok=True)
        file.save(os.path.join(image_path, filename)
        
        return


class UploadImage(Resource):
   def post(self):
     parse = reqparse.RequestParser()
     parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='images')
     args = parse.parse_args()
     image_file = args['file']
     image_file.save("your_file_name.jpg")