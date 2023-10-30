const toggler = document.querySelector(".toggler");
const starterPrice = document.getElementById("starter-price");
const proPrice = document.getElementById("pro-price");
const studentPrice = document.getElementById("student-price")
const btnStart = document.getElementsByClassName("card-btn");

var account = JSON.parse(localStorage.getItem('user'));

var tuDong=true;
toggler.checked = tuDong;

checkType();

function checkType(){
    if(toggler.checked){
        document.querySelector('.toggle-switch').lastElementChild.style.fontSize = '16px';
        document.querySelector('.toggle-switch').firstElementChild.style.fontSize = '20px';
    }else{
        document.querySelector('.toggle-switch').lastElementChild.style.fontSize = '20px';
        document.querySelector('.toggle-switch').firstElementChild.style.fontSize = '16px';
    }
    toggler.addEventListener("change", ()=>{
        if(toggler.checked){
            document.querySelector('.toggle-switch').firstElementChild .style.fontSize = '20px';
            document.querySelector('.toggle-switch').lastElementChild.removeAttribute('style');
            starterPrice.innerHTML = `19<span> .000 vnđ / tháng</span> `;
            proPrice.innerHTML = `19<span> .000 vnđ / tháng</span> `; 
            studentPrice.innerHTML = `19<span> .000 vnđ / tháng</span> `; 
            for(let i of btnStart){
                i.innerText = "Bắt đầu";
            }
            let a=[];
            showCart(a);
        }else{
            document.querySelector('.toggle-switch').lastElementChild .style.fontSize = '20px';
            document.querySelector('.toggle-switch').firstElementChild.removeAttribute('style');
            starterPrice.innerHTML = '19<span> .000 vnđ</span>';
            proPrice.innerHTML = '59<span> .000 vnđ</span>'; 
            studentPrice.innerHTML = '12<span> .000 vnđ</span>'; 
            for(let i of btnStart){
                i.innerText = "Chọn";
            }
            let updatedCart = JSON.parse(localStorage.getItem("cartItems"));
            console.log(updatedCart);
            showCart(updatedCart);
        }
        tuDong = toggler.checked;  
    });
}

function convert(str){
    var a = str.trim();
    var x ='';
    x += a[0] +a[1];
    return Number(x);
}

function myFunction(evt){
    let updatedCart = [];
    let newItem = {
        name: evt.target.parentElement.querySelector('.card-title').innerText,
        price:  convert(evt.target.parentElement.querySelector('.card-price').innerText),
        quantity: 1,
    }
    if(!tuDong){    
            if(JSON.parse(localStorage.getItem('cartItems'))===null){
                updatedCart.push(newItem);  // Them item vua chon vao list
                localStorage.setItem('cartItems',JSON.stringify(updatedCart)); //Dua len storage
            }else{
                updatedCart = JSON.parse(localStorage.getItem('cartItems'));
                let i = isExistedInCart(newItem, updatedCart);
                if(i>=0) updatedCart[i].quantity++;
                else  updatedCart.push(newItem);
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            showCart(updatedCart);
        }else{
            account.premium = true;
            account.premiumName = newItem.name;
            localStorage.setItem('user', JSON.stringify(account));
            console.log(account);
            alert('Chúc mừng! Bạn đã đăng kí thành công gói '+newItem.name + ' với giá ' + newItem.price+' .000 vnđ / tháng');
            location.href = 'index.html';
        }
}

function deleteCart(evt){
    const updatedCart = JSON.parse(localStorage.getItem("cartItems"));
    let nameInList = evt.target.parentElement.parentElement.firstChild.innerText;
    updatedCart.forEach((item, index) => {
        if(nameInList === item.name){
            item.quantity =0;
            updatedCart.splice(index, 1);
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    showCart(updatedCart);
}

function showCart(updatedCart){
    let sum=0;
    var strCard ='';
    if(localStorage.cartItems === undefined){
    }else{
        if(updatedCart.length<=0){
            strCard='';
        }else{
            updatedCart.forEach(item=>{
                sum += item.quantity*Number(item.price);
            })

            strCard = '<tr>'+
                        '<th class="left">Tên gói</th>'+
                        '<th class="right">Số lượng</th>'+
                        '</tr>'
            updatedCart.forEach((item)=>{
                strCard +='<tr>'+
                    '<td class="left">'+item.name+'</td>'+
                    '<td class="right">'+item.quantity+ '<icon onclick="deleteCart(event)" class="material-icons">delete</icon></td>'+
                    '</tr>'
            });
            strCard +='<tr>'+
                '<td class="left"> Tổng Cộng </td>'+
                '<td class="right">'+sum+ '</td>'+
                '</tr>';
            strCard +='<tr>'+
                '<td class="left"></td>'+
                '<td class="right"><button onclick="payment()">Thanh toán</button></td>'+
                '</tr>'

        }
        document.querySelector('.card-table > table').innerHTML = strCard;
    }
}

function payment(){
    let updatedCart = JSON.parse(localStorage.getItem("cartItems"));
    var str='';
    updatedCart.forEach((item)=>{
        str += '    \t '+item.name + ' với giá ' + item.price+' .000 vnđ' + ' Số lượng: '+item.quantity+'\n';
    })
    alert('Chúc mừng! Bạn đã đăng kí thành công\n'+str);
    account.premium = true;
    account.premiumName = updatedCart[0].name;
    localStorage.setItem('user', JSON.stringify(account));
    while(updatedCart.length > 0) {
        updatedCart.pop();
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    showCart(updatedCart);
    window.location.href="index.html";
}
function isExistedInCart(item, arrCart){
    let myIndex = -1;
    arrCart.findIndex((itemCard, index) => {
        if(item.name === itemCard.name) myIndex = index;
    });
    return myIndex;
}