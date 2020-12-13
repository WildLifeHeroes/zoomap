// const animalSeal = document.getElementById("seal");
// const animalFox = document.getElementById("fox");
// const animalSeaLion = document.getElementById("sea_lion");
// const animalWolf = document.getElementById("wolf");
// const animalLemur = document.getElementById("lemur");
// const animalShark1 = document.getElementById("shark1");
// const animalShark2 = document.getElementById("shark2");
// const animalTiger = document.getElementById("tiger");
// const animalLeopard = document.getElementById("leopard");

const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");

function getAnimal(e) {
  e.preventDefault();
  popCard();
}

function popCard() {
  cardWrapper.style.display = "block";
}

window.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target == cardContainer) {
    cardWrapper.style.display = "none";
  }
  if (e.target == closeCardBtn) {
    cardWrapper.style.display = "none";
  }
});


