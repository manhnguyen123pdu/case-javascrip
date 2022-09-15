productitem = [
    new item('17', './img/item1.PNG', 'Batchata lamp', 4, '15.00', 'Lamps', '1'),
    new item('', './img/item2.PNG', 'Circle corners table', 3, '145.00', 'Tables', '1'),
    new item('18', './img/item3.PNG', 'Circle lamp', 4, '120.00', 'lamps', '1'),
    new item('', './img/item4.PNG', 'Cozy armchair', 2, '221.99', 'Chairs', '1'),
    new item('7', './img/item5.PNG', 'Dining table', 5, '7.100', 'Tables', '1'),
    new item('2', './img/item6.PNG', 'Fancy armchair', 5, '855.00', 'Chairs', '1'),
]


function login() {
    let acount = document.querySelector('#acount').value;
    let pass = document.querySelector('#password').value;
    let log_in = document.querySelector('.log__in');
    if (acount == 'manhnguyen.ptit@gmail.com' && pass == '1234') {
        log_in.classList.add('hind')
    }
}

function displayAdmin() {
    let product = JSON.parse(window.localStorage.getItem('product'));
    let content5 = `
<tr>
<td>STT</td>
<td>Name</td>
<td>Image</td>
<td>Price $</td>
<td>Discount %</td>
<td>Catarary</td>
<td>Vote</td>
<td>Status</td>
</tr>
`
    for (i = 0; i < product.length; i++) {
        content5 += `
    <tr>
    <td>${i + 1}</td>
    <td>${product[i].name}</td>
    <td><img src="${product[i].image}" alt=""></td>
    <td>$ ${product[i].price}</td>
    <td>${product[i].discount} </td>
    <td>${product[i].cata}</td>
    <td>${product[i].vote}</td>
    <td><button onclick="remove(${i})" >Delete</button></td>
    </tr>
    `
    }
    let listAdmin = document.querySelector('.listAdmin');
    listAdmin.innerHTML = content5;

}
displayAdmin()


function insert() {
    let product = JSON.parse(window.localStorage.getItem('product'));
    let name = document.querySelector('#name').value;
    let image = document.querySelector('#image').value;
    let price = document.querySelector('#price').value;
    let discount = document.querySelector('#discount').value;
    let cata = document.querySelector('#cata').value;
    let vote = document.querySelector('#vote').value;
    let insertItem = new item(discount, image, name, vote, price, cata, 1, 0)
    product.push(insertItem)
    localStorage.setItem('product', JSON.stringify(product));
    document.querySelector('.insert__product').classList.remove('d-flex')
    displayAdmin()

}
function remove(i) {
    let product = JSON.parse(window.localStorage.getItem('product'));
    product.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(product));
    displayAdmin();
    console.log(i)
}

function showInsert() {
    document.querySelector('.insert__product').classList.add('d-flex')
}

function reset() {
    localStorage.setItem('purchlist', JSON.stringify(""));
    localStorage.setItem('list_departments', JSON.stringify(""));
    localStorage.setItem('product', JSON.stringify(""));
    localStorage.setItem('purchlistOder', JSON.stringify(""));
    localStorage.setItem('product', JSON.stringify(productitem));

}

//đơn  hàng
function list_Oder() {
    let listOder = JSON.parse(window.localStorage.getItem('purchlistOder'));
    let content4 =
        `
        <tr>
            <td>No.</td>
            <td>Name Customer</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Total</td>
            <td>Status</td>
            <td>Detail</td>
        </tr>`
        ;
    for (k = 0; k < listOder.length; k++) {
        let total = 0;
        for (m = 0; m < listOder[k].arrProduct.length; m++) {
            if (listOder[k].arrProduct[m].discount == 0) {
                total += Number(listOder[k].arrProduct[m].price) * Number(listOder[k].arrProduct[m].quanlity);
            }
            else {
                total += (Number(listOder[k].arrProduct[m].price) * (100 - Number(listOder[k].arrProduct[m].discount)) / 100) * Number(listOder[k].arrProduct[m].quanlity);
            }
        }
        content4 +=
            `
        <tr>
            <td>${listOder[k].date}</td>
            <td>${listOder[k].firstname} ${listOder[k].lastname} </td>
            <td>${listOder[k].apartment}</td>
            <td>${listOder[k].street}</td>
            <td>${total.toFixed(2)}</td>
            <td>${listOder[k].status}</td>
            <td><button onclick="detail(${k})"> Detail</button></td>
        </tr>
        `
    }

    document.querySelector('.listpurch').innerHTML = content4

}
list_Oder()


