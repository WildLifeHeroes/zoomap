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
