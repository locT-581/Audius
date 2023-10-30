const song = document.getElementById("song");
const playBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.getElementById("item__name");
const musicAu = document.getElementById("item__au");
const musicImage = document.getElementById("play-card__avt");
const maskImage = document.querySelector(".play-card__cover");
const playRepeat = document.getElementById("repeat");
const playRandom = document.getElementById("random");
const playAllBtn = document.querySelector(".btn-play");
const playAllBtnIcon = document.getElementsByClassName("play-icon");
const likeIcon = document.getElementById("likeIcon");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isRandom = false;
let isLiked = false;

let timer;

let listSong = [];
/**
 * All song 
 */
const music = [
  {
    id: 1,
    title: "Waiting For You",
    au: "-MONO",
    file: "waiting-for-you.mp3",
    image: './images/song cover img/waiting-for-you.png',
  },
  {
    id: 2,
    title: "Chuyện Đôi Ta",
    au: "-Emcee L(Da LAB) ft Muộii",
    file: "chuyen-doi-ta.mp3",
    image: './images/song cover img/chuyen-doi-ta.png',
  },
  {
    id: 3,
    title: "Chết trong em",
    au: "-Thịnh Suy",
    file: "chet-trong-em.mp3",
    image: './images/song cover img/chet-trong-em.jpg',
  },
  {
    id: 4,
    title: "Vì anh đâu có biết",
    au: "-Madihu (Feat. Vũ.)",
    file: "vi-anh-dau-co-biet.mp3",
    image: './images/song cover img/vi-anh-dau-co-biet.png',
  },
  {
    id: 5,
    title: "Yêu người có ước mơ",
    au: "-Bùi Trường Linh",
    file: "yeu-nguoi-co-uoc-mo.mp3",
    image: './images/song cover img/yeu-nguoi-co-uoc-mo.png',
  },
  {
    id: 6,
    title: "Có em",
    au: "-Madihu (Feat. Low G)",
    file: "co-em.mp3",
    image: './images/song cover img/co-em.jpg',
  },
  {
    id: 7,
    title: "bao tiền một mớ bình yên?",
    au: "-14 Casper & Bon",
    file: "bao-tien-mot-mo-binh-yen.mp3",
    image: './images/song cover img/bao-tien-mot-mo-binh-yen.png',
  },
  {
    id: 8,
    title: "Chạy khỏi thế giới này",
    au: "-Da LAB ft. Phương Ly",
    file: "chay-khoi-the-gioi-nay.mp3",
    image: './images/song cover img/chay-khoi-the-gioi-nay.jpg',
  },
  {
    id: 9,
    title: "Tháng Mấy Em Nhớ Anh?",
    au: "-Hà Anh Tuấn",
    file: "thang-may-em-nho-anh.mp3",
    image: './images/song cover img/thang-may-em-nho-anh.png',
  },
  {
    id: 10,
    title: "Em à",
    au: "-Hà Anh Tuấn",
    file: "em-a.mp3",
    image: './images/song cover img/em-a.png',
  },
  {
    id: 11,
    title: "Tháng tư là lời nói dối của em",
    au: "-Hà Anh Tuấn",
    file: "thang-tu-la-loi-noi-doi-cua-em.mp3",
    image: './images/song cover img/thang-tu-la-loi-noi-doi-cua-em.jpg',
  },
]

song.setAttribute("src", `./music/${music[indexSong].file}`);

playAllBtn.addEventListener('click', function(){
  indexSong=0;
  init(indexSong);
  song.play();
  isPlaying= false;
  playBtn.innerHTML= 'pause';
  for(let i of playAllBtnIcon){
    i.innerHTML= 'pause';
  }
  musicImage.classList.add("is-playing");
  timer = setInterval(displayTimer, 300);
});

likeIcon.addEventListener('click', function(){
  if(isLiked){
    isLiked = false;
    likeIcon.innerHTML='favorite_border';
  }else{
    isLiked = true;
    likeIcon.innerHTML='favorite';
  }
});

playBtn.addEventListener('click',  playPause);

function playPause(){
  if(isPlaying){
    song.play();
    isPlaying= false;
    playBtn.innerHTML= 'pause';
    for(let i of playAllBtnIcon){
      i.innerHTML= 'pause';
    }
    musicImage.classList.add("is-playing");
    console.log(isPlaying);
    timer = setInterval(displayTimer, 300);
  }else{
    song.pause();
    isPlaying= true;
    playBtn.innerHTML= 'play_arrow';
    for(let i of playAllBtnIcon){
      i.innerHTML= 'play_arrow';
    }
    musicImage.classList.remove("is-playing");
    console.log(isPlaying);
    clearInterval(timer);
  }
}


