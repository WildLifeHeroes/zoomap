const modalInfo = document.getElementById("modalInfo");

function loginFunc() {
  console.log("login event listener works");
}

function getAnimal(event) {
  event.preventDefault();
  console.log("clicked on " + event.currentTarget.title);
  document.getElementById("modalInfo");
}
