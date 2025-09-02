const inputBox=document.getElementById("input-box");
const container=document.getElementById("listItems");

function buttonClick(){
  if(inputBox.value===""){
    alert("You must be enter something first!")
  }
  else{
    let li=document.createElement("li");
    li.innerHTML=inputBox.value;
    container.appendChild(li)
  }
}