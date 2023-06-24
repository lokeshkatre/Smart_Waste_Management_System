const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click",()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


var depthValue=document.getElementById("depth-value").textContent
var depthValueFloat=parseFloat(depthValue)

if(depthValueFloat<5){
const element=document.getElementsByClassName("popup-header")[0]
element.style.backgroundColor="red";
}
else{
    alarm.pause()
}