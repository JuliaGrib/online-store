import { wfm } from "./util"

if(wfm.isUdefined((localStorage.productsLocal))){
    localStorage.productsLocal = JSON.stringify({products: []});
}