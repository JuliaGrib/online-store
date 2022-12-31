import { wfm } from "../tools/util"

//если нет добавленных элементов, то создается пустой массив локальный для будущих элементов
if(wfm.isUdefined((localStorage.productsLocal))){
    localStorage.productsLocal = JSON.stringify({products: []});
}

//console.log(localStorage.productsLocal);