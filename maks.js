export default class Masks {
  constructor(object) {
    this.element = document.querySelector(object.element);
    this.option = object.option;
    if (this.validClass === undefined) {
      this.validClass = "valid";
    }
    if (this.invalidClass === undefined) {
      this.invalidClass = "invalid";
    }
    if (object.class) {
      this.validClass = object.class.valid;
      this.invalidClass = object.class.invalid;
    }
    if (object.customMessage !== undefined) {
      this.customMessage = object.customMessage;
    }
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

  masksMessage(target) {
    switch (this.option) {
      case "phone":
        return "Telefone inválido";
      case "cpf":
        return "CPF inválido";
      case "cep":
        return "CEP inválido";
      case "email":
        return target.validationMessage;
      default:
        return null;
    }
  }

  addMessage(element) {
    if (!element.target.nextElementSibling) {
      this.message = document.createElement("span");
      element.target.after(this.message);
    }
    if (this.customMessage) {
      this.message.innerHTML = this.customMessage;
    } else {
      this.message.innerHTML = this.masksMessage();
    }
  }

  removeMessage() {
    if (this.message) {
      this.message.remove();
    }
  }

  // validateEmail(element) {
  //   if (element.target.checkValidity()) {
  //     element.target.classList.add(this.validClass);
  //     element.target.classList.remove(this.invalidClass);
  //   } else {
  //     element.target.classList.add(this.invalidClass);
  //     element.target.classList.remove(this.validClass);
  //     this.addMessage(element);
  //   }
  // }

  listenInputChange() {
    this.element.addEventListener("change", (element) => {
      element.target.value = this.masks(this.option, element.target.value);
      this.validateMask(element);
      console.log(element)
    });
  }

  listenInputType() {
    this.element.addEventListener("input", (element) => {
      element.target.value = this.masks(this.option, element.target.value);
      this.validateMask(element);
    });
  }

  validateMask(element) {
    if(this.option === "email") {
      
    }
    if (this.masksPattern(this.option).test(element.target.value)) {
      this.removeMessage();
      element.target.classList.add(this.validClass);
      element.target.classList.remove(this.invalidClass);
    } else {
      this.addMessage(element);
      element.target.classList.add(this.invalidClass);
      element.target.classList.remove(this.validClass);
    }
  }

  init() {
    if (this.element && this.option) {
      if (this.option === "email") {
        return
        // this.listenInputChange();
      }
      this.listenInputType();
    }
    return this;
  }
}
