/* =====================================================
   STUDENT RESULT MANAGEMENT SYSTEM
   COMPLETE SCRIPT
===================================================== */


/* =====================================================
   STORAGE
===================================================== */
/* =====================================================
   ADMIN LOGIN
===================================================== */

const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("adminUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("adminPassword")
                    .value
                    .trim();

            const loginError =
                document.getElementById("loginError");

            const loginSection =
                document.getElementById(
                    "adminLoginSection"
                );

            const dashboard =
                document.getElementById(
                    "adminDashboard"
                );


            /*
               CHANGE THESE IF YOU WANT
               YOUR OWN USERNAME/PASSWORD
            */

            const correctUsername = "admin";
            const correctPassword = "admin123";


            if (
                username === correctUsername &&
                password === correctPassword
            ) {

                loginError.textContent = "";

                loginSection.classList.add(
                    "hidden"
                );

                dashboard.classList.remove(
                    "hidden"
                );

                loadDashboard();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

            else {

                loginError.textContent =
                    "Invalid username or password.";

            }

        }
    );

}

let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


/* =====================================================
   SAVE STUDENTS
===================================================== */

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* =====================================================
   GRADE
===================================================== */

function getGrade(total) {

    total = Number(total);

    if (total >= 90) {
        return "O";
    }

    if (total >= 80) {
        return "A+";
    }

    if (total >= 70) {
        return "A";
    }

    if (total >= 60) {
        return "B+";
    }

    if (total >= 50) {
        return "B";
    }

    if (total >= 40) {
        return "C";
    }

    return "F";
}


/* =====================================================
   GRADE POINT
===================================================== */

function getGradePoint(total) {

    total = Number(total);

    if (total >= 90) {
        return 10;
    }

    if (total >= 80) {
        return 9;
    }

    if (total >= 70) {
        return 8;
    }

    if (total >= 60) {
        return 7;
    }

    if (total >= 50) {
        return 6;
    }

    if (total >= 40) {
        return 5;
    }

    return 0;
}


/* =====================================================
   CALCULATE TOTAL
===================================================== */

function calculateTotal(student) {

    let total = 0;

    if (
        !student ||
        !student.subjects
    ) {
        return 0;
    }


    student.subjects.forEach(
        function(subject) {

            total +=
                Number(subject.internal || 0)
                +
                Number(subject.external || 0);

        }
    );


    return total;
}


/* =====================================================
   CALCULATE PERCENTAGE
===================================================== */

function calculatePercentage(student) {

    if (
        !student ||
        !student.subjects ||
        student.subjects.length === 0
    ) {
        return 0;
    }


    const total =
        calculateTotal(student);


    const maximumMarks =
        student.subjects.length * 100;


    if (maximumMarks === 0) {
        return 0;
    }


    return (
        total / maximumMarks
    ) * 100;

}


/* =====================================================
   CALCULATE SGPA
===================================================== */

function calculateSGPA(student) {

    let totalCreditPoints = 0;

    let totalCredits = 0;


    if (
        !student ||
        !student.subjects
    ) {
        return 0;
    }


    student.subjects.forEach(
        function(subject) {

            const total =
                Number(subject.internal || 0)
                +
                Number(subject.external || 0);


            const gradePoint =
                getGradePoint(total);


            const credits =
                Number(subject.credits || 0);


            totalCreditPoints +=
                gradePoint * credits;


            totalCredits +=
                credits;

        }
    );


    if (totalCredits === 0) {
        return 0;
    }


    return (
        totalCreditPoints /
        totalCredits
    );

}


/* =====================================================
   GET RESULT
===================================================== */

function getResult(student) {

    if (
        !student ||
        !student.subjects ||
        student.subjects.length === 0
    ) {
        return "FAIL";
    }


    const failedSubject =
        student.subjects.some(
            function(subject) {

                const total =
                    Number(subject.internal || 0)
                    +
                    Number(subject.external || 0);


                return total < 40;

            }
        );


    if (failedSubject) {
        return "FAIL";
    }


    return "PASS";

}


/* =====================================================
   ADD SUBJECT ROW
===================================================== */

function addSubjectRow() {

    const container =
        document.getElementById(
            "subjectContainer"
        );


    if (!container) {
        return;
    }


    const row =
        document.createElement("div");


    row.className =
        "subject-row";


    row.innerHTML = `

        <input
            type="text"
            class="subject-code"
            placeholder="Subject Code"
            required
        >

        <input
            type="text"
            class="subject-name"
            placeholder="Subject Name"
            required
        >

        <input
            type="number"
            class="subject-internal"
            placeholder="Internal"
            min="0"
            max="25"
            required
        >

        <input
            type="number"
            class="subject-external"
            placeholder="External"
            min="0"
            max="75"
            required
        >

        <input
            type="number"
            class="subject-credits"
            placeholder="Credits"
            min="1"
            max="10"
            required
        >

    `;


    container.appendChild(row);

}


