// 添加学生信息
function addStudent() {
    const studentId = document.getElementById("student-id").value;
    const studentName = document.getElementById("student-name").value;
    const studentClass = document.getElementById("student-class").value;

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            student_id: studentId,
            name: studentName,
            class: studentClass
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("student-id").value = "";
        document.getElementById("student-name").value = "";
        document.getElementById("student-class").value = "";
        fetchStudents();
    });
}

// 获取学生列表
function fetchStudents() {
    fetch('/students')
    .then(response => response.json())
    .then(data => {
        const studentList = document.getElementById("student-list");
        studentList.innerHTML = "";
        data.forEach(student => {
            const li = document.createElement("li");
            li.textContent = `学号: ${student.student_id}, 姓名: ${student.name}, 班级: ${student.class}`;
            studentList.appendChild(li);
        });
    });
}

// 页面加载时获取学生列表
window.onload = fetchStudents;