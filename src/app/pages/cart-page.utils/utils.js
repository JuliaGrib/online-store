import { cartPageComponent } from "../cart-page.component";

export const setCountOnceItem = function() {
  cartPageComponent.countOnceItem = cartPageComponent.arrayProducts.products.reduce(function(acc, el) {
    acc[el.id] = (acc[el.id] || 0) + 1;
    return acc;
  }, {});
}

export const setTempArrayProducts = function() {
  cartPageComponent.tempArrayProducts = cartPageComponent.arrayProducts.products.reduce((o, i) => {
    if (!o.find(v => v.id == i.id)) {
      o.push(i);
    }
    return o;
  }, []); 
}