function print2() {
    document.querySelector('.receipt').classList.remove('scroll');
    document.querySelector('.prt').classList.add('hind2');
    document.querySelector('.out').classList.add('visi');

}
function outReceipt() {
    document.querySelector('.receipt').classList.remove('d-block');
}

function detail(k) {
    let listOder = JSON.parse(window.localStorage.getItem('purchlistOder'));
    listOder[k].status='Done';
    localStorage.setItem('purchlistOder', JSON.stringify(listOder));
    list_Oder()
    document.querySelector('.receipt').classList.add('d-block');
    document.querySelector('.prt').classList.remove('hind2');
    document.querySelector('.out').classList.remove('visi');
    let content8=`<i>Ngày 14 tháng 09 năm 2022</i>`
    console.log(listOder[k].date)
    let content7 = `
     <p><b>Họ tên người mua hàng:</b> ${listOder[k].firstname} ${listOder[k].lastname} </p>
     <p><b>Tên đơn vị: </b>${listOder[k].company}</p>
     <p><b>Địa chỉ: </b>${listOder[k].street} </p>
     <p><b>Số điện thoại: </b>${listOder[k].apartment} </p>
     `
    let content6 = `
    </tr>
    <th>STT</th>
        <th>Tên hàng hóa, dịch vụ</th>
        <th>Đơn vị tính</th>
        <th>Số lượng</th>
        <th>Đơn giá </th>
        <th>Thành tiền</th>
    </tr>
    <tr>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>1</th>
        <th>2</th>
        <th>3=1x2</th>
    </tr>
     `
    let total = 0;
    let tax;
    let includetax;
    for (n = 0; n < listOder[k].arrProduct.length; n++) {
        let sum = 0;
        if (listOder[k].arrProduct[n].discount == 0) {
            sum = listOder[k].arrProduct[n].price * listOder[k].arrProduct[n].quanlity
        }
        else {
            sum = listOder[k].arrProduct[n].price * listOder[k].arrProduct[n].quanlity * (100 - listOder[k].arrProduct[n].discount) / 100
        }
        total += sum;
        tax = total * 5 / 100;
        includetax = total + tax;
        content6 += `
        <tr>
            <td>${n + 1}</td>
            <td>${listOder[k].arrProduct[n].name}</td>
            <td> Cái</td>
            <td>${listOder[k].arrProduct[n].quanlity}</td>
            <td>${listOder[k].arrProduct[n].price}</td>
            <td>${sum}</td>
        </tr>
        `
    }

    content6 += `
         <tr>
             <td colspan="3">Cộng tiền hàng</td>
             <td style="text-align: end;" colspan="3">${total}</td>
         </tr>
         <tr>
             <td colspan="3">
                 <span>Thuế suất GTGT</span>
             </td>
             <td colspan="3">
                 <div style="display:flex; justify-content: space-between;">
                     <span>Tiền thuế GTGT(5%):</span>
                     <span>${tax.toFixed(2)} </span>
                 </div>
             </td>
         </tr>
         <tr>
             <td colspan="3">
                 <p>Tổng tiền thanh toán</p>
             </td>
             <td colspan="3">
                 <p style="text-align: right;">${includetax.toFixed(2)}</p>
             </td>
         </tr>
    `
    document.querySelector('.table__receipt').innerHTML = content6;
    document.querySelector('.receipt__info2').innerHTML = content7;
    document.querySelector('.dayreceipt').innerHTML = content8;

}

// analys
let january = []
let february = []
let march = []
let april = []
let may = []
let june = []
let july = []
let august = []
let september = []
let october = []
let november = []
let december = []


