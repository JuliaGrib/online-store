import { cartPageComponent } from "../cart-page.component";

export const paginator = function() {
  if(!localStorage.currentPage) {
    localStorage.currentPage = JSON.stringify(0);
  }
  let currentPage = +(JSON.parse(localStorage.currentPage))
  let countProducts = cartPageComponent.tempArrayProducts.length;
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
  for (let i = currentPage * 3; i < div_none.length; i++) {
    if (j  < countOnPage) {
      div_none[i].classList.remove("display-none");
      div_none[i].classList.add('display-flex');
    }
    j++
  }
  let main_page = null
  main_page = document.getElementById(`page${currentPage+1}`);
  main_page.classList.add("pages__cart_active");
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