playRepeat.addEventListener("click", function () {
    if (isRepeat) {
      isRepeat = false;
      playRepeat.removeAttribute("style");
    } else {
      isRepeat = true;
      playRepeat.style.color = "#62929e";
    }
});

playRandom.addEventListener("click", function () {
  if (isRandom) {
    isRandom = false;
    playRandom.removeAttribute("style");
  } else {
    isRandom = true;
    playRandom.style.color = "#62929e";
  }
});


song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  if (isRepeat === true){
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }

}


nextBtn.addEventListener("click", function () {
    changeSong(1);
});
prevBtn.addEventListener("click", function () {
    changeSong(-1);
});

function changeSong(dir) {
    if (dir === 1) {
      if(isRandom === true){
         indexSong = Math.floor(Math.random() * listSong.length); 
      }else{
        indexSong++;
        if (indexSong >= listSong.length) {
          indexSong = 0;
        }
      }
      isPlaying = true;
    } else if (dir === -1) {
      indexSong--;
      if (indexSong < 0) {
        indexSong = listSong.length - 1;
      }
      isPlaying = true;
    }
    init(indexSong);
    playPause();
}


function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}


function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value; 
}

function init(indexSong) {
  song.setAttribute("src", `./music/${listSong[indexSong].file}`);
    maskImage.style.backgroundImage=`url('${listSong[indexSong].image}')`;
    musicImage.setAttribute("src", listSong[indexSong].image);
    musicName.textContent = listSong[indexSong].title;
    musicAu.textContent = listSong[indexSong].au;
}
const itemNameTop = document.getElementById("item__name--top");
const itemAuTop = document.getElementById("item__au--top");
const itemAvtTop = document.getElementById("item__avt--top");

function firstLoad(){
  var headerTitle = JSON.parse(localStorage.getItem("headerTitle"));
  var aSong = JSON.parse(localStorage.getItem("itemName"));
  if(headerTitle !== null){
    itemNameTop.innerText= headerTitle.navTitle;
    itemNameTop.style.fontSize = '20px';
    itemAuTop.style.display = 'none';
    listSong = music;
    showListSong(listSong);
    init(indexSong);
    itemAvtTop.setAttribute('src', headerTitle.navImg);
  }else{
    if(aSong.isOneSong == true){
      listSong  = music.filter((song) =>{
        if(song.title == aSong.title){
          return true;
        }else return false;
      });
      itemNameTop.innerText= listSong[0].title;
      itemAuTop.innerText= listSong[0].au;
      itemAvtTop.setAttribute('src', listSong[0].image);
      showListSong(listSong);
      init(indexSong);
    }else{
      listSong  = music.filter((song) =>{
        if(song.au.indexOf(aSong.au)!=-1){
          return true;
        }else return false;
      });
      itemNameTop.innerText= aSong.au;
      itemNameTop.style.fontSize = '20px';
      itemAuTop.style.display = 'none';
      itemAvtTop.setAttribute('src', aSong.image);
      init(indexSong);
      showListSong(listSong);
    }
  }
}

function playOnListSong(event){
  var songRow = event.target;
  var songRowTitle = songRow.querySelector('.item__name').innerText;
  for(let i=0; i<listSong.length; i++){
    if(listSong[i].title == songRowTitle){
      init(i);
      song.play();
      console.log(isPlaying);
      isPlaying= false;
      musicImage.classList.add("is-playing");
      playBtn.innerHTML= 'pause';
      for(let i of playAllBtnIcon){
        i.innerHTML= 'pause';
      }
      timer = setInterval(displayTimer, 300);
    }
  }
}

function showListSong(list){
  var strShow = '<hr/>';
  for(let i=0; i<list.length; i++){
    strShow += '<section onclick="playOnListSong(event)" class="song row w-100">'+
    '<section class="song-info h-100 d-flex align-items-center">'+
    '<icon class="material-icons">music_note</icon>'+
    ' <img src="'+list[i].image+'" '+
    'class="avt-song" alt="avatar"/>'+
    '<section class="item-song__title p-0 m-0">'+
    '<section class="item__name p-0">'+list[i].title+'</section>'+
    '<section class="item__au p-0">'+list[i].au+'</section>'+
    '</section> '+
    '</section>'+
    '<section class="song-option d-flex justify-content-end align-items-end">'+
    '<section class="d-flex h-100 flex-column justify-content-end">'+
    '<icon class="material-icons w-100">play_arrow</icon>' +
    '<span class="listens">364,5k</span>'+
    '</section>'+
    '</section>'+
    '</section>'
  }
  document.getElementById('list-song').innerHTML = strShow;
}

firstLoad();
displayTimer();

