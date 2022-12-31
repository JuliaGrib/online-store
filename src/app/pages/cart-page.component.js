import { WFMComponent } from "../../framework/index";

class CartPageComponent extends WFMComponent {
  constructor(config){
      super(config)
  }
  //глобальный объект продуктов в корзине
  arrayProducts = {};
  //глобальный счетчик кол-ва подуктов для каждого отдельного продукта в корзине
  countOnceItem = [];
  //общая сумма 
  totalPriceN = 0;
  //новая цена после применения промокода
  totalNewPrice = 0;
  //общее кол-во оваров
  totalProducts = 0;
  //массив неповторяющихся продуктов = arrayProducts.products
  tempArrayProducts = [];

  actions() {
    return {
        'makeCart': 'makeCart',
    }
  }

  events() {
    return {
        'click .buy-now-button__cart' : 'buyNow',
        'input #input-promo' : 'checkPromo',
    }
  }

  makeCart() {


    const productsCart = document.querySelector('.item-products__cart');
    productsCart.innerHTML = ''

    this.arrayProducts = JSON.parse(localStorage.productsLocal);

    //проверяем не пустая ли корзина
    if(this.arrayProducts.products.length == 0) {
      const container = document.querySelector('.container__cart')
      container.innerHTML = /*html*/`
      <div class="empty__cart">
        <h2>КОРЗИНА ПУСТА</h2>
        <a class="main-link__cart" href="/">⟵ Вернуться на главную</a>
      </div>
    `
      return
    }

    //создаем массив с колличеством каждого одинакого элемента  
    this.countOnceItem = this.arrayProducts.products.reduce(function(acc, el) {
      acc[el.id] = (acc[el.id] || 0) + 1;
      return acc;
    }, {});

    //фильтруем повторяющиееся элементы 
    this.tempArrayProducts =  this.arrayProducts.products.reduce((o, i) => {
      if (!o.find(v => v.id == i.id)) {
        o.push(i);
      }
      return o;
    }, []); 


    const countProductsCart = document.querySelector('.count-items__cart');
    const totalProductsCart = document.querySelector('.total-products__cart')
    const totalPriceCart = document.querySelector('.total-price__cart')

    countProductsCart.innerHTML = `Items: ${this.tempArrayProducts.length}`


    this.totalPriceN = 0;
    this.totalProducts = 0;

    //перебираем массива неповторяющихся продуктов и создаем DOM
    this.tempArrayProducts.forEach((elem, index) => {

      let idProduct = elem.id
      let priceProduct = elem.price

      const itemCart = document.createElement('div');
      const idItem = document.createElement('div');
      const infoItem = document.createElement('div');
      const imgItem = document.createElement('img');
      const detailItem = document.createElement('div');
      const categoryItem = document.createElement('div')
      const nameItem = document.createElement('div');
      const descriptionItem = document.createElement('div');
      const additionalItem = document.createElement('div');
      const countItemContainer = document.createElement('div');
      const countItem = document.createElement('div');
      const addItem = document.createElement('button');
      const removeItem = document.createElement('button');
      const priceItem = document.createElement('div');
      const stockItem = document.createElement('div')
      
      itemCart.classList.add(`display-none`)
      itemCart.classList.add(`item__cart`)
      itemCart.classList.add(`item-${elem.id}__cart`)
      idItem.classList.add('id-item__cart')
      infoItem.classList.add('info-item__cart')
      imgItem.classList.add('img-item__cart')
      detailItem.classList.add('detail-item__cart')
      categoryItem.classList.add('category-item__cart')
      nameItem.classList.add('name-item__cart')
      descriptionItem.classList.add('description-item__cart')
      additionalItem.classList.add('additional-item__cart')
      countItemContainer.classList.add('count-item-container__cart')
      countItem.classList.add(`count-item-${elem.id}__cart`)
      addItem.classList.add('add-item__cart')
      removeItem.classList.add('remove-item__cart')
      priceItem.classList.add(`price-item-${elem.id}__cart`)
      stockItem.classList.add('stock-item__cart');

      itemCart.setAttribute('data-id', `${elem.id}`);
      addItem.setAttribute('data-id', `${elem.id}`);
      removeItem.setAttribute('data-id', `${elem.id}`);

      idItem.innerHTML = index+1;
      imgItem.src = elem.thumbnail;
      categoryItem.innerHTML = elem.category;
      nameItem.innerHTML = elem.title;
      descriptionItem.innerHTML = elem.description
      countItem.innerHTML = this.countOnceItem[idProduct];
      addItem.innerHTML = '+'
      removeItem.innerHTML = '-'
      priceItem.innerHTML = `${priceProduct * this.countOnceItem[idProduct]}$`
      stockItem.innerHTML = `Stock: ${elem.stock}`

      productsCart.appendChild(itemCart);

      itemCart.appendChild(idItem);
      itemCart.appendChild(infoItem);
      itemCart.appendChild(additionalItem);

      infoItem.appendChild(imgItem);
      infoItem.appendChild(detailItem);

      detailItem.appendChild(categoryItem);
      detailItem.appendChild(nameItem);
      detailItem.appendChild(descriptionItem);

      additionalItem.appendChild(stockItem)
      additionalItem.appendChild(countItemContainer)
      additionalItem.appendChild(priceItem)

      countItemContainer.appendChild(addItem)
      countItemContainer.appendChild(countItem)
      countItemContainer.appendChild(removeItem)

      let totalItemPrice = elem.price * this.countOnceItem[idProduct]
      this.totalPriceN = this.totalPriceN + totalItemPrice
      this.totalProducts = this.totalProducts + this.countOnceItem[idProduct]
      this.totalNewPrice =  this.totalPriceN
    })

    //выводи общее кол-во товаров и цену
    totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
    totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;

    //проверяем есть ли у нас примененные промокода,если да, то выводим их
     if(localStorage.usedPromo) {
      let arrayUsedPromo = JSON.parse(localStorage.usedPromo)
      const appliedPromoContainer = document.querySelector('.applied-promo-container__cart')
      appliedPromoContainer.innerHTML = ''
      const totalPrice = document.querySelector('.total-price__cart');
      const newPrice = document.querySelector('.new-price__cart');

      const title = document.createElement('div')
      appliedPromoContainer.classList.add('display-block')
      title.classList.add('title-applied-promo__cart')
      appliedPromoContainer.appendChild(title)
      title.innerHTML = 'Applied code:'

      arrayUsedPromo.forEach((elem) => {
        const appliedPromo = document.createElement('div')
        
        const code = document.createElement('div')
        const removeCode = document.createElement('button')

        appliedPromo.classList.add(`applied-promo__cart`)
        appliedPromo.classList.add(`${elem}`)

        code.classList.add('code__cart')
        removeCode.classList.add('remove-code__cart')
        totalPrice.classList.add('line-through')
        newPrice.classList.add('display-flex')
        appliedPromoContainer.appendChild(appliedPromo)
        appliedPromo.appendChild(code)
        appliedPromo.appendChild(removeCode)

        code.innerHTML = elem;
        removeCode.innerHTML = 'drop'

        this.totalNewPrice = this.totalNewPrice - Math.round(this.totalNewPrice * 0.1)
        newPrice.innerHTML = `New price: ${ this.totalNewPrice }`
      })
    }
    //создаем пагинатор
    this.paginator();

    const addItem = document.querySelectorAll('.add-item__cart');
    const removeItem = document.querySelectorAll('.remove-item__cart')

    //добавляем кол-во товара
    addItem.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        let currentId = event.target.dataset.id
        let currentItem = this.arrayProducts.products.find(elem => elem.id == currentId);
        
        //проверяем что бы кол-во товара не было больше чем на складе
        if(this.countOnceItem[currentId] === currentItem.stock) {
          return
        }
        //пушим в локалсторадж
        let localArr = JSON.parse( localStorage.productsLocal)
        localArr.products.push(currentItem);
        localStorage.productsLocal = JSON.stringify(localArr);
        
        ////////////////Обновляем цену и счетчикпродуктов в корзине//////////////
        const countItem = document.querySelector(`.count-item-${currentId}__cart`);
        const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
        const totalPriceCart = document.querySelector('.total-price__cart')
        const totalProductsCart = document.querySelector('.total-products__cart')
    
        this.countOnceItem[currentId]++

        countItem.innerHTML = this.countOnceItem[currentId];
        priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
        this.totalPriceN = this.totalPriceN + currentItem.price
        this.totalProducts++;
        totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
        totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
        ////////////////////////////////////////////////////////////////////////////
      })
    })
    //удаляем товар
    removeItem.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        let currentId = event.target.dataset.id
        let currentItem = this.arrayProducts.products.find(elem => elem.id == currentId);
        let indexItem = this.arrayProducts.products.indexOf(currentItem)
        //удаляем из локалстораджа
        let localArr = JSON.parse( localStorage.productsLocal)
        localArr.products.splice(indexItem, 1);
        localStorage.productsLocal = JSON.stringify(localArr);
        //обновляем DOM
        const countItem = document.querySelector(`.count-item-${currentId}__cart`);
        const priceItem = document.querySelector(`.price-item-${currentId}__cart`);
        const totalPriceCart = document.querySelector('.total-price__cart')
        const totalProductsCart = document.querySelector('.total-products__cart')
    
        this.countOnceItem[currentId]--
        //Проверяем если пустая карзина, то
        if(localArr.products.length == 0) {
          const container = document.querySelector('.container__cart')
          container.innerHTML = /*html*/`
            <div class="empty__cart">
              <h2>КОРЗИНА ПУСТА</h2>
              <a class="main-link__cart" href="/">⟵ Вернуться на главную</a>
            </div>
          `
          let url = new URL(window.location)
          url.searchParams.delete("page")
          history.pushState(null, null, url);
          return
        }
        
        if(this.countOnceItem[currentId] == 0) {

          this.tempArrayProducts.splice(indexItem, 1);
          let currentPage = JSON.parse(localStorage.currentPage)
          if(localArr.products.length == currentPage * 3) {
            currentPage--;
            localStorage.currentPage = JSON.stringify(currentPage)
            let url = new URL(window.location)
            url.searchParams.set('page', currentPage+1)
            history.pushState(null, null, url);
            this.makeCart();
          }
        }

        countItem.innerHTML = this.countOnceItem[currentId];
        priceItem.innerHTML = `${currentItem.price * this.countOnceItem[currentId]}$`
        this.totalPriceN = this.totalPriceN - currentItem.price
        totalPriceCart.innerHTML = `Total price: ${this.totalPriceN}$`
        this.totalProducts--;
        totalProductsCart.innerHTML = `Products: ${this.totalProducts}`;
        this.makeCart();
      })
    })
    
    const dropPromo = document.querySelectorAll('.remove-code__cart');
    const applieidPromo = document.querySelector('.applied-promo__cart')

    if(dropPromo) {
      const totalPrice = document.querySelector('.total-price__cart')
      const newPrice = document.querySelector('.new-price__cart')
      dropPromo.forEach((elem) => {
        elem.addEventListener('click', (event) => {
          let arrayUsedPromo = JSON.parse(localStorage.usedPromo)
          applieidPromo.remove();
          arrayUsedPromo.splice(event.target.value, 1);
          localStorage.usedPromo = JSON.stringify(arrayUsedPromo);
          this.totalNewPrice = this.totalNewPrice + Math.round(this.totalNewPrice * 0.1)
          newPrice.innerHTML = `New price: ${this.totalNewPrice }`
          if(arrayUsedPromo.length == 0) {
            localStorage.removeItem('usedPromo');
            totalPrice.classList.remove('line-through')
            newPrice.classList.remove('display-flex')
            const appliedPromoContainer = document.querySelector('.applied-promo-container__cart')
            appliedPromoContainer.innerHTML = ''
            appliedPromoContainer.classList.remove('display-block')
          }

        })
      })

    }
  }

  paginator() {

    
    if(!localStorage.currentPage) {
      localStorage.currentPage = JSON.stringify(0);
    }
    let currentPage = +(JSON.parse(localStorage.currentPage))
    let countProducts = this.tempArrayProducts.length;
    let countOnPage = 3;
    let countPage = Math.ceil(countProducts / countOnPage);

    let paginator = document.querySelector(".pages__cart");
    paginator.innerHTML = ''
    let page = "";  
    for (let i = 0; i < countPage; i++) {
      page += "<span data-page=" + i * countOnPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
    }
    paginator.innerHTML = page;

    let div_none = document.querySelectorAll(".display-none");
    let j =0;
    console.log("currentPage " + currentPage)
    for (let i = currentPage * 3; i < div_none.length; i++) {
  
      if (j  < countOnPage) {
        div_none[i].classList.remove("display-none");
        div_none[i].classList.add('display-flex');
      }
      j++
    }

    let main_page = null
    main_page = document.getElementById(`page${currentPage+1}`);
    console.log(main_page)
    main_page.classList.add("pages__cart_active");

    // let url = new URL(window.location)
    // url.searchParams.set('page', id.slice(-1))
    // history.pushState(null, null, url);

    paginator.addEventListener('click', (event) => {
      let e = event || window.event;
      let target = e.target;
      //получаем id номера страницы по которой кликнули
      let id = target.id;

      localStorage.currentPage = JSON.stringify((id.slice(-1))-1);
      
      if (target.tagName.toLowerCase() != "span") return;
      
      let data_page = +target.dataset.page;

      main_page.classList.remove("pages__cart_active");
      main_page = document.getElementById(id);
      main_page.classList.add("pages__cart_active");

      let url = new URL(window.location)
      url.searchParams.set('page', id.slice(-1))
      history.pushState(null, null, url);

      let j = 0;
      for (let i = 0; i < div_none.length; i++) {
        let data_num = div_none[i].dataset.id;
        if (data_num <= data_page || data_num >= data_page) {
          div_none[i].classList.remove("display-flex");
          div_none[i].classList.add('display-none');
        }
      }
      for (let i = data_page; i < div_none.length; i++) {
        if (j >= countOnPage) break;
        div_none[i].classList.remove("display-none");
        div_none[i].classList.add('display-flex');
        j++;
      }
    })
  }

  buyNow() {

    const container = document.querySelector('.container__cart')
    const buyNow = document.createElement('div');
    const modal = document.createElement('div');
    const close = document.createElement('button');
    const form = document.createElement('form');
    const personalDetails = document.createElement('div')
    const cardDetails = document.createElement('div');
    const confirm = document.createElement('button');
    const title = document.createElement('h2');
    const personName = document.createElement('div');
    const phoneNumber = document.createElement('div');
    const address = document.createElement('div');
    const email = document.createElement('div');
    const personNameInput = document.createElement('input');
    const phoneNumberInput = document.createElement('input');
    const addressInput = document.createElement('input');
    const emailInput = document.createElement('input');
    const titleCard = document.createElement('h2');
    const dataCard = document.createElement('div');
    const numberCard = document.createElement('div');
    const imgCard = document.createElement('img')
    const numberCardInput = document.createElement('input')
    const otherDataCard = document.createElement('div')
    const validDataCard = document.createElement('div');
    const validDataCardInput = document.createElement('input');
    const cvvDataCard = document.createElement('div');
    const cvvDataCardInput = document.createElement('input');
    
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

    imgCard.src = "./assets/card.png"

    personNameInput.required = true;
    phoneNumberInput.required = true;
    addressInput.required = true;
    emailInput.required = true;
    numberCardInput.required = true;
    validDataCardInput.required = true;
    cvvDataCardInput.required = true;

    emailInput.type = "email"
    numberCardInput.type = "text"
    cvvDataCardInput.maxLength = "3"
    validDataCardInput.maxLength = "5"

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
    phoneNumber.appendChild(phoneNumberInput)
    address.appendChild(addressInput)
    email.appendChild(emailInput)

    cardDetails.appendChild(titleCard)
    cardDetails.appendChild(dataCard)
    cardDetails.appendChild(numberCard)

    dataCard.appendChild(numberCard)
    dataCard.appendChild(otherDataCard)

    numberCard.appendChild(imgCard)
    numberCard.appendChild(numberCardInput)


    otherDataCard.appendChild(validDataCard);
    otherDataCard.appendChild(cvvDataCard);
    validDataCard.appendChild(validDataCardInput);
    cvvDataCard.appendChild(cvvDataCardInput);


    close.innerHTML = "x"
    confirm.innerHTML = 'confirm';
    title.innerHTML = 'Personal Details';
    titleCard.innerHTML = "Card details";

    personNameInput.addEventListener('input', function() {
      const NAME_REGEXP = /([а-яА-яa-zA-z]{3})+\s+([а-яА-яa-zA-z]{3})/ig

      if(this.value.length > 20) {
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(NAME_REGEXP.test(this.value)) {
        personNameInput.classList.remove('border-color-red')
        personNameInput.classList.add('border-color-green')
      } else {
        personNameInput.classList.remove('border-color-green')
        personNameInput.classList.add('border-color-red')
      }
    })

    phoneNumberInput.addEventListener('input', function() {
      const PHONE_REGEX = /^([+][0-9\s-\(\)]{9,16})*$/i;

      if(this.value.length > 16 || /^[а-яА-яa-zA-z]$/.test(this.value.slice(-1))) {
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(PHONE_REGEX.test(this.value) && this.value.length > 9) {
        phoneNumberInput.classList.remove('border-color-red')
        phoneNumberInput.classList.add('border-color-green')
      } else {
        phoneNumberInput.classList.remove('border-color-green')
        phoneNumberInput.classList.add('border-color-red')
      }
    })

    addressInput.addEventListener('input', function() {
      const ADDRESS_REGEXP = /([а-яА-яa-zA-z]{5})+\s+([а-яА-яa-zA-z]{5})+\s+([а-яА-яa-zA-z]{5})+/ig
      if(ADDRESS_REGEXP.test(this.value)) {
        addressInput.classList.remove('border-color-red')
        addressInput.classList.add('border-color-green')
      } else {
        addressInput.classList.remove('border-color-green')
        addressInput.classList.add('border-color-red')
      }
    })

    emailInput.addEventListener('input', function() {
      const EMAIL_REGEXP = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(EMAIL_REGEXP.test(this.value)) {
        emailInput.classList.remove('border-color-red')
        emailInput.classList.add('border-color-green')
      } else {
        emailInput.classList.remove('border-color-green')
        emailInput.classList.add('border-color-red')
      }
    })

    numberCardInput.addEventListener('keydown', function(e) {

      let value = this.value.replace(/\s+/g, '');
      let isBackspace = e.key === 'Backspace'; 

      if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!isBackspace && value.length === 16)) {
          e.preventDefault();
          return false;
      }
  
      this.value = value.split('').reverse().join('').replace(/\B(?=(\d{4})+(?!\d))/g, " ").split('').reverse().join('').trim();
      
      if(/^[^\d]$/.test(this.value.slice(-1))) {
        console.log(this.value)
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(this.value.slice(0,1) == 4) {
        imgCard.src = "./assets/visa.png"
      } else if(this.value.slice(0,1) == 5) {
        imgCard.src = "./assets/mastercard.png"
      } else if(this.value.slice(0,1) == 3) {
        imgCard.src = "./assets/american.png"
      }  else {
        imgCard.src = "./assets/card.png"
      }

      if(this.value.length == 18) {
        numberCardInput.classList.remove('border-color-red')
        numberCardInput.classList.add('border-color-green')
      } else {
        numberCardInput.classList.remove('border-color-green')
        numberCardInput.classList.add('border-color-red')
      }
    })

    cvvDataCardInput.addEventListener('input', function() {
      const CVV_REGEXP = /^[0-9]{3,3}$/;

      if(/^[^\d]$/.test(this.value.slice(-1))) {
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(CVV_REGEXP.test(this.value)) {
        cvvDataCardInput.classList.remove('border-color-red')
        cvvDataCardInput.classList.add('border-color-green')
      } else {
        cvvDataCardInput.classList.remove('border-color-green')
        cvvDataCardInput.classList.add('border-color-red')
      }
    })

    validDataCardInput.addEventListener('keydown', function(e) {

      let value = this.value.replace(/\s+/g, '');
      let isBackspace = e.key === 'Backspace'; 

      if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!isBackspace && value.length === 16)) {
          e.preventDefault();
          return false;
      }
  
      this.value = value.split('').reverse().join('').replace(/\B(?=(\d{2})+(?!\d))/g, "/").split('').reverse().join('').trim();

      // if(this.value.length == 2) {
      //   let arr = this.value.split('')
      //   arr.push("/");
      //   this.value = arr.join('')
      // }

      if(/^[^\d]$/.test(this.value.slice(-1))) {
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(this.value[0] != 1) {
        let arr = this.value.split('')
        arr.pop();
        this.value = arr.join('')
      }

      if(this.value.length == 5) {
        validDataCardInput.classList.remove('border-color-red')
        validDataCardInput.classList.add('border-color-green')
      } else {
        validDataCardInput.classList.remove('border-color-green')
        validDataCardInput.classList.add('border-color-red')
      }
      console.log(this.value)
    })

    confirm.addEventListener('click', function(event) {
      event.preventDefault;
      let succesArray = document.querySelectorAll('.border-color-green')
      console.log(succesArray.length)
      if(succesArray.length == 7) {
        modal.innerHTML = 'Ваш заказ оформлен. Вы будете перенаправлены на главную страницу'
        setTimeout(function() {
          localStorage.removeItem('productsLocal');
          location.href='#'
        }, 3000)

      }
    })

    close.addEventListener('click', function() {
      console.log("close")
      buyNow.remove();
    })

  }

  checkPromo(event) {
    let value = event.target.value;
    let usedPromoArray = []
    //проверяем если в локалсторадже есть промокоды, то забираем их
    if(localStorage.usedPromo) {
      usedPromoArray = JSON.parse(localStorage.usedPromo);
    }

    let promoArray = ["rs", "epam"]


    if (usedPromoArray.includes(value)) {
      return;
    }
      
    if (promoArray.includes(value)) {

      usedPromoArray.push(value)

      const succcesContainer = document.querySelector('.succes-promo-container__car')
      const totalPrice = document.querySelector('.total-price__cart')
      const newPrice = document.querySelector('.new-price__cart')

      const succesPromo = document.createElement('div')
      const promoList = document.createElement('div')
      const addPromo = document.createElement('button')

      succesPromo.classList.add(`succces-promo__cart`)
      succesPromo.classList.add(`${value}__cart`)
      promoList.classList.add('promo-list__cart')
      addPromo.classList.add('add-promo__cart')


      succcesContainer.appendChild(succesPromo) 
      succesPromo.appendChild(promoList)
      succesPromo.appendChild(addPromo)

      addPromo.innerHTML = 'Add'
      promoList.innerHTML = `Promo: "${value}", your discont: 10%`;



      addPromo.addEventListener('click', () => {

        localStorage.usedPromo = JSON.stringify(usedPromoArray);

        addPromo.remove()
        promoList.remove()

        this.totalPriceN = this.totalPriceN - Math.ceil(this.totalPriceN * 0.1)
        this.makeCart();



      })
      value  = '';
    }
  }
}

export const cartPageComponent = new CartPageComponent({
    selector: 'app-cart-page',
    template: /*html*/`
      <div class="container__cart">

        <div class="products__cart">
          <div class="title-items__cart">
            <h2>Products in cart</h2>
            <div class="count-items__cart">Items: N</div>
            <div class="pages__cart">

            </div>
          </div>
          <div class="item-products__cart">
            
          </div>
        </div>
        
        <div class="order__cart">
          <div class="title-order__cart">Summary</div>
          <div class="total-products__cart">Products: N</div>
          <div class="total-price__cart">Total price: N</div> 
          <div class="applied-promo-container__cart">
          </div>
          <div class="new-price__cart">N</div> 
          <div class="test-promo__cart">Test promo: rs | epam</div>
          <div class="succes-promo-container__car">

          

          </div>
          <div class="promo__cart">
            <input id="input-promo" class="input-promo__cart" type="search" minlength="6" maxlength="6" placeholder="Enter promo code"/>
          </div>
          <button class="buy-now-button__cart">Buy now</button>
        </div>

      </div>
    `
})