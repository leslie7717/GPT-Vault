const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "Java", color: "#3b82f6" },
  { name: "C++", color: "#16a34a" },
  { name: "Python", color: "#ef4444" },
  { name: "General", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".answer-form");
const answersList = document.querySelector(".answers-list");

// Create DOM elements: Render facts in list
answersList.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://cohjeduincxdnssavdsk.supabase.co/rest/v1/answers",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGplZHVpbmN4ZG5zc2F2ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODU3NTgsImV4cCI6MTk5NjE2MTc1OH0.gmP7OgVpCPJH1XQXG35riN8dpLKB4lI2TGGpzw5HbF0",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGplZHVpbmN4ZG5zc2F2ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODU3NTgsImV4cCI6MTk5NjE2MTc1OH0.gmP7OgVpCPJH1XQXG35riN8dpLKB4lI2TGGpzw5HbF0",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const filtedData = data.filter((answer) => answer.category === "C++");
  // console.log(filtedData);
  createAnswersList(data);
}

function createAnswersList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="answer">
  <p>
    ${fact.text}
    <a class="source"
       href=${fact.source}
       target="_blank">(Internet answer)</a>
  </p>
    <span class="tag" style="background-color: ${
      CATEGORIES.find((category) => category.name === fact.category).color
    }">${fact.category}</span>
  </li>`
  );
  // console.log(htmlArr);
  const html = htmlArr.join("");
  answersList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Add an answer";
  }
});

// console.log(calAge(2011));

// let votesInteresting = 10;
// let votesMindblowing = 10;

// if (votesInteresting === votesMindblowing) {
//   alert("equally interesting and mindblowing");
// }

// // arrow func
// const calAge2 = (year) =>
//   year <= new Date().getFullYear()
//     ? new Date().getFullYear() - year
//     : "impossible year";
// console.log(calAge2(2034));

// const fact = ["list_element1", 1, true];
// console.log(fact);
// console.log(fact[1]);
// console.log(fact.length);
// const [text, createdIn, isCorrect] = fact;
// console.log(text);
// const newFact = [...fact, "society"]; // spreading, 3 dots to unpack the fact array
// console.log(newFact);

/*
const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category ${this.category.toUpperCase()}.`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

const { category, isCorrect } = factObj;
console.log(category, isCorrect);

console.log(factObj.createSummary());

// [2, 4, 6, 8].forEach(function (el) {
//   console.log(el);
// });

const times50 = [2, 4, 6, 8].map((el) => el * 10);

console.log(times50);



const allCategories = CATEGORIES.map((obj) => obj.name);
console.log(allCategories);

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function calAge(year) {
  const curYear = new Date().getFullYear();
  const age = curYear - year;
  return age;
}

const factAges = initialFacts.map((el) => calAge(el.createdIn));
console.log(factAges);
console.log(factAges.join(" & "));
*/
