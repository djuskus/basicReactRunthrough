import { response } from "express";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [strang, setStrang] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((responseJson) => {
        setStrang(responseJson);
      });
  }, [text]);

  const DeleteEm = () => {
    fetch("http://localhost:5000/delete");
    setText("");
  };

  const testApiCall = () => {
    fetch(
      "https://api.bittrex.com/v3/markets      ",
      {
        method: "GET",
        headers: {
          "Accept": "text/html, application/xhtml+xml, application/xml;q=0.9",
          "Access-Control-Allow-Origin": "https://api.bittrex.com/v3/markets"
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addOne = (text: String) => {
    fetch("http://localhost:5000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((responseJson) => {
        setStrang(responseJson);
      });
  };

  const strangList = (
    <ul>
      {strang.map((word) => {
        return <li>{word}</li>;
      })}
    </ul>
  );
  return (
    <div className="App">
      <h1>Focus & complete</h1>
      <form>
        <label>
          {" "}
          Enter text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      </form>
      <div>
        <button onClick={() => addOne(text)}>add text</button>
      </div>
      <div>
        <button onClick={DeleteEm}>Delete all</button>
      </div>

      <div>
        <button onClick={testApiCall}>TestaButton</button>
      </div>

      <div>
        <p>tHE strang be lookin like</p>
        {strangList}
      </div>
    </div>
  );
}

export default App;
