import { homePageComponent } from "../home-page.component";

export const filterBy = function(selector, event) {
  let target = event.target;
      let params = new URLSearchParams(document.location.search);
      let key = params.get(selector)
      if(params.get(selector)) {
        if(!target.checked) {
          let t = key.split('↕');
          let i = t.indexOf(target.value);
          t.splice(i, 1)
          key = t.join('↕')
        } else{
          key = key + '↕' + target.value
        }
      } else{
        key = target.value
      }
      homePageComponent.makeQuery(selector, key);
      homePageComponent.makeProducts();
}

export const filterReload = function(selector) {
  let keyArray = selector.split('↕');
        let tempArray = []
        for(let i = 0; i < homePageComponent.visibleProducts.length; i++) {
          for(let j = 0; j < keyArray.length; j++) {
            if(homePageComponent.visibleProducts[i].category.toLowerCase() == keyArray[j] ||
            homePageComponent.visibleProducts[i].brand.toLowerCase() == keyArray[j]) {
              tempArray.push(homePageComponent.visibleProducts[i])
            }
          }
        }
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach((elem) => {
          if(keyArray.includes(elem.value)) {
            elem.checked = true
          }
        })
        homePageComponent.visibleProducts = tempArray;
}