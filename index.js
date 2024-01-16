let typed = new Typed("#text", { strings: ["Frontend Developer", "Full Stack Developer", "Founder", "Python Developer", "Web Developer"], typeSpeed: 80, backSpeed: 50, backDelay: 1000, loop: true })


let navEle = document.querySelector(".navbar")
let hidden = true;
function myFunction(x) {
    x.classList.toggle("change");
    if(hidden==true){
        navEle.style.display = "flex";
        hidden = false
    }else{
        navEle.style.display = "none";
        hidden = true;
    }
  }