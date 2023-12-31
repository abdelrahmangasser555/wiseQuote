import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [generated, setGenerated] = useState(false);
  const [aiQuote, setAiQuote] = useState("");
  useEffect(() => {
    let source = axios.CancelToken.source(); // Create a cancel token source

    axios
      .get("https://api.quotable.io/random", {
        cancelToken: source.token, // Pass the cancel token to the request
      })
      .then(function (response) {
        // handle success
        setQuote(response.data.content);
        setAuthor(response.data.author);
      })
      .catch(function (error) {
        // handle error
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });

    // Cleanup function
    return () => {
      source.cancel("Component unmounted"); // Cancel the request on unmount
    };
  }, [generated]);
  function generateAiWisdom() {
    axios.get("https://localhost:5000/ai").then((response) => {
      setAiQuote(response.data.author);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            color: "gold",
          }}
        >
          WISE QUOTE
        </h1>
      </header>
      <div className="my-body">
        <main className="real-main" onClick={() => setGenerated(!generated)}>
          <div
            id="quote"
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "times new roman",
            }}
          >
            <span
              style={{
                color: "blue",
                fontSize: "2%",
                fontWeight: "bold",
                fontFamily: "times new roman",
                textTransform: "uppercase",
              }}
            >
              quote :{" "}
            </span>{" "}
            {quote}
          </div>
          <br />
          <div
            id="author"
            style={{
              color: "gold",
              fontSize: "1.8em",
              fontWeight: "bold",
              fontFamily: "times new roman",
              textTransform: "uppercase",
              textAlign: "center",
              textDecoration: "underline overline",
              //creating and italic font
              fontStyle: "italic",
            }}
          >
            {author}
          </div>
          <br />
          {/* <button onClick={() => setGenerated(!generated)}>Generate</button> */}
        </main>
        <div className="ai-main">
          <div className="ai-body">
            <div className="ai-quote">
              <div className="ai-quote-text">{aiQuote} hello world</div>
            </div>
            <div className="ai-button">
              {/* <button onClick={() => setGenerated(!generated)}>Generate</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
