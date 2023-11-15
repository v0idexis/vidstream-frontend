import '../styles/Loader.css';
import loadingGif from '../assets/loading.gif';

function Loader() {
    return (<>
        <div className='loader'>
            <img alt="Loader" src={loadingGif} style={{ width: '200px' }} />
            <h3 style={{ maxWidth: '80vw', textAlign: 'center' }}>This project is hosted on a free server, waiting for the server to cold start. May take a few minutes</h3>
        </div>
    </>);
}

export default Loader;