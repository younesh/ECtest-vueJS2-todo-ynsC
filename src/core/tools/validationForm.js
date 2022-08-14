export const validationForm = (config, formField) => {
  /**
    config = { // devera avoir ce type de shemas
        fieldX001: {
          isRequired: true,
          type: "text", // format = { text | mail | number | url ....}
          isValide: true, // by defaut must be true
          errorMessage: "",
      },

       .....
       fieldX00N: {
         ...
       }
    } 
*/
  let isValidForm = true;

  Object.keys(config).forEach((field) => {
    // initatlise messages et status
    config[field].isValide = true;
    config[field].errorMessage = "";

    // required check
    if (config[field].isRequired) {
      if (formField[field] === "") {
        config[field].isValide = false;
        config[field].errorMessage = "the field is required";
        isValidForm = false;
        return; // ici return ds le forEach c'est comme continue pour un boucle for normal !
      }
    }
    // mail format check
    if (config[field].type === "mail") {
      if (!isMailFormat(formField[field])) {
        config[field].isValide = false;
        config[field].errorMessage = "Email format is invalid";
        isValidForm = false;
        return;
      }
    }
    // number  format check

    // URL format check
  });

  return isValidForm;
};

function isMailFormat(mail) {
  let RegEmailCheck =
    /^(([^<>()[\]\\.,;:\s@"À-ÿ]+(\.[^<>()[\]\\.,;:\s@"À-ÿ]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegEmailCheck.test(mail);
}
