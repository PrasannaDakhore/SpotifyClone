//Initialize variables
let songIndex = 0;
let audioElement = new Audio("./songs/m1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let masterTimeStamp = document.getElementById("masterTimeStamp");

let songs = [
  {
    songName: "Faded",
    filePath: "songs/m1.mp3",
    coverPath: "./covers/faded.jpg",
    duration: "00:04:24",
  },
  {
    songName: "Cheap Thrills",
    filePath: "songs/m2.mp3",
    coverPath: "./covers/cheapthrills.jpg",
    duration: "00:03:44",
  },
  {
    songName: "Aabaad Barbaad",
    filePath: "songs/m3.mp3",
    coverPath: "./covers/aabadbarbad.jpg",
    duration: "00:05:09",
  },
  {
    songName: "Baarish",
    filePath: "songs/m4.mp3",
    coverPath: "./covers/baarish.jpg",
    duration: "00:04:36",
  },
  {
    songName: "Jingle Bells",
    filePath: "songs/m5.mp3",
    coverPath: "./covers/jinglebell.jpg",
    duration: "00:03:16",
  },
  {
    songName: "O Aashiqa",
    filePath: "songs/m6.mp3",
    coverPath: "./covers/Oashiqua.jpg",
    duration: "00:05:24",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
  element.getElementsByClassName("timestamp")[0].innerHTML = songs[i].duration;
});

// audioElement.play();

//Handle play/paus on click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    makeAllPlays();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
//Listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seek bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      // console.log(masterPlay.classList.contains.value);
      songIndex = parseInt(e.target.id);
      // console.log(
      //   audioElement.src.includes("m" + `${songIndex + 1}` + ".mp3")
      // );
      if (
        masterPlay.classList.value.includes("fa-pause-circle") &&
        audioElement.src.includes("m" + `${songIndex + 1}` + ".mp3")
      ) {
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
      } else if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        //   songIndex = parseInt(e.target.id);
        //   console.log(
        //     e.target.classList.value.includes(masterPlay.classList[2])
        //   );
        //   console.log(masterPlay.classList[2]);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = "songs/m" + `${songIndex + 1}` + ".mp3";
        masterSongName.innerText = songs[songIndex].songName;
        masterTimeStamp.innerText = songs[songIndex].duration;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
      } else {
        makeAllPlays();
        audioElement.pause();
        //   songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        audioElement.src = "songs/m" + `${songIndex + 1}` + ".mp3";
        masterSongName.innerText = songs[songIndex].songName;
        masterTimeStamp.innerText = songs[songIndex].duration;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 0;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = "songs/m" + `${songIndex + 1}` + ".mp3";
  masterSongName.innerText = songs[songIndex].songName;
  masterTimeStamp.innerText = songs[songIndex].duration;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 5;
  } else {
    songIndex -= 1;
  }

  audioElement.src = "songs/m" + `${songIndex + 1}` + ".mp3";
  masterSongName.innerText = songs[songIndex].songName;
  masterTimeStamp.innerText = songs[songIndex].duration;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
