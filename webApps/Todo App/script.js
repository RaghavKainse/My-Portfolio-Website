let inputBox = document.getElementById("input-box");
let container = document.getElementById("listItems");

function buttonClick() {
  if (inputBox.value === "") {
    alert("You must be enter something first!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    container.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "<img src=uncheq.png>";
    li.appendChild(span);
  }

  inputBox.value = "";
}

container.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle('checked')
  } else if (e.target.tagName === "IMG") {
    e.target.parentElement.parentElement.remove();
  }
});
