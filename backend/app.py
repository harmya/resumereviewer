from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Hello World!'})


if __name__ == '__main__':
    app.run(debug=False)
    