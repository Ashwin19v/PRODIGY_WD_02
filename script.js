const resetbtn = document.getElementsByClassName("reset")[0];
const playbtn = document.getElementsByClassName("play")[0];
const laps = document.getElementsByClassName("laps")[0];
const lapbtn = document.getElementsByClassName("lap")[0];
const sec = document.getElementsByClassName("sec")[0];
const min = document.getElementsByClassName("min")[0];
const msec = document.getElementsByClassName("msec")[0];
const clear = document.getElementsByClassName("clear")[0];
const bg = document.getElementsByClassName("out")[0];
let isplay = false;
let isreset = false;
let seconds = 0;
let secinterval;
let mseconds = 0;
let msecinterval;
let minute = 0;
let mininterval;
let lapitem = 0;
const toggle = () => {
  lapbtn.classList.remove("display");
  resetbtn.classList.remove("display");
};
const play = () => {
  if (!isplay && !isreset) {
    playbtn.innerHTML = "Pause";
    bg.classList.add("animation-bg");
    mininterval = setInterval(() => {
      if (minute === 60) {
        minute = 0;
      }
      min.innerHTML = `${++minute} :&nbsp `;
    }, 60 * 1000);
    secinterval = setInterval(() => {
      if (seconds === 60) {
        seconds = 0;
      }
      sec.innerHTML = `&nbsp;${++seconds} : `;
    }, 1000);
    msecinterval = setInterval(() => {
      if (mseconds === 100) {
        mseconds = 0;
      }
      msec.innerHTML = `&nbsp;${++mseconds}  `;
    }, 10);
    isplay = true;
    isreset = true;
  } else {
    playbtn.innerHTML = "Play";
    clearInterval(secinterval);
    clearInterval(msecinterval);
    clearInterval(mininterval);
    isplay = false;
    isreset = false;
    bg.classList.remove("animation-bg");
  }
  toggle();
};

const reset = () => {
  isreset = true;
  play();
  lapbtn.classList.add("display");
  resetbtn.classList.add("display");
  min.innerHTML = "0 : ";
  sec.innerHTML = "&nbsp 0 :";
  msec.innerHTML = "&nbsp 0 ";
};

const lap = () => {
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timestamp = document.createElement("span");
  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timestamp.setAttribute("class", "time-stamp");
  number.innerHTML = `# ${lapitem++}`;
  timestamp.innerHTML = `${minute} : ${seconds} : ${mseconds}`;
  li.append(number, timestamp);
  laps.append(li);
  clear.classList.remove("display");
};
clear.addEventListener("click", (event) => {
  laps.innerHTML = "";
  lapitem = 0;
  laps.append(clear);
  clear.classList.add("display");
});
playbtn.addEventListener("click", play);
resetbtn.addEventListener("click", reset);
lapbtn.addEventListener("click", lap);
