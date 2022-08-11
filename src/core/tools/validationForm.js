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

    // verifier le required
    if (config[field].isRequired) {
      if (formField[field] === "") {
        config[field].isValide = false;
        config[field].errorMessage = "le champ est obligatoire";
        isValidForm = false;
        return; // ici return ds le forEach c'est comme continue pour un boucle for normal !
      }
    }
    // verifier si format du type  mail est ok
    if (config[field].type === "mail") {
      if (!isMailFormat(formField[field])) {
        config[field].isValide = false;
        config[field].errorMessage = "Format du mail est invalid";
        isValidForm = false;
        return;
      }
    }
    // verifier le numeric format

    // verifier le URL format ...

    // verifier le URL format ...
  });

  return isValidForm;
};

function isMailFormat(mail) {
  let RegEmailCheck =
    /^(([^<>()[\]\\.,;:\s@"À-ÿ]+(\.[^<>()[\]\\.,;:\s@"À-ÿ]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegEmailCheck.test(mail);
}
