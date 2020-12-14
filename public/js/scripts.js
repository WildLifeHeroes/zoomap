const host = "http://localhost:3000";
let user = "Dustin"; // dynamically assign

/*********************************
 * Animal Card
 *********************************/
const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");
const outterLoginContainer = document.querySelector("#outter_login_container");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const feed = document.querySelector("#feed");

// used to close animal card if user click area outside of animal card or close button.
window.addEventListener("click", (e) => {
  clickOrPress(e);
});

window.addEventListener('keypress', (e) => {
  if (e.code = "Enter") {
    clickOrPress(e);
  }
})

function clickOrPress(e) {
  switch (e.target) {
    case cardContainer:
    case closeCardBtn:
      cardWrapper.style.display = "none";
      clearImg();
      break;
    case outterLoginContainer:
    case loginContainer:
      loginContainer.style.display = "none";
      break;
    case prev:
      getPrev();
      break;
    case next:
      getNext();
      break;
    case feed:
      displayBadges(e);
      break;
    default:
      break;
  }
}

function displayBadges(e) {
  clearImg();
  const url = host + "/badges/" + user;
  axios.get(url)
    .then((res) => {
      createBadges(res.data);
    })
    .catch((err) => res.status(500).send(err));
}

function createBadges(data) {
  for (let animal of data.images) {

  }
}

function getNext() {}

function getPrev() {}

function getAnimal(e) {
  e.preventDefault(); // prevent default behaviors
  clearImg();
  urlBuilder(e.target.title, e); // fetch data, build card, pop display the card.
}

function urlBuilder(title, e) {
  // building the API endpoint URL
  const baseUrl = host + "/info/";
  const queryTerm = title;
  const endPointUrl = `${baseUrl}${queryTerm}`;
  callingAPI(endPointUrl);
}

function callingAPI(url, e) {
  // Make a request for a user with a given ID
  axios
    .get(url)
    .then(function (response) {
      // handle success
      const animalBack = response.data;

      setCard(
        // send data to make card relevent to the animal
        animalBack.images.images,
        animalBack.animal.name,
        animalBack.animal.info,
        e.target.tabIndex,
      );
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

//initiate setting animal card.
function setCard(img, name, info, tabIndex) {
  const card = getCard_Wrapper();
  const classname = "." + `${card.className}`;
  const target = document.querySelector(classname);

  setCard_Images(img);
  setCard_Title(name);
  setCard_descriptions(info);
  popCard(target, tabIndex);
}

// card setter.
function setCard_Images(img) {
  if (img !== null) {
    let imgContainer = document.querySelector(".AnimalImg");
    let theImg = document.createElement("img");
    imgContainer.style.background = "none";
    theImg.setAttribute("id", "animal_thumnail");
    theImg.src = img;
    imgContainer.appendChild(theImg);
  }
}

function setCard_Title(name) {
  let n = document.querySelector("#animal_name");
  n.innerHTML = name;
}

function setCard_descriptions(info) {
  let i = document.querySelector("#animal_description");
  i.innerHTML = info;
}

// show card upon click event triggered.
function popCard(card) {
  card.style.display = "block";
  document.getElementById("prev").focus();
}

function clearImg() {
  if (document.querySelector("#animal_thumnail") !== null) {
    let currentImg = document.querySelector("#animal_thumnail");
    currentImg.remove();
  }
}

function getCard_Wrapper() {
  const card_wrapper = document.querySelector(".card_wrapper");
  return card_wrapper;
}

/*********************************
 * Animal Card End
 *********************************/

/*********************************
 * Login and register
 *********************************/
const loginContainer = document.querySelector("#login_container");

function loginFunc() {
  loginContainer.style.display = "block";
}

/*********************************
 * Login and register end
 *********************************/