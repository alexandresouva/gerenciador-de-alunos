/* --------------------------
        Modal Student
-------------------------- */
let gradeContainer = document.getElementById('grade-container');
const inputName = document.getElementById('input-name');

const openStudentModal = () => {
  resetGradeInput();
  createGradeInput();

  $('.ui.large.modal')
    .modal('show');
}

const createGradeInput = () => {
  for (let i = 0; i < newNumColumns; i++) {

    const newDiv = document.createElement("div");
    gradeContainer.appendChild(newDiv);
    newDiv.classList.add('column', 'field');

    const newLabel = document.createElement("label");
    newLabel.textContent = `Nota ${i + 1}`;
    newDiv.appendChild(newLabel);

    const newInput = document.createElement("input");
    newInput.classList.add('input-grade');
    newDiv.appendChild(newInput);
  }
}

const resetGradeInput = () => {
  let totalGrades = gradeContainer.children.length;

  inputName.value = '';
  for (let i = 0; i < totalGrades; i++) {
    gradeContainer.removeChild(gradeContainer.children[0]);
  }
}

/* --------------------------
        Add Student
-------------------------- */
const tbody = document.getElementById('table-body');

const addStudent = () => {
  const tr = document.createElement("tr");
  tr.classList.add('student')
  tbody.appendChild(tr);

  const studentName = createTd(inputName.value, 'name');
  tr.appendChild(studentName);

  const grades = document.getElementsByClassName('input-grade');
  for (let i = 0; i < grades.length; i++) {
    td = document.createElement("td");
    td.textContent = grades[i].value;
    td.classList.add('grade');
    tr.appendChild(td);
  }

  const average = createTd('-', 'average');
  tr.appendChild(average);
  const status = createTd('Schrodinger 🐱', 'status');
  tr.appendChild(status);
}

const createTd = (content, className) => {
  let td = document.createElement("td");
  td.textContent = content;
  td.classList.add(className);
  return td;
}
