let play=document.getElementById('play');
let music=document.querySelector("audio");
let img=document.querySelector("img");

let a=document.getElementById('artist');
let t=document.getElementById('title');
let prev=document.getElementById('prev');
let next=document.getElementById('next');

let progress=document.getElementById('progress');

let total_duration =document.getElementById('duration');
let current_time =document.getElementById('current_time');

const progress_div=document.getElementById('progress_div');
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
        artist:"Stebin Ben & Payal Dev"
    },
    {
        name:"Song-4",
        title:"Bachalo",
        artist:"Akhil"
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
    music.src="Music/" +song_idx.name +".mp3";
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

//Progress JS work

music.addEventListener("timeupdate", (e)=>
{
    //console.log(e);
   const{currentTime, duration} = e.target;// instead of event.srcElement
   let progress_time =(currentTime/duration)*100;
   
   progress.style.width=`${progress_time}%`;

   //Music duration Update
   
   let min_duration =Math.floor(duration / 60);
   let sec_duration =Math.floor(duration % 60);

   let tot_duration=`${min_duration}:${sec_duration}`;

  
   if(duration)
   {
       //When duration get's calculated only then update the time
     total_duration.textContent=`${tot_duration}`;
   }

   //Current duration Update
   
   let current_min =Math.floor(currentTime/60);
   let current_sec =Math.floor(currentTime%60);

   if(current_sec<10)
   {
       current_sec=`0${current_sec}`;
   }

     let tot_currentTime=`${current_min}:${current_sec}`; 
     current_time.textContent=`${tot_currentTime}`;
     
});

//progress onclick functionality

progress_div.addEventListener("click",(e)=>
{
    //console.log(e);
    const{duration}=music;
    //converting % to sec, as currentTime expects time in sec
    
    let move_progress=(e.offsetX / progress_div.clientWidth) * duration;
    console.log(duration);
    console.log(move_progress);

    //Giving the new time to current time property
    music.currentTime=move_progress;
})

//If music end call next song Function
music.addEventListener("ended",nextSong);

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);




/*
document.addEventListener('click', (s)=>
{
    // s will always be an object of type of the event
    console.log(s);
}
);
*/

// Music Duration Update

     /*      ALTERNATE WAY TO DO
        const{target}=event
        console.log(target.currentTime);
        console.log(target.duration);
   */