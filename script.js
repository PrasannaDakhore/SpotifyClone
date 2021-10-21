
//Initialize variables
let songIndex=0;
let audioElement= new Audio('./songs/m1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName');

let songs=[
    {songName:"Faded",filePath:"songs/m1.mp3",coverPath:"./covers/faded.jpg"},
    {songName:"Cheap Thrills",filePath:"songs/m2.mp3",coverPath:"./covers/cheapthrills.jpg"},
    {songName:"Aabaad Barbaad",filePath:"songs/m3.mp3",coverPath:"./covers/aabadbarbad.jpg"},
    {songName:"Baarish",filePath:"songs/m4.mp3",coverPath:"./covers/baarish.jpg"},
    {songName:"Jingle Bells",filePath:"songs/m5.mp3",coverPath:"./covers/jinglebell.jpg"},
    {songName:"O Aashiqa",filePath:"songs/m6.mp3",coverPath:"./covers/Oashiqua.jpg"}
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;
});

// audioElement.play();

//Handle play/paus on click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;

    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value* audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        })    
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
makeAllPlays();
songIndex=parseInt(e.target.id);
masterSongName.innerText=songs[songIndex].songName; 
e.target.classList.remove('fa-play-circle');
e.target.classList.add('fa-pause-circle');
audioElement.src='songs/m'+`${songIndex+1}`+'.mp3';
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    
audioElement.src='songs/m'+`${songIndex+1}`+'.mp3';
masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex-=1;
    }
    
audioElement.src='songs/m'+`${songIndex+1}`+'.mp3';
masterSongName.innerText=songs[songIndex].songName;
audioElement.currentTime=0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');

})