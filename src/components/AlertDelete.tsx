import { confirmAlert } from 'react-confirm-alert';
const AlertDelete = () => {
  const clearForm = () => {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = false;
    }
  };
   const submit = () => {
        confirmAlert({
          title: 'Confirm to clear',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: clearForm
            },
            {
              label: 'No',
              onClick: () => {return}
            }
          ]
        });
      };
  return (
    <div className=''>
    <button className="bg-RED600 text-FOREGROUND hover:text-RED600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK" onClick={submit}>clear form</button>
    
  </div>
  )
}

export default AlertDelete