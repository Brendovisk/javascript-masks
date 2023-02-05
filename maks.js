export default class Masks {
  constructor(element, option) {
    this.element = document.querySelector(element);
    this.option = option;
  }

  masks(type, value) {
    switch (type) {
      case "phone":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{4})\d+/, "$1");
      case "cpf":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(.\d{3})(\d)/, "$1-$2")
          .replace(/(-\d{2})+\d+/, "$1");
      case "cep":
        return value
          .replace(/\D/g, "")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+/, "$1");
      default:
        return this.element.value;
    }
  }

  masksPattern(type) {
    switch (type) {
      case "phone":
        return /\(\d{2}\)\s\d{5}\-\d{4}/;
      case "cpf":
        return /\d{3}\.\d{3}\.\d{3}\-\d{2}/;
      case "cep":
        return /\d{5}\-\d{3}/;
      default:
        return null;
    }
  }

  addMask() {
    this.element.addEventListener("input", (e) => {
      e.target.value = this.masks(this.option, e.target.value);
      this.masksPattern(this.option).test(e.target.value);

      if (this.masksPattern(this.option).test(e.target.value)) {
        e.target.classList.add("valid");
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
        e.target.classList.remove("valid");
      }
    });
  }

  init() {
    if (this.element && this.option) {
      this.addMask();
    }
    return this;
  }
}
