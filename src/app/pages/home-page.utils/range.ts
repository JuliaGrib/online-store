// import { homePageComponent } from "../home-page.component";
// import { extremum } from "./extremum";

// export const updateStockRange = function(range) {
//   const stockSlider1 = document.querySelector('#stock-slider-1');
//   const stockSlider2 = document.querySelector('#stock-slider-2');
//   const stockRange1 = document.querySelector('#stock-range-1');
//   const stockRange2 = document.querySelector('#stock-range-2');
//   let min = +range.split('↕')[0]
//   let max = +range.split('↕')[1]
//   stockSlider1.min = extremum.minStock();
//   stockSlider1.max = extremum.maxStock();
//   stockSlider2.min = extremum.minStock();
//   stockSlider2.max = extremum.maxStock();
//   stockSlider1.value = min;
//   stockSlider2.value = max;
//   stockRange1.value = min;
//   stockRange2.value = max;
//   let tempArray = homePageComponent.visibleProducts.filter(
//     elem => elem.stock >= min && elem.stock <= max ||
//     elem.price >= min && elem.price <= max)
//     homePageComponent.visibleProducts = tempArray;
// }

// export const updatePriceRange = function(range) {
//   const slider1 = document.querySelector('#slider-1');
//   const slider2 = document.querySelector('#slider-2');
//   const range1 = document.querySelector('#range-1');
//   const range2 = document.querySelector('#range-2');
//   let min = +range.split('↕')[0]
//   let max = +range.split('↕')[1]
//   slider1.min = extremum.minPrice();
//   slider1.max = extremum.maxPrice();
//   slider2.min = extremum.minPrice();
//   slider2.max = extremum.maxPrice();
//   slider1.value = min;
//   slider2.value = max;
//   range1.value = min;
//   range2.value = max;
//   let tempArray = homePageComponent.visibleProducts.filter(
//     elem => elem.stock >= min && elem.stock <= max ||
//     elem.price >= min && elem.price <= max)
//     homePageComponent.visibleProducts = tempArray;
// }
import { homePageComponent } from "../home-page.component";
import { extremum } from "./extremum";

export const updateStockRange = function(range: string) {
  const stockSlider1 = (document.querySelector('#stock-slider-1')) as HTMLInputElement
  const stockSlider2 = (document.querySelector('#stock-slider-2')) as HTMLInputElement
  const stockRange1 = (document.querySelector('#stock-range-1')) as HTMLInputElement
  const stockRange2 = (document.querySelector('#stock-range-2')) as HTMLInputElement
  const min: number = +range.split('↕')[0]
  const max: number = +range.split('↕')[1]
  stockSlider1.min = String(extremum.minStock())
  stockSlider1.max = String(extremum.maxStock())
  stockSlider2.min = String(extremum.minStock())
  stockSlider2.max = String(extremum.maxStock())
  stockSlider1.value = `${min}`
  stockSlider2.value = `${max}`
  stockRange1.value = `${min}`
  stockRange2.value = `${max}`
  const tempArray = homePageComponent.visibleProducts.filter(
    (elem: { stock: number; price: number; }) => elem.stock >= min && elem.stock <= max ||
    elem.price >= min && elem.price <= max)
    homePageComponent.visibleProducts = tempArray;
}

export const updatePriceRange = function(range: string) {
  const slider1 = (document.querySelector('#slider-1')) as HTMLInputElement
  const slider2 = (document.querySelector('#slider-2')) as HTMLInputElement
  const range1 = (document.querySelector('#range-1')) as HTMLInputElement
  const range2 = (document.querySelector('#range-2')) as HTMLInputElement
  const min: number = +range.split('↕')[0]
  const max: number = +range.split('↕')[1]
  slider1.min = `${extremum.minPrice()}`
  slider1.max = `${extremum.maxPrice()}`
  slider2.min = `${extremum.minPrice()}`
  slider2.max = `${extremum.maxPrice()}`
  slider1.value = `${min}`;
  slider2.value = `${max}`;
  range1.value = `${min}`;
  range2.value = `${max}`;
  const tempArray = homePageComponent.visibleProducts.filter(
    (elem: { stock: number; price: number; }) => elem.stock >= min && elem.stock <= max ||
    elem.price >= min && elem.price <= max)
    homePageComponent.visibleProducts = tempArray;
}