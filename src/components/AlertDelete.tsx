import { confirmAlert } from "react-confirm-alert";
const AlertDelete = () => {
  const clearForm = () => {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = false;
    }
  };
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
         <div className=" w-full flex flex-col gap-5 font-Viga ">
           <div className="flex flex-col bg-BACKGROUND_DARK p-5 rounded-lg gap-3">
            <h1 className=" text-RED300">Confirm to clear</h1>
            <p className=" text-FOREGROUND">Are you sure to do this.</p>
           <div className="flex justify-between items-center">
           <button 
           className="px-5 py-2 bg-RED600 text-white rounded-xl"
              onClick={() => {
                clearForm();
            onClose()
              }}
            >
              Yes
            </button>
            <button
             className="px-5 py-2 bg-GREEN500 text-white rounded-xl"
              onClick={() => {
             return
              }}
            >
              Cancle
            </button>
           </div>
          </div>
         </div>
        );
      },
      // title: 'Confirm to clear',
      // message: 'Are you sure to do this.',
      // buttons: [
      //   {
      //     label: 'Yes',
      //     onClick: clearForm
      //   },
      //   {
      //     label: 'No',
      //     onClick: () => {return}
      //   }
      // ]
    });
  };
  return (
    <div className="">
      <button
        className="bg-RED600 text-FOREGROUND hover:text-RED600 hover:bg-FOREGROUND  px-8 py-2 rounded-lg font-Viga duration-300 shadow-lg shadow-BACKGROUND_DARK"
        onClick={submit}
      >
        clear form
      </button>
    </div>
  );
};

export default AlertDelete;
