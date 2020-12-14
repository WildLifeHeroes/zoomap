// const animalSeal = document.getElementById("seal");
// const animalFox = document.getElementById("fox");
// const animalSeaLion = document.getElementById("sea_lion");
// const animalWolf = document.getElementById("wolf");
// const animalLemur = document.getElementById("lemur");
// const animalShark1 = document.getElementById("shark1");
// const animalShark2 = document.getElementById("shark2");
// const animalTiger = document.getElementById("tiger");
// const animalLeopard = document.getElementById("leopard");

/*********************************
 * Animal Card
 *********************************/
const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");

function getAnimal(e) {
  e.preventDefault(); // prevent default behaviors
  infoRequest(e); // fetch data, build card, pop display the card.
}

function infoRequest(e) {
  let animalTitle = e.target.id;
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
      // console.log(animalBack);
      makeCard(
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

//dynamically generate and set animal card
function makeCard(img, name, info) {
  const card = makeCard_Wrapper();
  const classname = "." + `${card.className}`;
  const target = document.querySelector(classname);

  setCard_Images(img);
  setCard_Title(name);
  setCard_descriptions(info);

  target.style.display = "block";
  //popCard(card);
  //return card;
}

// card setter
function setCard_Images(img) {
  let im = document.querySelector(".AnimalImg");
  let u = `"${img}"`;
  im.style.background = `url(${u})`;
}

function setCard_Title(name) {
  let n = document.querySelector("#animal_name");
  n.innerHTML = name;
}

function setCard_descriptions(info) {
  let i = document.querySelector("#animal_description");
  i.innerHTML = info;
}

// element generator
function makeCard_Wrapper() {
  const card_wrapper = document.createElement("div");
  card_wrapper.setAttribute("class", "card_wrapper");
  //card_wrapper.appendChild(makeCard_Container());
  return card_wrapper;
}

function makeCard_Container() {
  const card_container = document.createElement("div");
  card_container.setAttribute("class", "card_container");
  card_container.appendChild(makeCard());
  return card_container;
}

function makeCard_Title() {
  const card_title = document.createElement("div");
  card_title.setAttribute("class", "card_title padding10");
  card_title.appendChild(makeH1());
  card_title.appendChild(makeCloseBtn());
  return card_title;
}

function makeH1() {
  const h1 = document.createElement("h1");
  h1.setAttribute("id", "animal_name");
  h1.innerHTML = "Animal name";
  return h1;
}

function makeCloseBtn() {
  const cBtn = document.createElement("button");
  cBtn.style.content = "X";
  return cBtn;
}

function makeCard_Images() {
  const card_images = document.createElement("div");
  card_images.setAttribute("class", "card_images padding10");
  card_images.appendChild(makeImg());
  return card_images;
}

function makeImg() {
  const img = document.createElement("div");
  img.setAttribute("class", "img padding10");
  return img;
}

function makeCard_descriptions() {
  const card_descriptions = document.createElement("div");
  card_descriptions.setAttribute("class", "card_descriptions padding10");
  card_descriptions.appendChild(makeP());
  return card_descriptions;
}

function makeP() {
  const p = document.createElement("p");
  p.setAttribute("id", "animal_description");
  p.innerHTML = `nobis facere perspiciatis necessitatibus neque omnis?Lorem ipsum
  dolor sit amet consectetur adipisicing elit. Dolor, perspiciatis
  provident? Unde cupiditate et ex, quo voluptatum ipsum, soluta
  ipsam deserunt cumque ipsa illum. Adipisci esse nemo ipsum.
  Eius, ratione.`;
  return p;
}

function makeCard_buttonsNcontainer() {
  const makeCard_buttonContainer = document.createElement("div");
  makeCard_buttonContainer.setAttribute("class", "card_buttons padding10");
  let prev = makeButton("prev", "button", "Prev");
  let video = makeButton("video", "button", "Video");
  let lmore = makeButton("learn_more", "button", "Learn More");
  let feed = makeButton("feed", "button", "Feed");
  let next = makeButton("next", "button", "Next");
  makeCard_buttonContainer.appendChild(prev);
  makeCard_buttonContainer.appendChild(video);
  makeCard_buttonContainer.appendChild(lmore);
  makeCard_buttonContainer.appendChild(feed);
  makeCard_buttonContainer.appendChild(next);
  return makeCard_buttonContainer;
}

function makeButton(idName, className, textContent) {
  const btn = document.createElement("button");
  btn.setAttribute("class", className);
  btn.setAttribute("id", idName);
  btn.innerHTML = textContent;
  return btn;
}

// show card upon event triggered
function popCard(card) {
  const classNm = card.className;
  const elmnt = document.getElementsByClassName(classNm);
  elmnt.style.display = "block";
}

// used to close animal card if user click area outside of animal card or close button
window.addEventListener("click", (e) => {
  //console.log(e.target);
  if (e.target == cardContainer) {
    cardWrapper.style.display = "none";
  }
  if (e.target == closeCardBtn) {
    cardWrapper.style.display = "none";
  }
});

/*********************************
 * ----
 *********************************/
