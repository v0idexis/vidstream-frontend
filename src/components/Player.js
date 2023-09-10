// import logo from './logo.svg';41
import { useEffect, useState } from 'react';
import '../styles/Home.css';
import logo from '../assets/clapperboard.png';

function Player() {
  const server = 'https://vidstream-server-o9cb.onrender.com';
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchSearch() {
      if (query !== '') {
        let movieData = await fetch(`${server}/search?q=${encodeURIComponent(query)}`, { method: "GET" });
        let movieObj = await movieData.json();
        setResults(movieObj.body);
      }
      else {
        setResults([]);
      }
    }
    fetchSearch();
  }, [query]);

  return (
    <div className="landing">
      <div className="logo_container">
        <img alt="vidstream_logo" className="logo" src={logo} />
        <p style={{ margin: "0px" }}>Vidstream</p>
      </div>
      <input type="text" placeholder="Search for a movie..." className="search-box" onChange={(event) => { setQuery(event.target.value) }} />
      {
        results.length > 0 &&
        <>
          <div className="search-results">
            {results.map((item) => {
              return (<>
                <div className="result" id={item.id}>
                  <img className="res-thumb" alt={item.title} src={item.poster} />
                  <div className="res-info">
                    <div className="res-title">{item.title}</div>
                    <div className="res-year">{item.year}</div>
                    <div className="res-desc">{item.overview}</div>
                  </div>
                </div>
                <div className="horizontal-divider"></div>
              </>)

            })}
          </div >
        </>
      }
    </div >
  );
}

export default Player;
