if (!window.location.search) {
    window.location.href = "/index.html";
}

let server = 'http://localhost:5000';
let dom = (i) => {
    return document.getElementById(i);
}

let urlParams = new URLSearchParams(window.location.search);
let source = urlParams.get('source');

let loadStream = async (src) => {
    if (src) {
        let movieData = await fetch(`${server}/movie/${src}`, { method: "GET" });
        let movieObj = await movieData.json();
        dom('player_window').src = movieObj.link;
    }
}

if (source) {
    loadStream(source);
}
