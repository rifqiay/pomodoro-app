const button = document.getElementById("btn");
const buttonReset = document.getElementById("btn-reset");
const menit = document.getElementById("menit");
const detik = document.getElementById("detik");
const time = document.getElementById("time");
const fokus = document.getElementById("fokus");
const rest = document.getElementById("istirahat");
const inputFokus = document.getElementById("input-fokus");
const inputIstirahat = document.getElementById("input-istirahat");
const simpanFokus = document.getElementById("btn-fokus");
const simpanIstirahat = document.getElementById("btn-istirahat");

let minutes = localStorage.getItem("minutes");
let seconds = localStorage.getItem("seconds") || 0;

let waktu;
let istirahat = false;
let waktuFokus;
let waktuIstirahat;
let audio;

simpanFokus.addEventListener("click", () => {
  const data = inputFokus.value;
  waktuFokus = data;
  menit.innerText = waktuFokus;
  fokus.innerText = waktuFokus + " menit";
  inputFokus.value = "";
});

simpanIstirahat.addEventListener("click", () => {
  const data = inputIstirahat.value;
  waktuIstirahat = data;
  rest.innerText = waktuIstirahat + " menit";
  inputIstirahat.value = "";
});

function countDown() {
  if (seconds == 0) {
    if (minutes == 0) {
      clearInterval(waktu);
      audio = new Audio("asset/audio/lato.mp3");
      audio.play();

      if (istirahat) {
        time.innerText = "Istirahat";

        button.innerText = "Mulai istirahat";
      } else {
        time.innerText = "Fokus";

        button.innerText = "Mulai";
      }
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  menit.innerHTML = minutes;
  detik.innerHTML = (seconds < 10 ? "0" : "") + seconds;
  localStorage.setItem("minutes", minutes);
  localStorage.setItem("seconds", seconds);
  button.innerText = "Stop";
}

// cek if set interval running
if (minutes > 0 && seconds > 0) {
  waktu = setInterval(countDown, 1000);
}

// button event
button.addEventListener("click", () => {
  if (button.textContent === "Stop") {
    button.innerText = "Mulai";
    clearInterval(waktu);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
    menit.innerText = minutes;
    detik.innerText = seconds;
    return;
  } else if (button.textContent === "Mulai istirahat") {
    time.innerText = "Istirahat";
    minutes = waktuIstirahat || 5;
    seconds = 0;
    waktu = setInterval(countDown, 1000);
    button.innerText = "Stop";
    audio = audio.pause();
    istirahat = false;
    return;
  }

  minutes = waktuFokus || 25;
  audio = audio?.pause();
  istirahat = true;
  waktu = setInterval(countDown, 1000);
});

// reset event
buttonReset.addEventListener("click", () => {
  clearInterval(waktu);
  istirahat = false;
  menit.innerText = "00";
  detik.innerText = "00";
  rest.innerText = "5 menit";
  fokus.innerText = "25 menit";
  waktuFokus = 25;
  waktuIstirahat = 5;
  seconds = 0;
  audio = audio?.pause();
  button.innerText = "Mulai";
  localStorage.removeItem("minutes");
  localStorage.removeItem("seconds");
});