/* =====================================================
   ADD STUDENT FORM
===================================================== */

const studentForm =
    document.getElementById(
        "studentForm"
    );


if (studentForm) {

    studentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* STUDENT DETAILS */

            const rollNumber =
                document
                    .getElementById(
                        "rollNumber"
                    )
                    .value
                    .trim();

            const duplicateStudent = students.find(
    function(student) {
        return student.rollNumber.toLowerCase() ===
               rollNumber.toLowerCase();
    }
  );

if (duplicateStudent) {

    alert(
        "This Roll Number already exists."
    );

    return;
}

            const name =
                document
                    .getElementById(
                        "studentName"
                    )
                    .value
                    .trim();


            const dob =
                document
                    .getElementById(
                        "studentDob"
                    )
                    .value;


            const course =
                document
                    .getElementById(
                        "studentCourse"
                    )
                    .value;


            const department =
                document
                    .getElementById(
                        "studentDepartment"
                    )
                    .value;


            const semester =
                document
                    .getElementById(
                        "studentSemester"
                    )
                    .value;


            /* CHECK DUPLICATE */

            const duplicate =
                students.some(
                    function(student) {

                        return (
                            String(
                                student.rollNumber
                            ).toLowerCase()
                            ===
                            rollNumber.toLowerCase()
                        );

                    }
                );


            if (duplicate) {

                alert(
                    "A student with this Roll Number already exists."
                );

                return;

            }


            /* SUBJECTS */

            const rows =
                document.querySelectorAll(
                    ".subject-row"
                );


            const subjects = [];


            rows.forEach(
                function(row) {

                    const code =
                        row
                            .querySelector(
                                ".subject-code"
                            )
                            .value
                            .trim();


                    const subjectName =
                        row
                            .querySelector(
                                ".subject-name"
                            )
                            .value
                            .trim();


                    const internal =
                        Number(
                            row
                                .querySelector(
                                    ".subject-internal"
                                )
                                .value
                        );


                    const external =
                        Number(
                            row
                                .querySelector(
                                    ".subject-external"
                                )
                                .value
                        );


                    const credits =
                        Number(
                            row
                                .querySelector(
                                    ".subject-credits"
                                )
                                .value
                        );


                    subjects.push({

                        code: code,

                        name: subjectName,

                        internal: internal,

                        external: external,

                        credits: credits

                    });

                }
            );


            if (
                subjects.length === 0
            ) {

                alert(
                    "Please add at least one subject."
                );

                return;

            }


            /* CREATE STUDENT */

            const newStudent = {

                rollNumber: rollNumber,

                name: name,

                dob: dob,

                course: course,

                department: department,

                semester: semester,

                subjects: subjects

            };


            /* SAVE */

            students.push(
                newStudent
            );


            saveStudents();


            alert(
                "Student result saved successfully."
            );


            /* RESET FORM */

            studentForm.reset();


            /* RESET SUBJECTS */

            const container =
                document.getElementById(
                    "subjectContainer"
                );


            if (container) {

                container.innerHTML = `

                    <div class="subject-row">

                        <input
                            type="text"
                            class="subject-code"
                            placeholder="Subject Code"
                            required
                        >

                        <input
                            type="text"
                            class="subject-name"
                            placeholder="Subject Name"
                            required
                        >

                        <input
                            type="number"
                            class="subject-internal"
                            placeholder="Internal"
                            min="0"
                            max="25"
                            required
                        >

                        <input
                            type="number"
                            class="subject-external"
                            placeholder="External"
                            min="0"
                            max="75"
                            required
                        >

                        <input
                            type="number"
                            class="subject-credits"
                            placeholder="Credits"
                            min="1"
                            max="10"
                            required
                        >

                    </div>

                `;

            }


            loadDashboard();

        }
    );

}


/* =====================================================
   LOAD DASHBOARD
===================================================== */

function loadDashboard() {

    students =
        JSON.parse(
            localStorage.getItem("students")
        ) || [];


    const totalStudents =
        document.getElementById(
            "totalStudents"
        );


    const totalResults =
        document.getElementById(
            "totalResults"
        );


    const passedStudents =
        document.getElementById(
            "passedStudents"
        );


    const failedStudents =
        document.getElementById(
            "failedStudents"
        );


    if (totalStudents) {

        totalStudents.textContent =
            students.length;

    }


    if (totalResults) {

        totalResults.textContent =
            students.length;

    }


    let passed = 0;

    let failed = 0;


    students.forEach(
        function(student) {

            if (
                getResult(student)
                ===
                "PASS"
            ) {

                passed++;

            }

            else {

                failed++;

            }

        }
    );


    if (passedStudents) {

        passedStudents.textContent =
            passed;

    }


    if (failedStudents) {

        failedStudents.textContent =
            failed;

    }
    
    /* Average Percentage */

const averagePercentage =
    document.getElementById(
        "averagePercentage"
    );

if (averagePercentage) {

    let totalPercentage = 0;

    students.forEach(
        function(student) {

            totalPercentage +=
                calculatePercentage(student);

        }
    );

    const average =
        students.length > 0
            ? totalPercentage / students.length
            : 0;

    averagePercentage.textContent =
        average.toFixed(2) + "%";

    }

    displayStudentRecords();

}