function saleChart() {
    let listOder = JSON.parse(window.localStorage.getItem('purchlistOder'));
    for (i = 0; i < listOder.length; i++) {
        let month = listOder[i].date.slice(5, 7);
        if (month === "01") {
            january.push(listOder[i])
        }
        else if (month == "02") {
            february.push(listOder[i])
        }
        else if (month == "03") {
            march.push(listOder[i])
        }
        else if (month == "04") {
            april.push(listOder[i])
        }
        else if (month == "05") {
            may.push(listOder[i])
        }
        else if (month == "06") {
            june.push(listOder[i])
        }
        else if (month == "07") {
            july.push(listOder[i])
        }
        else if (month == "08") {
            august.push(listOder[i])
        }
        else if (month == "09" || month == "9-") {
            september.push(listOder[i])
        }
        else if (month == "10") {
            october.push(listOder[i])
        }
        else if (month == "11") {
            november.push(listOder[i])
        }
        else if (month == "12") {
            december.push(listOder[i])

        }
    }

    let saleJanuary = 0;
    for (k = 0; k < january.length; k++) {
        let sum = 0;
        for (n = 0; n < january[k].arrProduct.length; n++) {
            sum += Number(january[k].arrProduct[n].price) * Number(january[k].arrProduct[n].quanlity)
        }
        saleJanuary += sum
    }

    let saleFebruary = 0;
    for (k = 0; k < february.length; k++) {
        let sum = 0;
        for (n = 0; n < february[k].arrProduct.length; n++) {
            sum += Number(february[k].arrProduct[n].price) * Number(february[k].arrProduct[n].quanlity)
        }
        saleFebruary += sum
    }

    let saleMarch = 0;
    for (k = 0; k < march.length; k++) {
        let sum = 0;
        for (n = 0; n < march[k].arrProduct.length; n++) {
            sum += Number(march[k].arrProduct[n].price) * Number(march[k].arrProduct[n].quanlity)
        }
        salesaleMarch += sum
    }
    let saleApril = 0;
    for (k = 0; k < april.length; k++) {
        let sum = 0;
        for (n = 0; n < april[k].arrProduct.length; n++) {
            sum += Number(april[k].arrProduct[n].price) * Number(april[k].arrProduct[n].quanlity)
        }
        saleApril += sum
    }
    let saleMay = 0;
    for (k = 0; k < may.length; k++) {
        let sum = 0;
        for (n = 0; n < may[k].arrProduct.length; n++) {
            sum += Number(may[k].arrProduct[n].price) * Number(may[k].arrProduct[n].quanlity)
        }
        saleMay += sum
    }

    let saleJune = 0;
    for (k = 0; k < june.length; k++) {
        let sum = 0;
        for (n = 0; n < june[k].arrProduct.length; n++) {
            sum += Number(june[k].arrProduct[n].price) * Number(june[k].arrProduct[n].quanlity)
        }
        saleJune += sum
    }
    let saleJuly = 0;
    for (k = 0; k < july.length; k++) {
        let sum = 0;
        for (n = 0; n < july[k].arrProduct.length; n++) {
            sum += Number(july[k].arrProduct[n].price) * Number(july[k].arrProduct[n].quanlity)
        }
        saleJulyr += sum
    }
    let saleAugust = 0;
    for (k = 0; k < august.length; k++) {
        let sum = 0;
        for (n = 0; n < august[k].arrProduct.length; n++) {
            sum += Number(august[k].arrProduct[n].price) * Number(august[k].arrProduct[n].quanlity)
        }
        saleAugust += sum
    }
    let saleSeptember = 0;
    for (k = 0; k < september.length; k++) {
        let sum = 0;
        for (n = 0; n < september[k].arrProduct.length; n++) {
            sum += Number(september[k].arrProduct[n].price) * Number(september[k].arrProduct[n].quanlity)
        }
        saleSeptember += sum
    }
    let saleOctober = 0;
    for (k = 0; k < october.length; k++) {
        let sum = 0;
        for (n = 0; n < october[k].arrProduct.length; n++) {
            sum += Number(october[k].arrProduct[n].price) * Number(october[k].arrProduct[n].quanlity)
        }
        saleOctober += sum
    }
    let saleNovember = 0;
    for (k = 0; k < november.length; k++) {
        let sum = 0;
        for (n = 0; n < november[k].arrProduct.length; n++) {
            sum += Number(november[k].arrProduct[n].price) * Number(november[k].arrProduct[n].quanlity)
        }
        saleNovember += sum
    }
    let saleDecember = 0;
    for (k = 0; k < december.length; k++) {
        let sum = 0;
        for (n = 0; n < december[k].arrProduct.length; n++) {
            sum += Number(december[k].arrProduct[n].price) * Number(december[k].arrProduct[n].quanlity)
        }
        saleDecember += sum
    }

    let myChart = document.getElementById('myChart').getContext('2d');
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
        type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',],
            datasets: [{
                label: 'Population',
                data: [
                    saleJanuary,
                    saleFebruary,
                    saleMarch,
                    saleApril,
                    saleMay,
                    saleJune,
                    saleJuly,
                    saleAugust,
                    saleSeptember,
                    saleOctober,
                    saleNovember,
                    saleDecember,
                ],
                //backgroundColor:'green',
                backgroundColor: [
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(153, 102, 255, 0.6)'

                ],
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Analysis business',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true
            }
        }
    });
}
saleChart()

