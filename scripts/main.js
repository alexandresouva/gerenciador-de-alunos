// Inital modal 
$('.ui.modal')
  .modal('show');

// Corrigir para classe
// Aprender a colocar marcações no VS Code
// Segundo parâmetro para outputClassName

const showInputValue = (inputClassName, labelClassName) => {

  const input = document.getElementsByClassName(inputClassName);

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', function () {
      const label = document.getElementsByClassName(labelClassName);

      for (let j = 0; j < label.length; j++) {
        label[j].textContent = this.value;
        input[j].value = this.value;
      }
    })
  }
}

showInputValue('num-of-grades', 'grades-label');
showInputValue('min-to-approval', 'approval-label');
showInputValue('min-to-recovery', 'recovery-label');


