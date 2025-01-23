// 用户注册功能
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("用户名和密码不能为空！");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        alert("该用户名已存在！");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("注册成功！");
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// 显示注册界面
function showRegister() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("register-section").style.display = "block";
}

// 用户登录功能
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("登录成功，欢迎 " + username);
        document.getElementById("login-section").style.display = "none";
        document.getElementById("register-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";
        displayStudents();
    } else {
        alert("用户名或密码错误！");
    }
}

// 添加学生信息
function addStudent() {
    const studentId = document.getElementById("student-id").value;
    const studentName = document.getElementById("student-name").value;
    const studentClass = document.getElementById("student-class").value;

    if (!studentId || !studentName || !studentClass) {
        alert("请填写完整信息！");
        return;
    }

    const student = {
        id: studentId,
        name: studentName,
        class: studentClass
    };

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    alert("学生信息添加成功！");
    document.getElementById("student-id").value = "";
    document.getElementById("student-name").value = "";
    document.getElementById("student-class").value = "";
    displayStudents();
}

// 查询学生信息
function searchStudent() {
    const searchId = document.getElementById("search-id").value;
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(s => s.id === searchId);

    if (student) {
        alert("查询结果：\n学号：" + student.id + "\n姓名：" + student.name + "\n班级：" + student.class);
    } else {
        alert("未找到该学生信息！");
    }
}

// 显示学生列表
function displayStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const studentList = document.getElementById("student-list");
    studentList.innerHTML = "";

    students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `学号: ${student.id}, 姓名: ${student.name}, 班级: ${student.class}`;
        studentList.appendChild(li);
    });
}

// 导出学生信息到文本文件
function exportData() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    let data = "学生信息列表\n";
    students.forEach(student => {
        data += `学号: ${student.id}, 姓名: ${student.name}, 班级: ${student.class}\n`;
    });

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// 页面加载时显示学生列表
window.onload = displayStudents;