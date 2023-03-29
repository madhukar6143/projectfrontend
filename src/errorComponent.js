const handleErrors = (error, addToast) => {
  
    if (error.response.status) {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismissTimeout: 1000,
    })}
     else {
      addToast(error.message, {
        appearance: "error",
        autoDismissTimeout: 1000,
      });
    }
  };
  
  export default handleErrors;
  

  /*
  if (error.response.status === 409) {
    addToast(error.response.data.message, {
      appearance: "error",
      autoDismissTimeout: 1000,
    });
  } else if (error.response.status ===500) {
    addToast("Internal server error", {
      appearance: "error",
      autoDismissTimeout: 1000,
    });
  }else if (error.response.status === 400) {
    addToast(error.response.data.message, {
      appearance: "error",
      autoDismissTimeout: 1000,
    });
  }
  else if (error.response.status === 404) {
    addToast(error.response.data.message, {
      appearance: "error",
      autoDismissTimeout: 1000,
    });
  }
   else {
    addToast(error.message, {
      appearance: "error",
      autoDismissTimeout: 1000,
    });
  }
};
*/