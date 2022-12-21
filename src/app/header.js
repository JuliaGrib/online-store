//получаем html элемент счетчика
const countHeader = document.querySelector("#count__header");
// let countNum = 0;

//проверяем есть ли что в localStorage
if(!(localStorage.getItem('countHeader'))){
    //если пусто, пушим 0;
    localStorage.setItem('countHeader', 0);
}else {
    //если не пусто, забираем значение
    countHeader.innerHTML = localStorage.getItem('countHeader');
}

console.log(localStorage.getItem('countHeader'));

const addCount = document.querySelector(".add");
console.log(addCount);