function saleReport() {
    let product = JSON.parse(window.localStorage.getItem('product'));
    let arrNameProduct = []
    for (n = 0; n < product.length; n++) {
        arrNameProduct.push(product[n].name)
    }
    let month=january;

    if(document.querySelector('#saledetail').value=='january'){
        month = january;
    }
    if(document.querySelector('#saledetail').value=='february'){
        month = february;
    }
    if(document.querySelector('#saledetail').value=='march'){
        month =march;
    }
    if(document.querySelector('#saledetail').value=='april'){
        month =april;
    }
    if(document.querySelector('#saledetail').value=='may'){
        month =may;
    }
    if(document.querySelector('#saledetail').value=='june'){
        month =june;
    }
    if(document.querySelector('#saledetail').value=='july'){
        month =july;
    }
    if(document.querySelector('#saledetail').value=='august'){
        month =august;
    }
    if(document.querySelector('#saledetail').value=='september'){
        month =september;
    }
    if(document.querySelector('#saledetail').value=='october'){
        month =october;
    }
    if(document.querySelector('#saledetail').value=='november'){
        month =november;
    }
    if(document.querySelector('#saledetail').value=='december'){
        month =december;
    }
    let arrSale = []
    for (k = 0; k < month.length; k++) {
        for (n = 0; n < month[k].arrProduct.length; n++) {
            let name = month[k].arrProduct[n].name;
            let quanlity = month[k].arrProduct[n].quanlity;
            let price = month[k].arrProduct[n].price;
            arrSale.push([name, quanlity, price])
        }
    }
    let saleReport = []
    for (b = 0; b < arrNameProduct.length; b++) {
        let arr = []
        let qlty = 0
        let price = 0;
        for (k = 0; k < arrSale.length; k++) {
            if (arrSale[k][0] == arrNameProduct[b]) {
                qlty += Number(arrSale[k][1]);
                price = arrSale[k][2];
            }
        }
        saleReport.push(new arrReport(arrNameProduct[b], qlty, price));
    }
    let content8 = `
    <tr>
        <td>STT</td>
        <td>Product</td>
        <td>Quanlity</td>
        <td>Price</td>
        <td>Total</td>
        <td>Note</td>
    </tr>
    `
    for (i=0;i<saleReport.length;i++){
        content8 += `
    <tr>
        <td>${i+1}</td>
        <td>${saleReport[i].name}</td>
        <td>${saleReport[i].quanlity}</td>
        <td>${Number(saleReport[i].price).toFixed(2)}</td>
        <td>${Number(saleReport[i].getPrice()).toFixed(2)}</td>
        <td></td>
    </tr>
    `
    }

        document.querySelector('#sale__table').innerHTML = content8;
}
saleReport()




function menuProduct() {
    document.querySelector('.menu__product').classList.add('d-block');
    document.querySelector('.menu__analys').classList.remove('d-block');
    document.querySelector('.menu__purchase').classList.remove('d-block');

}
function menupurch() {
    document.querySelector('.menu__purchase').classList.add('d-block');
    document.querySelector('.menu__product').classList.remove('d-block');
    document.querySelector('.menu__analys').classList.remove('d-block');

}
function menuanlys() {
    document.querySelector('.menu__analys').classList.add('d-block');
    document.querySelector('.menu__product').classList.remove('d-block');
    document.querySelector('.menu__purchase').classList.remove('d-block');
}
