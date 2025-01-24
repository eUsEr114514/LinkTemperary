from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

# 定义学生模型
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    class_name = db.Column(db.String(50), nullable=False)

# 初始化数据库
@app.before_first_request
def create_tables():
    db.create_all()

# 首页
@app.route('/')
def index():
    return render_template('index.html')

# 添加学生信息
@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    student = Student(student_id=data['student_id'], name=data['name'], class_name=data['class'])
    db.session.add(student)
    db.session.commit()
    return jsonify({"message": "Student added successfully"}), 201

# 获取学生信息
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    result = [{"id": s.id, "student_id": s.student_id, "name": s.name, "class": s.class_name} for s in students]
    return jsonify(result)

# 运行应用
if __name__ == '__main__':
    app.run(debug=True)