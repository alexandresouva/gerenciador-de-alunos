const resetTable = () => {
  const students = document.getElementsByClassName('student');
  while (tbody.firstElementChild) {
    tbody.removeChild(tbody.firstElementChild);
  }
  overallAverage.textContent = '--';  
}
/* --------------------------
    Columns Manipulation
-------------------------- */
const thead = document.getElementById('table-head');

let totalColumns;
let currentNumColumns = 0;
let newNumColumns;
let columnsDiff;

const changeTableColumns = () => {
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
  thead.appendChild(newTh);
  thead.insertBefore(newTh, thead.children[position]);
  totalColumns = thead.children.length;
}

const deleteGradeColumn = () => {
  thead.removeChild(thead.children[totalColumns - 3]);
  totalColumns = thead.children.length;
}

const updateGradeHeader = () => {
  for (let i = 1; i < totalColumns - 2; i++) {
    thead.children[i].textContent = `Nota ${i}`;
  }
}

/* --------------------------
        Average 
-------------------------- */
const overallAverage = document.getElementById('overall-average');
let average = [];
let currentStudent;

const calcAverage = () => {
  const qtyStudent = tbody.children.length;
  let sum = 0;
  let overallSum = 0;


  for (let i = 0; i < qtyStudent; i++) {
    currentStudent = tbody.children[i];

    for (let i = 0; i < currentStudent.children.length; i++) {
      if (currentStudent.children[i].classList.contains('grade')) {
        sum += Number(currentStudent.children[i].textContent);
      }
    }
    average[i] = Math.round(sum / newNumColumns);
    sum = 0;
  }
  
  for (let i = 0; i < average.length; i++) {
    overallSum += average[i];
  }
  if (currentNumColumns > 0) overallAverage.textContent = overallSum / qtyStudent;
  overallSum = 0;

  showAverage();
  showStatus();
}

const showAverage = () => {
  const tdAverage = document.getElementsByClassName('average');

  if (newNumColumns = 0) {
    for (let i = 0; i < tdAverage.length; i++) {
      tdAverage[i].textContent = average[i];
    }
  }
}

const showStatus = () => {
  const minToApproval = document.getElementsByClassName('min-to-approval')[0].value;
  const minToRecovery = document.getElementsByClassName('min-to-recovery')[0].value;
  
  const tdStatus = document.getElementsByClassName('status');
  if (minToApproval > minToRecovery) {
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