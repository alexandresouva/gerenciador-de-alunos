const table = document.getElementById('grade-table');
const tableHeader = document.getElementById('table-header');

let totalColumns;
let newNumColumns;
let currentNumColumns = 0;
let columnsDiff;

const updateNumTableColumns = () => {
  newNumColumns = document.getElementsByClassName('num-of-grades')[0].value;

  if (newNumColumns > currentNumColumns &&
    !(currentNumColumns > 6)) {
    columnsDiff = newNumColumns - currentNumColumns;
    for (let i = 0; i < columnsDiff; i++) {
      createGradeColumn();
      currentNumColumns++;
    }
  } else {
    columnsDiff = currentNumColumns - newNumColumns;
    for (let i = 0; i < columnsDiff; i++) {
      deleteGradeColumn();
      currentNumColumns--;
    }
  }
  updateGradeHeader();
}

const createGradeColumn = () => {
  let position = 1;
  let newTh = document.createElement("th");
  tableHeader.appendChild(newTh);
  tableHeader.insertBefore(newTh, tableHeader.children[position]);
  totalColumns = tableHeader.children.length;
}

const deleteGradeColumn = () => {
  tableHeader.removeChild(tableHeader.children[totalColumns - 3]);
  totalColumns = tableHeader.children.length;
}

const updateGradeHeader = () => {
  for (let i = 1; i < totalColumns - 2; i++) {
    tableHeader.children[i].textContent = `Avaliação ${i}`;
  }
}

// Add students

let gradeContainer;

const addStudent = () => {
  openStudentModal();
  createGradeInput();
}

const openStudentModal = () => {
  $('.ui.large.modal')
  .modal('show');
}

const createGradeInput = () => {
  gradeContainer = document.getElementById('grade-container');

  for (let i = 0; i < columnsDiff; i++) {
    const newDiv = document.createElement("div");
    gradeContainer.appendChild(newDiv);
    newDiv.classList.add('column', 'field');
    
    const newLabel = document.createElement("label");
    newLabel.textContent = `Nota ${i + 1}`;  
    newDiv.appendChild(newLabel);
  
    const newInput = document.createElement("input");
    newDiv.appendChild(newInput);  
  }
}

const deleteGradeInput = () => {
  let totalGrades = gradeContainer.children.length;
  gradeContainer.removeChild(gradeContainer.children[totalGrades - 1]);
}
