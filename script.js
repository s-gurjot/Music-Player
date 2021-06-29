let play=document.getElementById('play');
let music=document.querySelector("audio");
let img=document.querySelector("img");

let a=document.getElementById('artist');
let t=document.getElementById('title');
let prev=document.getElementById('prev');
let next=document.getElementById('next');

//Creating Array of Objects
let songs=[
    {
        name:"Song-1",
        title:"Friends",
        artist:"Anne-Marie"
    },
    {
        name:"Song-2",
        title:"Sun Fer",
        artist:"Khan Bhaini",
    },
    {
        name:"Song-3",
        title:"Baarish Ban Jana",
        artist:"Stebin Ben"
    }
]

let isPlaying=false;

/* for play Functionality */
let playMusic=()=>
{
   isPlaying=true;
   music.play();
   play.classList.replace('fa-play','fa-pause'); // Replacing the class
   img.classList.add('anime'); //Adding the class

};

/* for pause Functionality */
let pauseMusic= ()=>
{
   isPlaying=false;
   music.pause();
   play.classList.replace('fa-pause','fa-play');
   img.classList.remove('anime'); //* Removing the class*/
};

play.addEventListener('click', ()=>
{
   if(isPlaying)
   {
       pauseMusic();
   }
   else
   {
       playMusic();
   }
});

//Changing the Music data

let loadSong=(song_idx)=>
{
    console.log(song_idx);
    t.textContent=song_idx.title;
    a.textContent=song_idx.artist;
    music.src="music/" +song_idx.name +".mp3";
    img.src="images/"  +song_idx.name +".jpg";
}

let songIndex=0;
let nextSong =()=>
{ 
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}
let prevSong =()=>
{ 
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);


if(music.ended)
{
    img.classList.remove('anime');
}