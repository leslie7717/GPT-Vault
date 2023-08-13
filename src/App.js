import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

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

function App() {
  // 1. define state variable
  const [showForm, setShowForm] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getAnswers() {
        setIsLoading(true);

        let query = supabase.from("answers").select("*");
        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: answers, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);
        console.log(error);
        if (!error) {
          setAnswers(answers);
        } else {
          alert(`There was an error: ${error.message}`);
        }
        setIsLoading(false);
        console.log(answers);
      }
      getAnswers();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* 2. use state variable */}
      {showForm ? (
        <NewAnswerForm setAnswers={setAnswers} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <AnswerList answers={answers} setAnswers={setAnswers} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "GPT Vault";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="GPT Vault Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        // 3. update state varibale
        onClick={() => {
          setShowForm((showForm) => !showForm);
        }}
      >
        {showForm ? "Close" : "Add an answer"}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: "C++", color: "#3b82f6" },
  { name: "Java", color: "#16a34a" },
  { name: "Python", color: "#ef4444" },
  { name: "General", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewAnswerForm({ setAnswers, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if the data is valid. If so, create a new answer.
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new answer object
      // const newAnswer = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload answer to supabase and receive the new answer object
      setIsUploading(true);
      const { data: newAnswer, error } = await supabase
        .from("answers")
        .insert([{ text, source, category }])
        .select();
      console.log(newAnswer);
      setIsUploading(false);

      // 4. Add the new answer to the UI: add the answer to state
      if (!error) {
        setAnswers((answers) => [...newAnswer, ...answers]);
      } else {
        alert(`There was an error: ${error.message}`);
      }
      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");
      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Paste an answer generated by ChatGPT..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Internet source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul className="categories">
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function AnswerList({ answers, setAnswers }) {
  if (answers.length === 0) {
    return (
      <p className="message">
        No answers for this category yet! Create the first one 🤔
      </p>
    );
  }
  return (
    <section>
      <ul className="answers-list">
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} setAnswers={setAnswers} />
        ))}
      </ul>
      <p>There are {answers.length} answers in the database. Add your own!</p>
    </section>
  );
}

function Answer({ answer, setAnswers }) {
  const isDisputed =
    answer.votesInteresting + answer.votesMindblowing < answer.votesFalse;
  const [isReadMore, setIsReadMore] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  async function handleVote(columnName) {
    setIsUpdating(true);
    // update row in supabase
    const { data: updatedAnswer, error } = await supabase
      .from("answers")
      .update({ [columnName]: answer[columnName] + 1 })
      .eq("id", answer.id)
      .select();
    console.log(updatedAnswer);
    setIsUpdating(false);
    // update row in website
    if (!error) {
      setAnswers((answers) =>
        answers.map((a) => (a.id === answer.id ? updatedAnswer[0] : a))
      );
    }
  }

  return (
    <li className="answer">
      <div>
        {isDisputed ? <span className="disputed">[⛔️DISPUTED]</span> : null}
        <div className="answer-text">
          {isReadMore ? answer.text.slice(0, 167) : answer.text}
          {answer.text.length > 167 && (
            <span onClick={toggleReadMore} className="read-or-hide">
              {isReadMore ? "...read more" : " show less"}
            </span>
          )}
        </div>
        <a
          className="source"
          href={answer.source}
          target="_blank"
          style={isDisputed ? { color: "#fff" } : null}
        >
          (Internet answer)
        </a>
      </div>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (cat) => cat.name === answer.category
          ).color,
        }}
      >
        {answer.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {answer.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {answer.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {answer.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
