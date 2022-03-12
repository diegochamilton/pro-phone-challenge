import React, { useState } from "react";
import axios from "axios";
import styles from "./search.module.scss";
import Loading from "../Loading";
import { Link } from "react-router-dom";

import { apiKey } from "../../config";

const Search = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = (e, query) => {
    setError(null);
    setIsLoading(true);
    e.preventDefault();
    axios
      .get(`https://pixabay.com/api/?key=${apiKey}&q=${query}`)
      .then(({ data }) => {
        setData(data.hits);
        if (data.hits.length === 0) {
          setError("Sorry, we couldn't find any matches.");
        }
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((err) => {
        setError("Oops! Something went wrong, please try again.");
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => search(e, value)}>
        <input
          type="search"
          style={{ color: "black" }}
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </form>
      {isLoading ? (
        <Loading />
      ) : (
        <ResultsList data={data} error={error} value={value} />
      )}
    </div>
  );
};

const ResultsList = ({ data, error, value }) => {
  return (
    <div className={styles.resultsContainer}>
      {error && <span className={styles.error}>{error}</span>}
      {data.map((result, i) => {
        return (
          <Link to={`/images/${result.id}`} key={`i_${result.id}`}>
            <img
              src={result.webformatURL}
              className={styles.photo}
              alt={value}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Search;
