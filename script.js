setInterval(() => {
    let now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
    document.getElementById("date").textContent = now.toDateString().slice(0, 10);
}, 1000);


let pages = ["home","menu","fitness","heart","music","photos","notify"];
let currentIndex = 0;

function openApp(id){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

   
    currentIndex = pages.indexOf(id);
}

let touchStartX = 0, touchEndX = 0;

const screen = document.getElementById("screen");

screen.addEventListener("touchstart",(e)=>{
    touchStartX = e.touches[0].clientX;
});

screen.addEventListener("touchend",(e)=>{
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe(){
    let swipeDistance = touchEndX - touchStartX;

    if(swipeDistance < -50){         
        currentIndex = (currentIndex + 1) % pages.length;
        openApp(pages[currentIndex]);
    }
    if(swipeDistance > 50){        
        currentIndex = (currentIndex - 1 + pages.length) % pages.length;
        openApp(pages[currentIndex]);
    }
}



let theme = "dark";

function toggleTheme(){
    if(theme === "dark"){
        document.body.classList.add("light");
        theme = "light";
    } else {
        document.body.classList.remove("light");
        theme = "dark";
    }
}



function countSteps(){
    const el = document.getElementById('steps');
    if(!el) return;
    let st = parseInt(el.textContent) || 0;
    el.textContent = st + 100;
}



function randomPulse(){
    pulse.textContent = Math.floor(60 + Math.random()*60) + " bpm";
}


function clearNotify(){
    const list = document.getElementById("noti-list");
    list.innerHTML = ""; // clear first

    const notifications = [
        "Message from Mom ❤️",
        "Fitness steps: 2600 🏃",
        "Google login 🔐",
        "SMS received 📩"
    ];

   
}



const songs = [
    "music/Starboy.mp3",
    "music/waterfall.mp3",
    "music/without_me.mp3"
];

const photos = [
    "photos/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc@._V1_.jpg",
    "photos/Attack_on_Titan.webp",
    "photos/unnamed.jpg",
];

let currentPhoto = 0;

let currentSong = 0;
let player;


window.addEventListener('DOMContentLoaded', function() {
    player = document.getElementById("player");
    loadSong();
    loadPhoto(); 
});


function loadSong(){
    if(player) {
        player.src = songs[currentSong];
        player.load();
        document.getElementById("trackName").innerText = "Playing: " + songs[currentSong];
    }
}

function loadPhoto(){
    const pv = document.getElementById("photoView");
    const pn = document.getElementById("photoName");
    if(pv){
        pv.style.display = '';
        
        const src = photos[currentPhoto] + '?_=' + Date.now();
        console.log('Loading photo', currentPhoto, '/', photos.length, src);
        pv.src = src;
        pv.onerror = function(){
            pv.style.display = 'none';
            if(pn) pn.innerText = 'Image not found: ' + photos[currentPhoto];
            console.warn('Failed to load', photos[currentPhoto]);
        };
        pv.onload = function(){
            pv.style.display = '';
        };
    }
    if(pn){
       
        const parts = photos[currentPhoto].split('/').pop().split('.');
        parts.pop();
        pn.innerText = parts.join('.');
    }
}

function nextPhoto(){
    currentPhoto = (currentPhoto + 1) % photos.length;
    loadPhoto();
}

function prevPhoto(){
    currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
    loadPhoto();
}

function togglePlay(){
    if(player) {
        (player.paused) ? player.play() : player.pause();
    }
}

function nextSong(){
    currentSong = (currentSong + 1) % songs.length;
    loadSong();
    if(player) player.play();
}

function prevSong(){
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong();
    if(player) player.play();
}
let battery = 76;
setInterval(() => {
  battery = battery > 0 ? battery - 1 : 100;
    const sb = document.getElementById("battery");
    if(sb) sb.textContent = battery + "%";
    const bh = document.getElementById("batteryHome");
    if(bh) bh.textContent = battery + "%";
}, 60000);

function randomPulse(){
  let bpm = Math.floor(60 + Math.random()*60);
  pulse.textContent = bpm + " bpm";
  pulse.style.animationDuration = (60 / bpm) + "s";
}
