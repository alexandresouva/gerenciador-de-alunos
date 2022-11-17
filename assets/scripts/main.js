// Inital settings modal 
$('.ui.small.modal')
  .modal('show');


const syncInputs = (inputClassName, labelClassName) => {

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

syncInputs('num-of-grades', 'grades-label');
syncInputs('min-to-approval', 'approval-label');
syncInputs('min-to-recovery', 'recovery-label');