/* =====================================================
   DISPLAY STUDENT RECORDS
===================================================== */

function displayStudentRecords(
    list = students
) {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (list.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center; padding:20px;">

                    No student records found.

                </td>

            </tr>

        `;

        return;
    }


    list.forEach(
        function(student) {

            /*
               Find the student's real position
               inside the main students array.
            */

            const originalIndex =
                students.indexOf(student);


            const row =
                document.createElement("tr");


            const result =
                getResult(student);


            row.innerHTML = `

                <td>
                    ${student.rollNumber}
                </td>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.course}
                </td>

                <td>
                    ${student.department || "-"}
                </td>

                <td>
                    ${student.semester}
                </td>

                <td>
                    ${result}
                </td>

                <td>

                    <button
                        type="button"
                        class="edit-button"
                        onclick="editStudent(${originalIndex})"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-button"
                        onclick="deleteStudent(${originalIndex})"
                    >
                        Delete
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}
/* =====================================================
   SEARCH STUDENTS
===================================================== */

function searchStudents() {

    const searchInput =
        document.getElementById("searchStudent");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchText === "") {

        displayStudents(students);

        return;
    }


    const filteredStudents =
        students.filter(function(student) {

            const roll =
                String(student.rollNumber || "")
                    .toLowerCase();

            const name =
                String(student.name || "")
                    .toLowerCase();

            return (
                roll.includes(searchText) ||
                name.includes(searchText)
            );

        });


    displayStudents(filteredStudents);

}


/* =====================================================
   DELETE STUDENT
===================================================== */

function deleteStudent(index) {

    if (
        index < 0 ||
        index >= students.length
    ) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this student record?"
        );


    if (!confirmation) {
        return;
    }


    students.splice(
        index,
        1
    );


    saveStudents();


    loadDashboard();


    alert(
        "Student record deleted."
    );

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(index) {

    const student = students[index];

    if (!student) {
        return;
    }

    const newName = prompt(
        "Student Name:",
        student.name
    );

    if (newName === null) {
        return;
    }

    const newCourse = prompt(
        "Course:",
        student.course
    );

    if (newCourse === null) {
        return;
    }

    const newDepartment = prompt(
        "Department:",
        student.department
    );

    if (newDepartment === null) {
        return;
    }

    const newSemester = prompt(
        "Semester:",
        student.semester
    );

    if (newSemester === null) {
        return;
    }

    if (newName.trim() === "") {
        alert("Student name cannot be empty.");
        return;
    }

    student.name = newName.trim();
    student.course = newCourse.trim();
    student.department = newDepartment.trim();
    student.semester = newSemester.trim();

    saveStudents();

    loadDashboard();

    alert("Student record updated successfully.");

}

/* =====================================================
   CLEAR ALL STUDENTS
===================================================== */

function clearAllStudents() {

    const confirmation =
        confirm(
            "Are you sure you want to delete all student records?"
        );


    if (!confirmation) {
        return;
    }


    students = [];


    saveStudents();


    loadDashboard();


    alert(
        "All student records have been cleared."
    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return dateString;
    }


    return (
        parts[2]
        +
        "-"
        +
        parts[1]
        +
        "-"
        +
        parts[0]
    );

}


/* =====================================================
   LOAD RESULT PAGE
===================================================== */

function loadResultPage() {

    const storedStudent =
        localStorage.getItem(
            "selectedStudent"
        );


    if (!storedStudent) {

        window.location.href =
            "index.html";

        return;

    }


    const student =
        JSON.parse(
            storedStudent
        );


    const roll =
        document.getElementById(
            "displayRollNumber"
        );


    const name =
        document.getElementById(
            "displayName"
        );


    const dob =
        document.getElementById(
            "displayDob"
        );


    const course =
        document.getElementById(
            "displayCourse"
        );


    const department =
        document.getElementById(
            "displayDepartment"
        );


    const semester =
        document.getElementById(
            "displaySemester"
        );


    if (roll) {

        roll.textContent =
            student.rollNumber;

    }


    if (name) {

        name.textContent =
            student.name;

    }


    if (dob) {

        dob.textContent =
            formatDate(
                student.dob
            );

    }


    if (course) {

        course.textContent =
            student.course;

    }


    if (department) {

        department.textContent =
            student.department;

    }


    if (semester) {

        semester.textContent =
            student.semester;

    }


    displaySeparateResult(
        student
    );

}


