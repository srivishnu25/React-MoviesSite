import React, { Component, PureComponent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [cards, updateCards] = useState([]);
  const [click, setClick] = useState(false);
  const [orginalData, setOrginalData] = useState([]);
  useEffect(() => {
    axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war").then((blog) => {
      setOrginalData(blog.data.Search);
      updateCards(blog.data.Search);
    });
  }, []);

  const clickFun = (a) => {
    setClick(a);
  };
  const onSearch = (ab) => {
    const updateValues = orginalData.filter((item) =>
      item.Title.toLowerCase().includes(ab)
    );
    console.log(updateValues);
    updateCards(updateValues);
  };

  return (
    <div>
      <h1>Movies</h1>
      <div id="searchDiv">
        <input
          type="text"
          id="searchBar"
          placeholder="serach movie name"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="card-wrapper">
        {cards.map(({ Title, Poster, Year, imdbID }) => (
          <div
            className={click === imdbID ? "card active" : "card"}
            onClick={() => clickFun(imdbID)}
          >
            <img src={Poster} alt="poster" />
            <div className="title">
              <h6>{Title}</h6>
            </div>
            <p>Year :{Year}</p>
            <p>imdb rating: {imdbID}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
