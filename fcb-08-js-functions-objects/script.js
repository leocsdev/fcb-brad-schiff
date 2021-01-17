const ourInput = document.getElementById("ourInput");
const ourHeader = document.getElementById("ourHeader");

ourInput.addEventListener("input", amazingFunction);

function amazingFunction() {
  if (ourInput.value) {
    ourHeader.innerText = ourInput.value + " is cool";
  } else {
    ourHeader.innerText = "Please enter a name";
  }
}
