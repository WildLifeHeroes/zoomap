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
  let animalTitle = e.target.title;
  console.log(animalTitle);
  urlBuilder(animalTitle); // get current animal
}

function urlBuilder(title) {
  // building the API endpoint URL
  const baseUrl = "http://localhost:3000/info/"; //videos
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
      console.log(animalBack);

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
  const card = makeCard_Wrapper();
  const classname = "." + `${card.className}`;
  const target = document.querySelector(classname);

  setCard_Images(img);
  setCard_Title(name);
  setCard_descriptions(info);

  popCard(target);
}

// card setter.
function setCard_Images(img) {
  // let im = document.querySelector(".AnimalImg");
  // let u = `"${img}"`;
  // im.style.background = `url(${u})`;
  if (img !== null) {
    let imgContainer = document.querySelector(".AnimalImg");
    let theImg = document.createElement("img");
    theImg.setAttribute("id", "animal_thumnail");
    theImg.src = img;
    // theImg.style.width = "180px";
    // theImg.style.height = "180px";
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

// used to close animal card if user click area outside of animal card or close button.
window.addEventListener("click", (e) => {
  if (e.target == cardContainer) {
    cardWrapper.style.display = "none";
    clearImg();
  }
  if (e.target == closeCardBtn) {
    cardWrapper.style.display = "none";
    clearImg();
  }
});

function clearImg() {
  if (document.querySelector("#animal_thumnail") !== null) {
    let currentImg = document.querySelector("#animal_thumnail");
    currentImg.remove();
  }
}

// parent element generator.
function makeCard_Wrapper() {
  const card_wrapper = document.createElement("div");
  card_wrapper.setAttribute("class", "card_wrapper");
  return card_wrapper;
}

// function makeCard_Container() {
//   const card_container = document.createElement("div");
//   card_container.setAttribute("class", "card_container");
//   card_container.appendChild(makeCard());
//   return card_container;
// }

// function makeCard_Title() {
//   const card_title = document.createElement("div");
//   card_title.setAttribute("class", "card_title padding10");
//   card_title.appendChild(makeH1());
//   card_title.appendChild(makeCloseBtn());
//   return card_title;
// }

// function makeH1() {
//   const h1 = document.createElement("h1");
//   h1.setAttribute("id", "animal_name");
//   h1.innerHTML = "Animal name";
//   return h1;
// }

// function makeCloseBtn() {
//   const cBtn = document.createElement("button");
//   cBtn.style.content = "X";
//   return cBtn;
// }

// function makeCard_Images() {
//   const card_images = document.createElement("div");
//   card_images.setAttribute("class", "card_images padding10");
//   card_images.appendChild(makeImg());
//   return card_images;
// }

// function makeImg() {
//   const img = document.createElement("div");
//   img.setAttribute("class", "img padding10");
//   return img;
// }

// function makeCard_descriptions() {
//   const card_descriptions = document.createElement("div");
//   card_descriptions.setAttribute("class", "card_descriptions padding10");
//   card_descriptions.appendChild(makeP());
//   return card_descriptions;
// }

// function makeP() {
//   const p = document.createElement("p");
//   p.setAttribute("id", "animal_description");
//   p.innerHTML = `nobis facere perspiciatis necessitatibus neque omnis?Lorem ipsum
//   dolor sit amet consectetur adipisicing elit. Dolor, perspiciatis
//   provident? Unde cupiditate et ex, quo voluptatum ipsum, soluta
//   ipsam deserunt cumque ipsa illum. Adipisci esse nemo ipsum.
//   Eius, ratione.`;
//   return p;
// }

// function makeCard_buttonsNcontainer() {
//   const makeCard_buttonContainer = document.createElement("div");
//   makeCard_buttonContainer.setAttribute("class", "card_buttons padding10");
//   let prev = makeButton("prev", "button", "Prev");
//   let video = makeButton("video", "button", "Video");
//   let lmore = makeButton("learn_more", "button", "Learn More");
//   let feed = makeButton("feed", "button", "Feed");
//   let next = makeButton("next", "button", "Next");
//   makeCard_buttonContainer.appendChild(prev);
//   makeCard_buttonContainer.appendChild(video);
//   makeCard_buttonContainer.appendChild(lmore);
//   makeCard_buttonContainer.appendChild(feed);
//   makeCard_buttonContainer.appendChild(next);
//   return makeCard_buttonContainer;
// }

// function makeButton(idName, className, textContent) {
//   const btn = document.createElement("button");
//   btn.setAttribute("class", className);
//   btn.setAttribute("id", idName);
//   btn.innerHTML = textContent;
//   return btn;
// }

/*********************************
 * Animal Card End
 *********************************/

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
  animalRequest(event);
}

function animalRequest() {
  const n = document.getElementById("animal_name");
  let animal = n.textContent;
  console.dir(animal);
  urlBuilderVids(animal);
}
function urlBuilderVids(animal) {
  // building the API endpoint URL
  const baseUrl = "http://localhost:3000/videos/"; //videos
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
/*********************************
 * Animal Videos end
 *********************************/
