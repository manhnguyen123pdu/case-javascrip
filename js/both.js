function wishQuanlity() {
    let wishitem = document.querySelectorAll('.wishitem');
    if (wishitem.length !== 0) {
        for (i = 0; i < wishitem.length; i++) {
            wishitem[i].innerHTML = JSON.parse(window.localStorage.getItem('list_departments')).length;
        }
    }
}

wishQuanlity()

function viewcart() {
    let shopcart = document.querySelector('.shopcart');
    shopcart.classList.add('visible')
}

function out() {
    let shopcart = document.querySelector('.shopcart');
    shopcart.classList.remove('visible')
}
let purlist = JSON.parse(window.localStorage.getItem('purchlist'));
function purch2(arr) {
    purlist = arr;
    purch();
}
function purch() {
    localStorage.setItem('purchlist', JSON.stringify(purlist));
    let shopitems = document.querySelectorAll('.shop__items');
    let content2 = '';
    for (i = 0; i < purlist.length; i++) {
        let price
        if (Number(purlist[i].discount)) {
            price = ((Number(purlist[i].price) * Number(purlist[i].quanlity)) * (100 - Number(purlist[i].discount))) / 100;
        }
        else {
            price = (Number(purlist[i].price) * Number(purlist[i].quanlity));
        }
        content2 += `
    <div class="product__item${i} ">
    <div class="shop__item ">
                    <div class="shop__image">
                        <img src="${purlist[i].image}" alt="">
                    </div>
                    <div class="shop__info">
                        <h4>${purlist[i].name}</h4>
                        <p>Price: <span>$ ${purlist[i].price}</span></p>
                    </div>
                    <div class="shop__price">
                        <p> ${price.toFixed(2)} </p>
                    </div>
                </div>
                <div class="quality">
                    <div class="quality__left">
                    <button onclick=minus(${i})>-</button>
                    <button class="qlty">${purlist[i].quanlity}</button>
                    <button onclick=plus(${i})>+</button>
                    </div>
                    <div class="quality__right"> 
                        <button onclick=remove(${i})><i class="fa fa-trash"></i> Remove</button>
                    </div>
                </div>
                </div>
    `;
    }
    for (k = 0; k < shopitems.length; k++) {
        shopitems[k].innerHTML = content2;
    }
}
purch()
// JSON.parse();
function plus(i) {
    purlist[i].quanlity = Number(purlist[i].quanlity) + 1;
    purch();
    total();
    discount();
}
function minus(i) {
    if (Number(purlist[i].quanlity) == 1) {
        remove(i);
        purch();
        total();
        discount();
    }
    else {
        purlist[i].quanlity = Number(purlist[i].quanlity) - 1;
        purch();
        total();
        discount();
    }

}
function remove(i) {
    purlist.splice(i, 1);
    purch();
    total();
    discount();
}

function total() {
    let sum = 0;
    let total = document.querySelectorAll('.total')
    for (k = 0; k < total.length; k++) {
        for (i = 0; i < purlist.length; i++) {
            if (Number(purlist[i].discount)) {
                sum += ((Number(purlist[i].price) * Number(purlist[i].quanlity)) * (100 - Number(purlist[i].discount))) / 100;
            }
            else {
                sum += (Number(purlist[i].price) * Number(purlist[i].quanlity));
            }
        }
        total[k].innerHTML = sum.toFixed(2);
    }
}
total()

function discount() {
    let sum = 0;
    let subtotal = document.querySelectorAll('.Subtotall')
    for (k = 0; k < subtotal.length; k++) {
        for (i = 0; i < purlist.length; i++) {
            if (Number(purlist[i].discount != 0)) {
                sum += ((Number(purlist[i].price) * Number(purlist[i].quanlity)) * (Number(purlist[i].discount))) / 100;
            }

        }
        subtotal[k].innerHTML = sum.toFixed(2);
    }
}
discount()

function order() {
    document.querySelector('.order').classList.add('ordervisivle');
    listorder()
}
function outoder() {
    document.querySelector('.order').classList.remove('ordervisivle')
}
function listorder() {
    let content3 = '';
    let list__order = document.querySelector('.list__order')
    let purlist = JSON.parse(window.localStorage.getItem('purchlist'));
    for (i = 0; i < purlist.length; i++) {
        let price = ''
        if (Number(purlist[i].discount)) {
            price = ((Number(purlist[i].price) * Number(purlist[i].quanlity)) * (100 - Number(purlist[i].discount))) / 100;
        }
        else {
            price = (Number(purlist[i].price) * Number(purlist[i].quanlity));
        }
        content3 += `
    <div class="oder__item">
    <p>${purlist[i].name} x ${purlist[i].quanlity} </p>
    <p>$${price.toFixed(2)}</p>
    </div>
    `
    }
    let sum = 0;
    for (i = 0; i < purlist.length; i++) {
        if (Number(purlist[i].discount)) {
            sum += ((Number(purlist[i].price) * Number(purlist[i].quanlity)) * (100 - Number(purlist[i].discount))) / 100;
        }
        else {
            sum += (Number(purlist[i].price) * Number(purlist[i].quanlity));
        }
    }
    list__order.innerHTML = content3;
    document.querySelector('.totalOrder').innerHTML = sum.toFixed(2);
}
let arrPurchase = [];
function done() {
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let company = document.querySelector('#company').value;
    let Country = document.querySelector('#Country').value;
    let street = document.querySelector('#street').value;
    let apartment = document.querySelector('#apartment').value;
    let addinfo = document.querySelector('#addinfo').value;
    let result
    if(document.querySelector('#date').value==''){
        let date = new Date();
        result = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
    else{
        result=document.querySelector('#date').value;
    }

    if (JSON.parse(window.localStorage.getItem('purchlistOder')).length != 0) {
        arrPurchase = JSON.parse(window.localStorage.getItem('purchlistOder'));
    }
    arrProduct = JSON.parse(window.localStorage.getItem('purchlist'));
    arrPurchase.push(new listorder2(firstname, lastname, company, Country, street, apartment, addinfo, arrProduct, 'New', result));
    localStorage.setItem('purchlistOder', JSON.stringify(arrPurchase));
    console.log(JSON.parse(window.localStorage.getItem('purchlistOder')));
    if (purlist.length != 0) {
        purlist.splice(0, purlist.length);
        purch();
        total();
        discount();
    }
    document.querySelector('.order').classList.remove('ordervisivle');

}
