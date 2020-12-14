function loginFunc() {
  console.log("login event listener works");
}

//function to get info card for each animal.
function getAnimal(event) {
  event.preventDefault(event);
  console.log("clicked on " + event.currentTarget.title);
  popCard();
}
//Jason's Info card code......
const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");

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

vids = document.getElementById("video_container");
function getVideos() {
  fetch("/animal:videos");
}
