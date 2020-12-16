const host = "https://zoomap.herokuapp.com";
let user = "Dustin"; //TODO: dynamically assign

const cardWrapper = document.querySelector(".card_wrapper");
const cardContainer = document.querySelector(".card_container");
const closeCardBtn = document.querySelector(".close_btn");
const outterLoginContainer = document.querySelector("#outter_login_container");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const feed = document.querySelector("#feed");
const video = document.querySelector("#video");
const badgeWrapper = document.querySelector(".badgeWrapper");

// used to close animal card if user click area outside of animal card or close button.
window.addEventListener("click", (e) => {
  clickOrPress(e);

  if (e.target == feed || e.target == video) {
    cardWrapper.style.display = "none";
    clearImg();
    badgeWrapper.style.display = "block";
  }

  if (
    e.target == cardWrapper ||
    e.target == cardContainer ||
    e.target == closeCardBtn
  ) {
    cardWrapper.style.display = "none";
    clearImg();
  }
});

window.addEventListener("keypress", (e) => {
  if ((e.code = "Enter")) {
    clickOrPress(e);
  }
});

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
      displayBadges();
      break;
    default:
      break;
  }
}

function displayBadges() {
  clearImg();
  const url = host + "/badges/" + user;
  axios
    .get(url)
    .then((res) => {
      createBadges(res.data);
    })
    .catch((err) => console.log(err));
}

function createBadges(data) {
  let tabIndex = 100;
  const container = document.getElementsByClassName("badge-container")[0];
  container.innerHTML = "";
  for (let animal in data.images) {
    tabIndex++;
    const badge = document.createElement("div");
    badge.classList.add("badge");
    const title = document.createElement("div");
    title.innerHTML = animal;
    title.classList.add("badge-title");
    const frame = document.createElement("div");
    frame.classList.add("frame");
    frame.classList.add(animal);
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const badgeImg = document.createElement("img");
    badgeImg.setAttribute("src", data.images[animal].images);
    badgeImg.setAttribute("id", animal + "img");
    badgeImg.classList.add("badge-img");
    const badgeBtnCont = document.createElement("div");
    badgeBtnCont.classList.add("badge-btn-container");
    const oneDollar = document.createElement("button");
    oneDollar.setAttribute("type", "submit");
    oneDollar.setAttribute("tabIndex", tabIndex);
    oneDollar.classList.add("donate-btn");
    oneDollar.classList.add("one-dollar");
    oneDollar.classList.add(animal);
    oneDollar.innerHTML = '$1';
    const fiveDollar = document.createElement('button');
    fiveDollar.setAttribute('type', "submit");
    fiveDollar.setAttribute('tabIndex', ++tabIndex);
    fiveDollar.classList.add("donate-btn");
    fiveDollar.classList.add("five-dollar");
    fiveDollar.classList.add(animal);
    fiveDollar.innerHTML = '$5';
    const tenDollar = document.createElement('button');
    tenDollar.setAttribute('type', "submit");
    tenDollar.setAttribute('tabIndex', ++tabIndex);
    tenDollar.classList.add("donate-btn");
    tenDollar.classList.add("ten-dollar");
    tenDollar.classList.add(animal);
    tenDollar.innerHTML = '$10';

    badge.appendChild(title);
    badge.appendChild(frame);
    badge.appendChild(badgeBtnCont);
    frame.appendChild(imgContainer);
    imgContainer.appendChild(badgeImg);
    badgeBtnCont.appendChild(oneDollar);
    badgeBtnCont.appendChild(fiveDollar);
    badgeBtnCont.appendChild(tenDollar);
    container.appendChild(badge);

    oneDollar.addEventListener("click", () => donation(1, animal));
    fiveDollar.addEventListener("click", () => donation(5, animal));
    tenDollar.addEventListener("click", () => donation(10, animal));
  }
  colorizeEarnedBadges(data.badges);
}

function donation(amount, animal) {
  const url = `${host}/donate/${user}/${animal}/${amount}`;
  axios
    .patch(url)
    .then(() => displayBadges())
    .catch((err) => console.log("donation failed: ", err));
}

function colorizeEarnedBadges(badges) {
  badges.forEach((badge) => {
    const img = document.getElementById(badge.animal + "img");
    const frame = document.querySelector(`.frame.${badge.animal}`);
    if (badge.amountDonated > 0) {
      frame.style.borderColor = "#b08d57";
      img.style.filter = "grayscale(0%)";
    }
    if (badge.amountDonated > 10) {
      frame.style.borderColor = "#c0c0c0";
    }
    if (badge.amountDonated > 20) {
      frame.style.borderColor = "#ffd700";
    }
  });
}

function getNext() {}

function getPrev() {}

/*********************************
 * Animal Card
 *********************************/

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
  callingAPI(endPointUrl, e);
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
        e.target.tabIndex
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
    obj[key] = formData.get(key);
  }
  postAPI(obj);
}
const membership = document.querySelector("#membership");

function postAPI(obj) {
  axios
    .post(`${host}/login`, obj)
    .then((res) => {
      if (res.data.message === undefined) {
        console.log("login success");

      } else {
        console.log(res.data.message);

      }
      membership.innerHTML = obj["name"];
      loginContainer.style.display = "none";
      if (badgeWrapper.style.display === "block"){
        badgeWrapper.style.display = "none";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

/*********************************
 * Animal Videos
 *********************************/
const animalVids = document.getElementById("video_container");

function videoDisplay(vidArray) {
  const video1 = document.getElementById("vid1");
  const video2 = document.getElementById("vid2");
  const video3 = document.getElementById("vid3");
  const video4 = document.getElementById("vid4");
  const video5 = document.getElementById("vid5");
  baseUrl = "https://www.youtube.com/embed/";
  video1.src = baseUrl + vidArray[0];
  console.log("video1" + video1.src);
  video2.src = baseUrl + vidArray[1];
  video3.src = baseUrl + vidArray[2];
  video4.src = baseUrl + vidArray[3];
  video5.src = baseUrl + vidArray[4];
  animalVids.style.display = "block"; //display entire video container to the page.
}

//when video button is clicked call request video method.
function getVideos(event) {
  event.preventDefault();
  console.log("video event listener");
  animalRequest();
}

function animalRequest() {
  const n = document.getElementById("animal_name");
  let animal = n.textContent;
  console.dir(animal);
  urlBuilderVids(animal);
}

function urlBuilderVids(animal) {
  // building the API endpoint URL
  const baseUrl = `${host}/videos/`; //videos
  const endPointUrl = `${baseUrl}${animal}`;
  console.log(endPointUrl);
  getVideosApi(endPointUrl);
}

function getVideosApi(urlPath) {
  axios
    .get(urlPath)
    .then(function (response) {
      // handle success
      const vidArray = [];
      const animalVid = response.data;
      animalVid.forEach((animal) => vidArray.push(animal.id.videoId));
      console.log("animal video clickd " + animalVid);
      console.log("vidArray" + vidArray);
      videoDisplay(vidArray);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

closeButton = document.getElementById("close-Btn");
closeButton.addEventListener("click", closeBtn);

function closeBtn() {
  console.log("close btn");
  animalVids.style.display = "none";
}
/*********************************
 * Animal Videos end
 *********************************/
