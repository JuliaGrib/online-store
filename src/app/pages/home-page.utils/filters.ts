import { homePageComponent } from "../home-page.component";
import { FilterChangeInterface } from "../../../types/FilterChangeInterface";


export const filterBy = function(selector: string, event: FilterChangeInterface) {
  const target: HTMLInputElement = event.target;
  const params: URLSearchParams = new URLSearchParams(document.location.search);
  let key: string | null = params.get(selector)
  if(params.get(selector)) {
    if(!target.checked) {
      // eslint-disable-next-line
      const t: string[] = key!.split('↕');
      const i: number = t.indexOf(target.value);
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

export const filterReload = function(selector: string) {
  const keyArray: string[] = selector.split('↕');
  const tempArray = []
  for(let i = 0; i < homePageComponent.visibleProducts.length; i++) {
    for(let j = 0; j < keyArray.length; j++) {
      if(homePageComponent.visibleProducts[i].category.toLowerCase() == keyArray[j] ||
      homePageComponent.visibleProducts[i].brand.toLowerCase() == keyArray[j]) {
        tempArray.push(homePageComponent.visibleProducts[i])
      }
    }
  }
  const checkboxes:NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]')
  checkboxes.forEach((elem) => {
    if(keyArray.includes(elem.value)) {
      elem.checked = true
    }
  })
  homePageComponent.visibleProducts = tempArray;
}