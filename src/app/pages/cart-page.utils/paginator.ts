// import { cartPageComponent } from "../cart-page.component";

// export const paginator = function() {
//   if(!localStorage.currentPage) {
//     localStorage.currentPage = JSON.stringify(0);
//   }
//   let currentPage = +(JSON.parse(localStorage.currentPage))
//   let countProducts = cartPageComponent.tempArrayProducts.length;
//   let countOnPage = 3;
//   let countPage = Math.ceil(countProducts / countOnPage);
//   let paginator = document.querySelector(".pages__cart");
//   paginator.innerHTML = ''
//   let page = "";  
//   for (let i = 0; i < countPage; i++) {
//     page += "<span data-page=" + i * countOnPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
//   }
//   paginator.innerHTML = page;
//   let div_none = document.querySelectorAll(".display-none");
//   let j =0;
//   for (let i = currentPage * 3; i < div_none.length; i++) {
//     if (j  < countOnPage) {
//       div_none[i].classList.remove("display-none");
//       div_none[i].classList.add('display-flex');
//     }
//     j++
//   }
//   let main_page = null
//   main_page = document.getElementById(`page${currentPage+1}`);
//   main_page.classList.add("pages__cart_active");
//   paginator.addEventListener('click', (event) => {
//     let e = event || window.event;
//     let target = e.target;
//     //получаем id номера страницы по которой кликнули
//     let id = target.id;
//     localStorage.currentPage = JSON.stringify((id.slice(-1))-1);
//     if (target.tagName.toLowerCase() != "span") return;
//     let data_page = +target.dataset.page;
//     main_page.classList.remove("pages__cart_active");
//     main_page = document.getElementById(id);
//     main_page.classList.add("pages__cart_active");
//     let url = new URL(window.location)
//     url.searchParams.set('page', id.slice(-1))
//     history.pushState(null, null, url);
//     let j = 0;
//     for (let i = 0; i < div_none.length; i++) {
//       let data_num = div_none[i].dataset.id;
//       if (data_num <= data_page || data_num >= data_page) {
//         div_none[i].classList.remove("display-flex");
//         div_none[i].classList.add('display-none');
//       }
//     }
//     for (let i = data_page; i < div_none.length; i++) {
//       if (j >= countOnPage) break;
//       div_none[i].classList.remove("display-none");
//       div_none[i].classList.add('display-flex');
//       j++;
//     }
//   })
// }

/* eslint-disable */

import { cartPageComponent } from "../cart-page.component";

export const paginator = function(): void {
  if(!localStorage.currentPage) {
    localStorage.currentPage = JSON.stringify(0);
  }
  const currentPage: number = +(JSON.parse(localStorage.currentPage))
  const countProducts: number = cartPageComponent.tempArrayProducts.length;
  const countOnPage = 3;
  const countPage: number = Math.ceil(countProducts / countOnPage);
  const paginator = (document.querySelector(".pages__cart")) as HTMLElement
  paginator.innerHTML = ''
  let page = "";  
  for (let i = 0; i < countPage; i++) {
    page += "<span data-page=" + i * countOnPage + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
  }
  paginator.innerHTML = page;
  const div_none: NodeListOf<HTMLElement> = document.querySelectorAll(".display-none");
  let j = 0;
  for (let i = currentPage * 3; i < div_none.length; i++) {
    if (j  < countOnPage) {
      div_none[i].classList.remove("display-none");
      div_none[i].classList.add('display-flex');
    }
    j++
  }
  let main_page: HTMLElement | null = null
  main_page = (document.getElementById(`page${currentPage+1}`)) as HTMLElement
  main_page.classList.add("pages__cart_active");
  paginator.addEventListener('click', (event: MouseEvent) => {
    const e: MouseEvent = event //|| window.event;
    const target: HTMLElement = <HTMLElement>e.target;
    const id: any = target!.id;
    localStorage.currentPage = JSON.stringify((id.slice(-1))-1);
    if (target!.tagName.toLowerCase() != "span") return;
    const data_page = +target.dataset.page;
    if(!main_page) throw new Error(`'${main_page}' is not readable`);
    main_page.classList.remove("pages__cart_active");
    main_page = document.getElementById(id);
    if(!main_page) throw new Error(`'${main_page}' is not readable`);
    main_page.classList.add("pages__cart_active");
    const url = new URL(window.location.href)
    url.searchParams.set('page', id.slice(-1))
    history.pushState(null, '', url);
    let j = 0;
    for (let i = 0; i < div_none.length; i++) {
      const data_num: number = +div_none[i].dataset.id;
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