 //zoom
 zoom.addEventListener('click', () => {
    if(zoom.className === "ri-zoom-out-line"){
      zoom.className = "ri-zoom-in-line";

      document.querySelector('.cardbox').style.gridTemplateColumns =  "repeat(auto-fill, minmax(10rem, 1fr))" ;
     let cardinfo = Array.from(document.querySelectorAll('.cardinfo'));
     cardinfo.forEach((ci)=>{
      ci.style.height = "16rem";
     })
      
     let cards = Array.from(document.querySelectorAll('.card'));
     cards.forEach((card)=>{
        card.style.width = "9rem" ;
        card.style.height = "12.5rem" ;
        card.getElementsByTagName('h2')[0].style.fontSize = "1rem";
        card.getElementsByTagName('p')[0].style.fontSize = "0.6rem";
     })

     let icons = Array.from(document.querySelectorAll(".ri-play-large-fill"));
      icons.forEach((icon)=>{
        console.log(icon);
        icon.style.fontSize = "1.4rem";
      })
      
    }

    else{
      zoom.className = "ri-zoom-out-line"

      document.querySelector('.cardbox').style.gridTemplateColumns =  "repeat(auto-fill, minmax(20rem, 1fr))" ;
      let cardinfo = Array.from(document.querySelectorAll('.cardinfo'));
      cardinfo.forEach((ci)=>{
       ci.style.height = "30rem";
      })
       
      let cards = Array.from(document.querySelectorAll('.card'));
      cards.forEach((card)=>{
         card.style.width = "20rem" ;
         card.style.height = "27rem" ;
         card.getElementsByTagName('h2')[0].style.fontSize = "2.2rem";
         card.getElementsByTagName('p')[0].style.fontSize = "1rem";
      })

      let icons = Array.from(document.querySelectorAll(".ri-play-large-fill"));
      icons.forEach((icon)=>{
        icon.style.fontSize = "2.3rem";
      })
    }
  })


