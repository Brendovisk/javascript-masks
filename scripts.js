import Masks from "./maks.js";

const maskPhone = new Masks({
  element: "[data-field='phone']",
  option: "phone",
  class: {
    valid: "valid",
    invalid: "invalid",
  },
  customMessage: "Ooops, there is an error",
});

const maskCpf = new Masks({
  element: "[data-field='cpf']",
  option: "cpf",
});

const maskCep = new Masks({
  element: "[data-field='cep']",
  option: "cep",
});

maskPhone.init();
maskCpf.init();
maskCep.init();
