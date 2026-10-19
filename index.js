let typed = new Typed("#text", { strings: ["Software Engineer", "Full Stack Developer", "AI Product Developer", "Backend Engineer", "Computer Vision Builder"], typeSpeed: 80, backSpeed: 50, backDelay: 1000, loop: true })


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
