const QUESTIONS = [
  { q: "Capital of India?", options: ["Mumbai","Delhi","Kolkata","Chennai"], correctIndex: 1 },
  { q: "2 + 2 * 2 = ?", options: ["6","8","4","2"], correctIndex: 0 },
  { q: "HTML stands for?", options: ["HyperText Markup Language","Home Tool","HighText","Hyperlink Text"], correctIndex: 0 },
  { q: "Which tag makes a paragraph?", options: ["<p>","<div>","<span>","<h1>"], correctIndex: 0 },
  { q: "JavaScript is used for?", options: ["Styling","Server only","Client interactivity","Database"], correctIndex: 2 }
];

// -------------------- Data --------------------
let students = []; // {id,name}
let answers = {};  // { studentId: [answers...] }
let currentQ = 0;

// -------------------- Student Add --------------------
function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  if (!name) return alert("Enter student name!");
  const id = "stu_" + Date.now() + "_" + Math.floor(Math.random()*1000);
  students.push({ id, name });
  answers[id] = new Array(QUESTIONS.length).fill(null);
  
  document.getElementById("studentName").value = "";
  renderStudents();
  
  if (students.length > 0) {
    document.getElementById("quizArea").style.display="block";
    showQuestion();
  }
}

function renderStudents() {
  document.getElementById("studentsList").innerHTML = 
    students.map(s => `👤 ${s.name}`).join("<br>");
}

// -------------------- Quiz Navigation --------------------
function showQuestion() {
  const q = QUESTIONS[currentQ];
  
  // Question text
  document.getElementById("questionText").innerHTML = 
    `<b>Q${currentQ+1}:</b> ${q.q}`;
  
  // Question options (visible once for all)
  let qHtml = "";
  q.options.forEach((opt,i)=>{
    qHtml += `<div id="option_${i}"><b>${String.fromCharCode(65+i)}.</b> ${opt}</div>`;
  });
  document.getElementById("questionOptions").innerHTML = qHtml;

  // Students answer area (only ABCD radios)
  let html = "";
  students.forEach(s => {
    html += `<div><b>${s.name}:</b> `;
    ["A","B","C","D"].forEach((label, oi) => {
      const checked = answers[s.id][currentQ]===oi ? "checked" : "";
      html += `<label><input type="radio" name="${s.id}" value="${oi}" ${checked}> ${label}</label>`;
    });
    html += `</div>`;
  });
  document.getElementById("studentOptions").innerHTML = html;

  // Save answer on select
  students.forEach(s => {
    document.getElementsByName(s.id).forEach(radio => {
      radio.addEventListener("change", e=>{
        answers[s.id][currentQ] = Number(e.target.value);
      });
    });
  });

  // Buttons visibility
  document.getElementById("prevBtn").style.display = currentQ===0 ? "none" : "inline-block";
  if (currentQ === QUESTIONS.length-1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("finishBtn").style.display = "inline-block";
  } else {
    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("finishBtn").style.display = "none";
  }
}

// -------------------- Show Correct Answer --------------------
function showAnswer() {
  const q = QUESTIONS[currentQ];
  q.options.forEach((opt, i) => {
    const optionDiv = document.getElementById("option_"+i);
    optionDiv.classList.remove("correct","wrong","highlight");
    if (i === q.correctIndex) {
      optionDiv.classList.add("correct","highlight");
    } else {
      // check if any student selected this wrong option
      let someoneWrong = students.some(s => answers[s.id][currentQ] === i);
      if (someoneWrong) optionDiv.classList.add("wrong","highlight");
    }
  });
}

// -------------------- Finish Quiz --------------------
function finishQuiz() {
  if (!allAnsweredForCurrent()) {
    alert("⚠️ Sabhi students last question ka answer select karein!");
    return;
  }

  let results = [];
  students.forEach(s=>{
    let correct=0;
    answers[s.id].forEach((a, idx)=>{
      if (a===QUESTIONS[idx].correctIndex) correct++;
    });
    let percent = Math.round((correct/QUESTIONS.length)*100);
    results.push({name:s.name, percent, ans:answers[s.id]});
  });
  renderLeaderboard(results);
}

function renderLeaderboard(results) {
  results.sort((a,b)=>b.percent-a.percent);
  let html = `<table><tr><th>Rank</th><th>Name</th><th>Score</th><th>Answers</th></tr>`;
  results.forEach((r,i)=>{
    let ansHtml = r.ans.map((a,idx)=>{
      if (a===null) return `<span class="wrong">-</span>`;
      if (a===QUESTIONS[idx].correctIndex) return `<span class="correct">${String.fromCharCode(65+a)}</span>`;
      return `<span class="wrong">${String.fromCharCode(65+a)}</span>`;
    }).join(" | ");
    html += `<tr><td>${i+1}</td><td>${r.name}</td><td>${r.percent}%</td><td>${ansHtml}</td></tr>`;
  });
  html += `</table>`;
  document.getElementById("leaderboard").innerHTML = html;
}

function allAnsweredForCurrent() {
  return students.every(s => answers[s.id][currentQ] !== null);
}

function nextQuestion() {
  if (!allAnsweredForCurrent()) {
    alert("⚠️ Sabhi students apna answer select karein!");
    return;
  }
  if (currentQ < QUESTIONS.length-1) {
    currentQ++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQ > 0) {
    currentQ--;
    showQuestion();
  }
}

// -------------------- Start --------------------
showQuestion();