const itemsList = document.querySelectorAll('.item');
const redirectNav = document.querySelectorAll('.redirect__nav');
const redirectSeeAll = document.querySelectorAll('.redirect__all');

const first = ()=>{
    const account = JSON.parse(localStorage.getItem('user'));
    console.log(account);
    if(account === null){
        location.href='welcome.html';
    }else{
        document.querySelector('.option__login>span').innerText= account.username;
        if(account.premium){
            var p = document.querySelector('.premium');
            p.innerText = '♛ ' + account.premiumName;
            p.style.color='#fefe4e';
        }
    }
};

itemsList.forEach((item, index)=>{
    item.addEventListener("click", function(evt){
        var itm = evt.target;
        var headTitle = itm.parentElement.parentElement.parentElement.querySelector('.header__title').innerText;
        var itmName = itm.querySelector('.item__name').innerText;
        var itmAu;
        var isOneSong;
        if(itm.querySelector('.item__au') === null){
            itmAu = itmName;
            isOneSong =false;
        }else{
            itmAu = itm.querySelector('.item__au').innerText;
            isOneSong =true;
        }
        var itmImg = itm.querySelector('img').src+"";
        var aSong = {
            id: index,
            title: itmName,
            au: itmAu,
            image: itmImg,
            isOneSong: isOneSong,
        };
        localStorage.removeItem("headerTitle");
        localStorage.setItem("itemName", JSON.stringify(aSong));
        location.href="./song.html";
    })

})

redirectSeeAll.forEach((item, index)=>{
    item.addEventListener("click", function(evt){
        var slc = evt.target.parentElement;
        var topTitle ={
            navTitle: slc.querySelector('section').innerText,
            navImg: `./images/feed/${evt.target.id}.jpg`,
        }
        localStorage.setItem("headerTitle", JSON.stringify(topTitle));
        location.href="./song.html";
    });
});


redirectNav.forEach((item)=>{
    item.addEventListener("click", function(evt){
        console.log(evt);
        var slc = evt.target;
        var topTitle ={
            navTitle: slc.querySelector('a').innerText,
            navImg: `./images/feed/${slc.querySelector('i').innerText}.jpg`,
        }
        localStorage.setItem("headerTitle", JSON.stringify(topTitle));
        location.href="./song.html";
    });
});

first();
