import { useEffect, useState } from 'react';
import '../styles/Player.css';
import Loader from './Loader'

function Player() {
  const [loading, setLoading] = useState(true);
  const server = 'https://vidstream-server-o9cb.onrender.com';
  const [result, setResult] = useState({ src: '', splash: '', poster: '', title: '', year: '', desc: '' });
  const [activeServer, setActiveServer] = useState(1);

  useEffect(async () => {
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
    let urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('source');
    console.log(movieId)

    async function fetchSearch() {
      if (movieId !== '') {
        try {
          let movieLinkData = await fetch(`${server}/movie/stream/${encodeURIComponent(movieId)}?server=${activeServer}`, { method: "GET" });
          let movieLink = (await movieLinkData.json()).link;
          console.log(movieLink)

          let movieData = await (await fetch(`${server}/movie/details/${encodeURIComponent(movieId)}`, { method: "GET" })).json();
          console.log(movieData)
          // console.log(movieObj)
          setResult({ src: movieLink, splash: movieData.backdrop, poster: movieData.poster, title: movieData.title, year: movieData.year, desc: movieData.description });
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        setResult({ src: '', splash: '', poster: '', title: '', year: '', desc: '' });
        window.location.href = '/';
      }
    }
    fetchSearch();
  }, [activeServer]);

  return (
    (loading) ?
      <Loader />
      :
      <>
        <div className="page-container">
          <div className="splash" style={{ background: `linear-gradient(transparent, black), url(${result.splash}) no-repeat` }}></div>
          <div className="media-block">
            <iframe title="MoviePlayer" className="player-window" src={result.src} frameborder="0" sandbox> </iframe>
            <div className='server-selector'>
              <div className='server-button' onClick={() => setActiveServer(1)}>Server 1</div>
              <div className='server-button' onClick={() => setActiveServer(2)}>Server 2</div>
            </div>
            <div className="info-container">
              <img className="poster" alt="Movie Poster" src={result.poster} />
              <div className="media-info">
                <div className="media-title">{result.title}</div>
                <div className="media-year">{result.year}</div>
                <div className="media-desc">{result.desc}</div>
              </div>
            </div>
          </div>
        </div >
      </>
  );
}

export default Player;
