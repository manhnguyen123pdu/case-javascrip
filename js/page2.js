let arrItem = JSON.parse(window.localStorage.getItem('list_departments'))
let content1 = document.querySelector('.content');
let item1 = "";
for (k = 0; k < arrItem.length; k++) {
    item1 += `
<div class="item">
<img src="${arrItem[k].image}"
    alt="">
<div class="right">
    <a>${arrItem[k].name}</a>
    <h2>${arrItem[k].price}</h2>
    <p>Tellus aliquam laoreet elit accumsan fusce turpis maximus tempus nostra nisi litora ex dolor aliquet
        mus viverra netus ac mollis</p>
    <span>SKU: FS/2022/06/01</span>
    <p> Categories: <a href="">${arrItem[k].cata}</a></p>
    <p>Tag: <a id="tag" href=""> Cabinet</a></p>
</div>
<div class="but">
    <button onclick="addPurch(${k})">Select options</button>
</div>
</div>
`
}
content1.innerHTML = item1;


// mua hang
let purchList = [];

function addPurch(k) {
    flag = true;
    for (m = 0; m < purchList.length; m++) {
        if (arrItem[k].name === purchList[m].name) {
            flag = false;
            break;
        }
    }
    if (flag) {
        purchList.push(arrItem[k])
    }
    localStorage.setItem('purchlist', JSON.stringify(purchList));
    purch2(JSON.parse(window.localStorage.getItem('purchlist')));
    total();
    discount();
}
