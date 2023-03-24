const handleErrors = (error, addToast) => {
    if (error.message === "Request failed with status code 409") {
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismissTimeout: 1000,
      });
    } else if (error.message === "Request failed with status code 500") {
      addToast("Internal server error", {
        appearance: "error",
        autoDismissTimeout: 1000,
      });
    }else if (error.message === "Request failed with status code 400") {
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
  
  export default handleErrors;
  