let currentSong = new Audio();
let songs;
let songlis;
let currFolder;

function formatSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return `${minutes}:${remainingSeconds}`;
}





function updateSong(){
  songlis.forEach((songli) => {
    if ( songli.querySelector(".sfile").innerHTML == currentSong.src.split(`${currFolder}/`)[1]) {
      console.log(`This song is being played  ${songli.querySelector(".sfile").innerHTML}`);
      songli.style.transform = "scale(1.05)";
      songli.style.backgroundColor = "#313131";
      songli.querySelector(".playleft").style.fontSize = "2.5rem";
      songli.querySelector(".playleft").style.color = "#1DB954";
    } else {
      songli.style.transform = "scale(1)";
      songli.style.backgroundColor = "#1c1c1c";
      songli.querySelector(".playleft").style.fontSize = "2rem";
      songli.querySelector(".playleft").style.color = "white";
    }
 })

}






const playSong = (track, pause = false) => {
  currentSong.src = `${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.className = "ri-pause-circle-fill";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(
    track.split(".mp3")[0]);

  document.querySelector(".songtime").innerHTML = "00:00:00";

  updateSong();
};






async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${currFolder}/`)[1]);
    }
  }
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
      songUL.innerHTML =
        songUL.innerHTML +
        ` <li>
                  <i class="ri-music-2-line"></i>
                  <div class="info">
                    <h4>${
                      song.split(".mp3")[0].replaceAll("%20", " ").split("-")[0]
                    }</h4>
                    <p>${
                      song.split(".mp3")[0].replaceAll("%20", " ").split("-")[1]
                    }</p>
                    <div class="sfile">${song}</div>
                  </div>
                  <i class="playleft ri-play-circle-fill"></i></li>`;
  
  }

  // Add en event listner to every song
  songlis = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));
  songlis.forEach((songli) => {
    updateSong();
    songli.addEventListener("click", () => {
      playSong(songli.querySelector(".sfile").innerHTML);
    });
  });

  playSong(songs[0], true);
  console.log(songs,'we got the songs');
  
}



async function displayAlbums(){
  let b = await fetch(`songs/`);
  let response = await b.text();
  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardbox");

  let array = Array.from(as);
  for(let i = 0; i < array.length; i++){
    const e = array[i];

    if(e.href.includes(`/songs/`)){
      let folder = e.href.split('songs/')[1];
      console.log(folder,'hiiii');
      //get metadata of this folder
      let c = await fetch(`songs/${folder}/info.json`);
      let response = await c.json();
      cardContainer.innerHTML = cardContainer.innerHTML + `<div class="cardinfo">
              <div  data-folder="${folder}" class="card rounded">
                <img src="songs/${folder}/cover.jpg" alt="">
                <h2>${response.title}</h2>
                <p>${response.description}</p>
                <div class="icon-container">
                  <i class="ri-play-large-fill"></i>
                </div>
              </div>
           </div>`
    }
 };

 //load the playlist whenever card is clicked
Array.from(document.getElementsByClassName("card")).forEach((e) => {
  e.addEventListener("click", async (item) => {
    await getSongs(`songs/${item.currentTarget.dataset.folder}`);
  });
});

}



async function main() {
  
  await getSongs(`songs/English-Hits`);

  //Display all the albums on the page
  displayAlbums();

  // Add an event listner to , play , next , previous
play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.className = "ri-pause-circle-fill";
    play.style.color = "white";
  } else {
    currentSong.pause();
    play.className = "ri-play-circle-fill";
    play.style.color = "#808080";
  }
});

next.addEventListener("click", () => {
  // console.log(songs);
  let index = songs.indexOf(currentSong.src.split(`${currFolder}/`)[1]);
  // console.log(index);
  if (index + 1 < songs.length) {
    playSong(songs[index + 1]);
  } else {
    playSong(songs[0]);
  }
});

previous.addEventListener("click", () => {
  // console.log("previous");
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
  // console.log(index);
  if (index - 1 >= 0) {
    playSong(songs[index - 1]);
  } else {
    playSong(songs[songs.length - 1]);
  }
});

//listen for timeupdate event
currentSong.addEventListener("timeupdate", () => {
  let currentTime = formatSeconds(Math.floor(currentSong.currentTime));
  let duration = formatSeconds(Math.floor(currentSong.duration));
  document.querySelector(
    ".songtime"
  ).innerHTML = `${currentTime} / ${duration}`;
  document.querySelector(".circle").style.left =
    (currentSong.currentTime / currentSong.duration) * 100 - 0.2 + "%";
  document.querySelector(".progressionBar").style.width =
    (currentSong.currentTime / currentSong.duration) * 100 + "%";
});


//Add ivent listner to seekbar
document.querySelector(".seekbar").addEventListener("click", (e) => {
  const percent =
    (e.offsetX / e.currentTarget.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percent + "%";
  document.querySelector(".progressionBar").style.width = percent + "%";
  currentSong.currentTime = (currentSong.duration * percent) / 100;
});


document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0";
});

document.querySelector("#close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-150%";
});


}
main();


