import Masks from "./maks.js";

const maskPhone = new Masks("[data-field='phone']", "phone");
const maskCpf = new Masks("[data-field='cpf']", "cpf");
const maskCep = new Masks("[data-field='cep']", "cep");

maskPhone.init();
maskCpf.init();
maskCep.init();
