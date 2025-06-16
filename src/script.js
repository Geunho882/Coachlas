let opensquats = document.querySelector(".exercise-box");
let openedsquat = document.querySelector("#squatexercise");
let popupOverlay = document.querySelector(".popup-overlay");
let closesquat = document.querySelector(".closepopup");

opensquats.addEventListener('click', () => {
  popupOverlay.style.display = "block";
  openedsquat.classList.add('open');
});

closesquat.addEventListener('click',()=>{
    openedsquat.classList.remove('open');
    popupOverlay.style.display = "none";
});