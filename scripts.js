const masks = {
  //(00) 00000-0000
  phone(value) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+/, "$1")
  },
  cpf(value) {
    //000.000.000-00
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(.\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})+\d+/, "$1")
  },
  cep(value) {
    //00000-000
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+/, "$1")
  }
};

const inputs = document.querySelectorAll("[data-field]");

inputs.forEach((input) => {
  const inputName = input.dataset.field;
  
  input.addEventListener("input", (e) => {
    e.target.value = masks[inputName](e.target.value);  
  });
});
