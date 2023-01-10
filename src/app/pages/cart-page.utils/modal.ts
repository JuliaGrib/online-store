export const buyNow = function() {
  const container = (document.querySelector('.container__cart')) as HTMLElement
  const buyNow = document.createElement('div')
  const modal = document.createElement('div')
  const close = document.createElement('button')
  const form = document.createElement('form')
  const personalDetails = document.createElement('div')
  const cardDetails = document.createElement('div')
  const confirm = document.createElement('button')
  const title = document.createElement('h2')
  const personName = document.createElement('div')
  const phoneNumber = document.createElement('div')
  const address = document.createElement('div')
  const email = document.createElement('div')
  const personNameInput = (document.createElement('input')) as HTMLInputElement
  const phoneNumberInput = (document.createElement('input')) as HTMLInputElement
  const addressInput = (document.createElement('input')) as HTMLInputElement
  const emailInput = (document.createElement('input')) as HTMLInputElement
  const titleCard = document.createElement('h2')
  const dataCard = document.createElement('div')
  const numberCard = document.createElement('div')
  const imgCard = document.createElement('img')
  const numberCardInput = (document.createElement('input')) as HTMLInputElement
  const otherDataCard = document.createElement('div')
  const validDataCard = document.createElement('div');
  const validDataCardInput = (document.createElement('input')) as HTMLInputElement
  const cvvDataCard = document.createElement('div');
  const cvvDataCardInput = (document.createElement('input')) as HTMLInputElement
  const errorName = document.createElement('span')
  const errorPhone = document.createElement('span')
  const errorAddress = document.createElement('span')
  const errorEmail = document.createElement('span')
  const errorCardNumber = document.createElement('span')
  const errorValitThru = document.createElement('span')
  const errorCvv = document.createElement('span')

  buyNow.classList.add('buy-now__cart');
  modal.classList.add('modal__cart');
  close.classList.add('close-modal__cart')
  form.classList.add('form__cart');
  personalDetails.classList.add('personal-details__cart');
  cardDetails.classList.add('card-details__cart');
  confirm.classList.add('confirm-btn')
  title.classList.add('title-personal__cart');
  personName.classList.add('person-name__cart');
  phoneNumber.classList.add('phone-number__cart');
  address.classList.add('address__cart');
  email.classList.add('email__cart');
  personName.classList.add('details-cart')
  phoneNumber.classList.add('details-cart')
  address.classList.add('details-cart')
  email.classList.add('details-cart');
  personNameInput.classList.add('person-name-input__cart');
  phoneNumberInput.classList.add('phone-number-input__cart');
  addressInput.classList.add('address-input__cart');
  emailInput.classList.add('email-input__cart');
  personNameInput.classList.add('input-cart')
  phoneNumberInput.classList.add('input-cart')
  addressInput.classList.add('input-cart')
  emailInput.classList.add('input-cart')
  titleCard.classList.add('title-card__cart');
  dataCard.classList.add('data-card__cart');
  numberCard.classList.add('number-card__cart');
  imgCard.classList.add('img-card__cart');
  numberCardInput.classList.add('number-card-input__cart');
  otherDataCard.classList.add('other-data__cart');
  validDataCard.classList.add('valid-data__cart');
  validDataCardInput.classList.add('valid-data-input__cart');
  cvvDataCard.classList.add('cvv-card__cart');
  cvvDataCardInput.classList.add('cvv-card-input__cart');

  personNameInput.placeholder = "Name"
  phoneNumberInput.placeholder = "Phone"
  addressInput.placeholder = "Delivery Address"
  emailInput.placeholder = "E-Mail"
  numberCardInput.placeholder = "Card number"
  validDataCardInput.placeholder = "Valid Thru"
  cvvDataCardInput.placeholder = "CVV"

  imgCard.src = "./assets/cards/card.png"

  personNameInput.required = true;
  phoneNumberInput.required = true;
  addressInput.required = true;
  emailInput.required = true;
  numberCardInput.required = true;
  validDataCardInput.required = true;
  cvvDataCardInput.required = true;

  emailInput.type = "email"
  numberCardInput.type = "text"
  cvvDataCardInput.maxLength = 3
  validDataCardInput.maxLength = 5

  container.appendChild(buyNow);
  buyNow.appendChild(modal);
  modal.appendChild(close);
  modal.appendChild(form);
  form.appendChild(personalDetails);
  form.appendChild(cardDetails);
  form.appendChild(confirm);
  personalDetails.appendChild(title);
  personalDetails.appendChild(personName);
  personalDetails.appendChild(phoneNumber);
  personalDetails.appendChild(address);
  personalDetails.appendChild(email);
  personName.appendChild(personNameInput)
  personName.appendChild(errorName)
  phoneNumber.appendChild(phoneNumberInput)
  phoneNumber.appendChild(errorPhone)
  address.appendChild(addressInput)
  address.appendChild(errorAddress)
  email.appendChild(emailInput)
  email.appendChild(errorEmail)
  cardDetails.appendChild(titleCard)
  cardDetails.appendChild(dataCard)
  cardDetails.appendChild(numberCard)
  dataCard.appendChild(numberCard)
  dataCard.appendChild(otherDataCard)
  numberCard.appendChild(imgCard)
  numberCard.appendChild(numberCardInput)
  numberCard.appendChild(errorCardNumber)
  otherDataCard.appendChild(validDataCard);
  otherDataCard.appendChild(cvvDataCard);
  validDataCard.appendChild(validDataCardInput);
  validDataCard.appendChild(errorValitThru);
  cvvDataCard.appendChild(cvvDataCardInput);
  cvvDataCard.appendChild(errorCvv);


  close.innerHTML = "x"
  confirm.innerHTML = 'confirm';
  title.innerHTML = 'Personal Details';
  titleCard.innerHTML = "Card details";

  personNameInput.addEventListener('input', function() {
    const NAME_REGEXP = /([а-яА-яa-zA-z]{3})+\s+([а-яА-яa-zA-z]{3})/ig
    if(this.value.length > 20) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }
    if(NAME_REGEXP.test(this.value)) {
      personNameInput.classList.remove('border-color-red')
      personNameInput.classList.add('border-color-green')
      errorName.innerHTML = ""
    } else {
      personNameInput.classList.remove('border-color-green')
      personNameInput.classList.add('border-color-red')
      errorName.innerHTML = "This field must contain at least 2 words"

    }
  })

  phoneNumberInput.addEventListener('input', function() {
    // eslint-disable-next-line
    const PHONE_REGEX = /^([+][0-9\s-\(\)]{9,16})*$/i;
    if(this.value.length > 16 || /^[а-яА-яa-zA-z]$/.test(this.value.slice(-1))) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }
    if(PHONE_REGEX.test(this.value) && this.value.length > 9) {
      phoneNumberInput.classList.remove('border-color-red')
      phoneNumberInput.classList.add('border-color-green')
      errorPhone.innerHTML = ""
    } else {
      phoneNumberInput.classList.remove('border-color-green')
      phoneNumberInput.classList.add('border-color-red')
      errorPhone.innerHTML = "This field must contain a phone number in the format +123456789"
    }
  })

  addressInput.addEventListener('input', function() {
    const ADDRESS_REGEXP = /([а-яА-яa-zA-z]{5})+\s+([а-яА-яa-zA-z]{5})+\s+([а-яА-яa-zA-z]{5})+/ig
    if(ADDRESS_REGEXP.test(this.value)) {
      addressInput.classList.remove('border-color-red')
      addressInput.classList.add('border-color-green')
      errorAddress.innerHTML = ""
    } else {
      addressInput.classList.remove('border-color-green')
      addressInput.classList.add('border-color-red')
      errorAddress.innerHTML = "This field must contain at least 3 words"
    }
  })

  emailInput.addEventListener('input', function() {
    // eslint-disable-next-line
    const EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(EMAIL_REGEXP.test(this.value)) {
      emailInput.classList.remove('border-color-red')
      emailInput.classList.add('border-color-green')
      errorEmail.innerHTML = ""
    } else {
      emailInput.classList.remove('border-color-green')
      emailInput.classList.add('border-color-red')
      errorEmail.innerHTML = "This field must contain an email in the format qwerty@asd.com"
    }
  })

  numberCardInput.addEventListener('keydown', function(e: KeyboardEvent) {
    const value: string = this.value.replace(/\s+/g, '');
    const isBackspace: boolean = e.key === 'Backspace'; 
    if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!isBackspace && value.length === 16)) {
        e.preventDefault();
        return false;
    }
    this.value = value.split('').reverse().join('').replace(/\B(?=(\d{4})+(?!\d))/g, " ").split('').reverse().join('').trim();
    if(/^[^\d]$/.test(this.value.slice(-1))) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }
    if(this.value.slice(0,1) == '4') {
      imgCard.src = "./assets/cards/visa.png"
    } else if(this.value.slice(0,1) == '5') {
      imgCard.src = "./assets/cards/mastercard.png"
    } else if(this.value.slice(0,1) == '3') {
      imgCard.src = "./assets/cards/american.png"
    }  else {
      imgCard.src = "./assets/cards/card.png"
    }
    if(this.value.length == 18) {
      numberCardInput.classList.remove('border-color-red')
      numberCardInput.classList.add('border-color-green')
      errorCardNumber.innerHTML = ""
    } else {
      numberCardInput.classList.remove('border-color-green')
      numberCardInput.classList.add('border-color-red')
      errorCardNumber.innerHTML = "Error"
    }
  })

  cvvDataCardInput.addEventListener('input', function() {
    const CVV_REGEXP = /^[0-9]{3,3}$/;
    if(/^[^\d]$/.test(this.value.slice(-1))) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }
    if(CVV_REGEXP.test(this.value)) {
      cvvDataCardInput.classList.remove('border-color-red')
      cvvDataCardInput.classList.add('border-color-green')
      errorCvv.innerHTML = ""
    } else {
      cvvDataCardInput.classList.remove('border-color-green')
      cvvDataCardInput.classList.add('border-color-red')
      errorCvv.innerHTML = "Error"
    }
  })

  validDataCardInput.addEventListener('keydown', function(e: KeyboardEvent) {
    const value: string = this.value.replace(/\s+/g, '');

    const isBackspace: boolean = e.key === 'Backspace'; 
    if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!isBackspace && value.length === 5)) {

        e.preventDefault();
        return false;
    }
    this.value = value.split('').reverse().join('').replace(/\B(?=(\d{2})+(?!\d))/g, "/").split('').reverse().join('').trim();
    if(/^[^\d]$/.test(this.value.slice(-1))) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }
    if((+this.value[0]) > 1){
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }

    if((+this.value[1]) > 2) {
      const arr: string[] = this.value.split('')
      arr.pop();
      this.value = arr.join('')
    }

    if(this.value.length == 4) {
      validDataCardInput.classList.remove('border-color-red')
      validDataCardInput.classList.add('border-color-green')
      errorValitThru.innerHTML = ""
    } else {
      validDataCardInput.classList.remove('border-color-green')
      validDataCardInput.classList.add('border-color-red')
      errorValitThru.innerHTML = "Error"
    }
  })

  confirm.addEventListener('click', function(event: MouseEvent) {
    event.preventDefault;
    const succesArray: NodeListOf<Element> = document.querySelectorAll('.border-color-green')
    if(succesArray.length == 7) {
      modal.innerHTML = 'Your order has been placed. You will be redirected to the main page'
      setTimeout(function() {
        const localArr = JSON.parse(localStorage.productsLocal)
        localArr.products = []
        localStorage.productsLocal = JSON.stringify(localArr);
        //localStorage.removeItem('productsLocal');
        location.href='#'
      }, 3000)
    }
  })

  close.addEventListener('click', function() {
    const url: URL = new URL(window.location.href)
    url.searchParams.delete('buy')
    history.pushState(null, "", url);
    buyNow.remove();
  })

}