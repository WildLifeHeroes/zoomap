/*********************************
 * Animal Card
 *********************************/
const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");
const outterLoginContainer = document.querySelector("#outter_login_container");

/*********************************
 * util listener
 *********************************/
// used to close animal card if user click area outside of animal card or close button.
window.addEventListener("click", (e) => {
  if (
    e.target == cardWrapper ||
    e.target == cardContainer ||
    e.target == closeCardBtn
  ) {
    cardWrapper.style.display = "none";
    clearImg();
  }

  if (e.target == outterLoginContainer || e.target == loginContainer) {
    loginContainer.style.display = "none";
  }
});

/*********************************
 * Login and register
 *********************************/
const loginContainer = document.querySelector("#login_container");

function loginFunc() {
  loginContainer.style.display = "block";
}

function doPost(e) {
  // Prevent form from submitting to the server
  e.preventDefault();
  let form = document.querySelector("#sign_in_form");
  serializeForm(form);
}

function serializeForm(form) {
  let obj = {};
  let formData = new FormData(form);
  for (let key of formData.keys()) {
    //obj[`"${key}"`] = formData.get(key);
    obj[key] = formData.get(key);
  }
  console.log(obj);
  postAPI(obj);
}

function postAPI(obj) {
  axios
    .post("http://localhost:3000/login", obj)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

/*********************************
 * Login and register end
 *********************************/

/*********************************
 * util listener end
 *********************************/

function getAnimal(e) {
  e.preventDefault(); // prevent default behaviors
  clearImg();
  infoRequest(e); // fetch data, build card, pop display the card.
}

function infoRequest(e) {
  let animalTitle = e.target.title;
  urlBuilder(animalTitle); // get current animal
}

function urlBuilder(title) {
  // building the API endpoint URL
  const baseUrl = "http://localhost:3000/info/";
  const queryTerm = title;
  const endPointUrl = `${baseUrl}${queryTerm}`;
  callingAPI(endPointUrl);
}

function callingAPI(url) {
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
        animalBack.animal.info
      );
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

//initiate setting animal card.
function setCard(img, name, info) {
  const card = getCard_Wrapper();
  const classname = "." + `${card.className}`;
  const target = document.querySelector(classname);

  setCard_Images(img);
  setCard_Title(name);
  setCard_descriptions(info);

  popCard(target);
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