/* =====================================================
   DISPLAY RESULT
===================================================== */

function displaySeparateResult(
    student
) {

    const marksTable =
        document.getElementById(
            "marksTable"
        );


    if (!marksTable) {
        return;
    }


    marksTable.innerHTML = "";


    if (
        !student.subjects ||
        student.subjects.length === 0
    ) {

        marksTable.innerHTML = `

            <tr>

                <td colspan="9"
                    style="text-align:center;">

                    No subject records available.

                </td>

            </tr>

        `;

        return;

    }


    student.subjects.forEach(
        function(subject, index) {

            const internal =
                Number(
                    subject.internal
                );


            const external =
                Number(
                    subject.external
                );


            const total =
                internal + external;


            const grade =
                getGrade(total);


            const gradePoint =
                getGradePoint(total);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${subject.code}
                </td>

                <td>
                    ${subject.name}
                </td>

                <td>
                    ${internal}
                </td>

                <td>
                    ${external}
                </td>

                <td>
                    ${total}
                </td>

                <td>
                    ${grade}
                </td>

                <td>
                    ${gradePoint}
                </td>

                <td>
                    ${subject.credits}
                </td>

            `;


            marksTable.appendChild(
                row
            );

        }
    );


    const total =
        calculateTotal(
            student
        );


    const percentage =
        calculatePercentage(
            student
        );


    const sgpa =
        calculateSGPA(
            student
        );


    const result =
        getResult(
            student
        );


    const displayTotal =
        document.getElementById(
            "displayTotal"
        );


    const displayPercentage =
        document.getElementById(
            "displayPercentage"
        );


    const displaySGPA =
        document.getElementById(
            "displaySGPA"
        );


    const displayResult =
        document.getElementById(
            "displayResult"
        );


    if (displayTotal) {

        displayTotal.textContent =
            total
            +
            " / "
            +
            (
                student.subjects.length
                * 100
            );

    }


    if (displayPercentage) {

        displayPercentage.textContent =
            percentage.toFixed(2)
            +
            "%";

    }


    if (displaySGPA) {

        displaySGPA.textContent =
            sgpa.toFixed(2);

    }


    if (displayResult) {

        displayResult.textContent =
            result;

    }

}


/* =====================================================
   PRINT RESULT
===================================================== */

function printResult() {

    window.print();

}


/* =====================================================
   START RESULT PAGE
===================================================== */

if (
    window.location.pathname.endsWith(
        "result.html"
    )
) {

    loadResultPage();

}

function logoutAdmin() {

    const dashboard =
        document.getElementById(
            "adminDashboard"
        );

    const loginSection =
        document.getElementById(
            "adminLoginSection"
        );

    if (dashboard) {

        dashboard.classList.add(
            "hidden"
        );

    }

    if (loginSection) {

        loginSection.classList.remove(
            "hidden"
        );

    }

    if (adminLoginForm) {

        adminLoginForm.reset();

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* =====================================================
   COURSE → DEPARTMENT
===================================================== */

const courseSelect =
    document.getElementById("studentCourse");

const departmentSelect =
    document.getElementById("studentDepartment");


if (courseSelect && departmentSelect) {

    courseSelect.addEventListener(
        "change",
        function() {

            const course =
                courseSelect.value;

            departmentSelect.innerHTML = `
                <option value="">
                    Select Department
                </option>
            `;


            let departments = [];


            if (course === "MCA") {

                departments = [
                    "Computer Applications"
                ];

            }

            else if (course === "MBA") {

                departments = [
                    "Management Studies"
                ];

            }

            else if (course === "M.Com") {

                departments = [
                    "Commerce"
                ];

            }

            else if (course === "M.Sc") {

                departments = [
                    "Computer Science",
                    "Mathematics",
                    "Physics",
                    "Chemistry"
                ];

            }

            else if (course === "BCA") {

                departments = [
                    "Computer Applications"
                ];

            }

            else if (course === "B.Sc") {

                departments = [
                    "Computer Science",
                    "Mathematics",
                    "Physics",
                    "Chemistry"
                ];

            }

            else if (course === "B.Com") {

                departments = [
                    "Commerce"
                ];

            }

            else if (course === "BA") {

                departments = [
                    "Management Studies"
                ];

            }


            departments.forEach(
                function(department) {

                    const option =
                        document.createElement("option");

                    option.value =
                        department;

                    option.textContent =
                        department;

                    departmentSelect.appendChild(
                        option
                    );

                }
            );

        }
    );

}
