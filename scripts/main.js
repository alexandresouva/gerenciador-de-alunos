// Inital settings modal 
// $('.ui.small.modal')
//   .modal('show');


const syncInputValue = (inputClassName, labelClassName) => {

  const input = document.getElementsByClassName(inputClassName);
  let label;

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', function () {
      label = document.getElementsByClassName(labelClassName);

      for (let j = 0; j < label.length; j++) {
        label[j].textContent = this.value;
        input[j].value = this.value;
      }
    })
  }  
}

syncInputValue('num-of-grades', 'grades-label');
syncInputValue('min-to-approval', 'approval-label');
syncInputValue('min-to-recovery', 'recovery-label');


