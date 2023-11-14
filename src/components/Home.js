import { useEffect, useState } from 'react';
import '../styles/Loader.css';
import '../styles/Home.css';
import logo from '../assets/clapperboard.png';
import moviePlaceholder from '../assets/movieplaceholder.png';
import loadingGif from '../assets/loading.gif';

function Home() {
  const [loading, setLoading] = useState(true);
  const server = 'https://vidstream-server-o9cb.onrender.com';
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      async function checkWake() {
        while (loading) {
          let wakeStatus = await (await fetch(`${server}/wake`, { method: "GET" })).json();
          if (wakeStatus.status === 'running') {
            setLoading(false);
            break;
          }
        }
      }
      checkWake();
    }
    catch (err) {
      console.log(err);
    }

  }, [])

  useEffect(() => {
    (async () => {
      if (query !== '') {
        let movieData = await fetch(`${server}/search?q=${encodeURIComponent(query)}`, { method: "GET" });
        let movieObj = await movieData.json();
        setResults(movieObj.body);
      }
      else {
        setTimeout(() => { setResults([]) }, 1000);
      }
    })();
  }, [query]);

  return (
    (loading) ?
      <>
        <div className='loader'>
          <img alt="Loader" src={loadingGif} style={{ width: '200px' }} />
          <h3 style={{ maxWidth: '80vw' }}>This project is hosted on a free server, waiting for the server to cold start. May take a few minutes</h3>
        </div>
      </> :
      <>
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
                    <div key={item.id} className="result" id={item.id} onClick={() => { window.open(`/player?source=${item.id}`) }}>
                      <img className="res-thumb" alt={item.title} src={!String(item.poster).includes('originalnull') ? item.poster : moviePlaceholder} />
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
      </>
  );
}

export default Home;
