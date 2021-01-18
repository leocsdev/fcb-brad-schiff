// // OLD WAY OF PROMISES
// // fetch data from dog api
// // this code will return a promise
// // a promise is a way of letting the fetch below to run in the background, regardless how long it takes and does not block any of the code running

// fetch("https://dog.ceo/api/breeds/list/all")
//   // this block of code will run whenever fetch(promise) above is completed
//   .then(function (response) {
//     // response represents the dog api server's response with json method to deal with the actual data
//     // response.json will return another promise
//     return response.json().then(function (data) {
//       console.log(data);
//     });
//   });

let timer;
let deleteFirstPhotoDelay;

// MODERN WAY OF PROMISES
async function start() {
  try {
    // await keyword will prevent the code to run until fetch - promise is completed
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

start();

// data from dogs api (or from any other api) is not an array, its an object with lots of properties
//  JavaScript has a way to return an array based on objects property name by means of Object.keys(param)
// map() will return a brand new array, but when converted to text it well be separated by commas
// join() will get rid of commas
// loadByBreed(this.value) the this keyword refers to the select element
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
      <option>Choose a dog breed</option>
      ${Object.keys(breedList)
        .map(function (breed) {
          return `<option>${breed}</option>`;
        })
        .join("")}
    </select>
  `;
}

// get and load the data from dogs api
async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    // console.log(data);

    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;

  // cancel existing timeouts and intervals
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  // do this if images from API is more than 1
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
      <div
        class="slide"
        style="
          background-image: url('${images[0]}');
        "
      ></div>
      <div
        class="slide"
        style="
          background-image: url('${images[1]}');
        "
      ></div>`;
    currentPosition += 2;
    if (images.length == 2) {
      currentPosition = 0;
    }
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
      <div
        class="slide"
        style="
          background-image: url('${images[0]}');
        "
      ></div>
      <div class="slide"></div>`;
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML(
      "beforeend",
      `<div
        class="slide"
        style="
          background-image: url('${images[currentPosition]}');
        "
      >
      </div>`
    );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);

    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
