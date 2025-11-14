let btn = document.querySelector("button");
let container = document.querySelector(".container");


btn.addEventListener("click", function () {
  let para = document.createElement("p");
  let img = document.createElement("img");
  para.className = "param";
  para.setAttribute("contenteditable", "true");
  img.setAttribute("src", "/webApps/Notes/Delet.gif");
  container.appendChild(para).appendChild(img);
});

container.addEventListener('click',function(e){
if(e.target.tagName==='IMG'){
e.target.parentElement.remove()

}
})
