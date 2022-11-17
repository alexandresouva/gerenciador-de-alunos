const resetTable = () => {
  sum = 0;
  overallSum = 0;
  average = [];
  while (tbody.firstElementChild) {
    tbody.removeChild(tbody.firstElementChild);
  }
  overallAverage.textContent = '--';
}

/* --------------------------
    Columns Manipulation
-------------------------- */
const thead = document.getElementById('table-head');
const students = document.getElementsByClassName('student');

let totalColumns;
let currentAmountOfGrades = 0;
let newAmountOfGrades;
let columnsDiff;

const changeTableColumns = () => {
  newAmountOfGrades = document.getElementsByClassName('num-of-grades')[0].value;

  if (newAmountOfGrades > currentAmountOfGrades &&
    currentAmountOfGrades < 6) {
    columnsDiff = newAmountOfGrades - currentAmountOfGrades;
    for (let i = 0; i < columnsDiff; i++) {
      createGradeColumn(thead);
      createGradeColumn();
      currentAmountOfGrades++;
    }
  } else {
    columnsDiff = currentAmountOfGrades - newAmountOfGrades;
    for (let i = 0; i < columnsDiff; i++) {
      deleteGradeColumn(thead);
      deleteGradeColumn();
      currentAmountOfGrades--;
    }
  }
  updateGradeHeader();
}

const createGradeColumn = (element) => {
  const isHeader = element === thead ? true : false;

  if (isHeader) {
    const newTh = document.createElement("th");
    element.appendChild(newTh);
    element.insertBefore(newTh, element.children[1]);
    totalColumns = element.children.length;
  } else {
    let newTd;
    for (let i = 0; i < students.length; i++) {
      newTd = document.createElement("td");
      newTd.classList.add('grade');
      students[i].insertBefore(newTd, students[i].children[totalColumns - 3]);
    }
  }
}

const deleteGradeColumn = (element) => {
  const isHeader = element === thead ? true : false;

  if (isHeader) {
    element.removeChild(element.children[totalColumns - 3]);
    totalColumns = element.children.length;
  } else {
    for (let i = 0; i < students.length; i++) {
      students[i].removeChild(students[i].children[totalColumns - 2]);
      totalColumns = students[i].children.length;
    }
  }
}

const updateGradeHeader = () => {
  for (let i = 1; i <= newAmountOfGrades; i++) {
    thead.children[i].textContent = `Nota ${i}`;
  }
}

/* --------------------------
        Average 
-------------------------- */
const overallAverage = document.getElementById('overall-average');
let average = [];
let currentStudent;
let sum = 0;
let overallSum = 0;

const calcAverage = () => {
  const qtyStudent = tbody.children.length;

  for (let i = 0; i < qtyStudent; i++) {
    currentStudent = tbody.children[i];

    for (let i = 0; i < currentStudent.children.length; i++) {
      if (currentStudent.children[i].classList.contains('grade')) {
        sum += Number(currentStudent.children[i].textContent);
      }
    }
    average[i] = Math.round(sum / newAmountOfGrades);
    sum = 0;
  }

  for (let i = 0; i < average.length; i++) {
    overallSum += average[i];
  }
  if (qtyStudent > 0) overallAverage.textContent = Math.round(overallSum / qtyStudent);
  overallSum = 0;
  sum = 0;

  showAverage();
  showStatus();
}

const showAverage = () => {
  const tdAverage = document.getElementsByClassName('average');

  if (newAmountOfGrades !== 0) {
    for (let i = 0; i < tdAverage.length; i++) {
      tdAverage[i].textContent = average[i];
    }
  }
}

const showStatus = () => {
  const minToApproval = Number(document.getElementsByClassName('min-to-approval')[0].value);
  const minToRecovery = Number(document.getElementsByClassName('min-to-recovery')[0].value);
  const tdStatus = document.getElementsByClassName('status');

  if (minToApproval === 0) {
    alert('Para ver a situação do(s) aluno(s), por favor, defina uma nota mínima de aprovação.');
  } else if (minToApproval > minToRecovery) {
    for (let i = 0; i < tdStatus.length; i++) {
      resetStyleClass(tdStatus[i]);

      if (average[i] >= minToApproval) {
        tdStatus[i].innerHTML = 'Aprovado <i class="check circle icon"></i>';
        tdStatus[i].classList.add('approved');
      } else if (average[i] >= minToRecovery && minToRecovery > 0) {
        tdStatus[i].innerHTML = 'Recuperação <i class="attention icon"></i>';
        tdStatus[i].classList.add('recovery');
      } else {
        tdStatus[i].innerHTML = 'Reprovado <i class="times icon"></i>';
        tdStatus[i].classList.add('disapproved');
      }
    }
  } else if (minToApproval === minToRecovery) {
    alert('A nota mínima de aprovação não pode ser igual a nota mínima de recuperação.');
  } else {
    alert('A nota para aprovação deve ser maior que a nota de recuperação. Caso não queria aplicar uma recuperação, deixe o campo zerado.');
  }
}

const resetStyleClass = (element) => {
  element.classList.remove('approved');
  element.classList.remove('recovery');
  element.classList.remove('disapproved');
}