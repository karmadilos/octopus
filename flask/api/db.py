import pymysql

db = pymysql.connect(
    user="root",
    passwd="",
    host="localhost",
    port=3306,
    db="portfolio",
    charset="utf8",
)

cursor = db.cursor()