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

// MODERN WAY OF PROMISES
async function start() {
  // await keyword will prevent the code to run until fetch(promise) is completed
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  // console.log(data);

  createBreedList(data.message);
}

start();

// data from dogs api (or from any other api) is not an array, it's an object with lots of properties
//  JavaScript has a way to return an array based on object's property name by means of Object.keys(param)
// map() will return a brand new array, but when converted to text it well be separated by commas
// join() will get rid of commas
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select>
    <option>Choose a dog breed</option>
    ${Object.keys(breedList)
      .map(function (breed) {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>`;
}
