debugger;
// Put your Last.fm API key here
var api_key = "f177201d4cec5089812fc1da980a777b";

function sendRequest () {

    var artist_info_req = new XMLHttpRequest();
    var artist_info_method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    artist_info_req.open("GET", `proxy.php?method=${artist_info_method}&artist=${artist}&api_key=${api_key}&format=json`, true);
    artist_info_req.setRequestHeader("Accept","application/json");
    artist_info_req.onreadystatechange = function () {
        if (this.readyState == 4) {
            let json = JSON.parse(this.responseText);
            var artist_info = `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${json.artist.name}</h4>
                <h6 class="card-subtitle mb-2 text-muted"><a href="${json.artist.url}" target="__blank">${json.artist.url}</a></h6>
                <p class="card-text">${json.artist.bio.summary}</p>
                </div>
            </div>`;
            document.getElementById("artist_block").innerHTML = artist_info;
        }
    };
    artist_info_req.send(null);

    var artist_album_req = new XMLHttpRequest();
    var artist_album_method = "artist.getTopAlbums";
    var artist = encodeURI(document.getElementById("form-input").value);
    artist_album_req.open("GET", `proxy.php?method=${artist_album_method}&artist=${artist}&api_key=${api_key}&format=json`, true);
    artist_album_req.setRequestHeader("Accept","application/json");
    artist_album_req.onreadystatechange = function () {
        if (this.readyState == 4) {
            let json = JSON.parse(this.responseText);
            console.log(json);

            var artist_albums = '';

            json.topalbums.album.forEach(album => {
                artist_albums += `<div class="card mb-3" style="width: 20rem;">
                <img src="${album.image[3]['#text']}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${album.name}</h5>
                </div>
              </div>`;
            })

            
            document.getElementById("artist_albums").innerHTML = artist_albums;
        }
    };
    artist_album_req.send(null);

    var artist_similar_req = new XMLHttpRequest();
    var artist_similar_method = "artist.getSimilar";
    var artist = encodeURI(document.getElementById("form-input").value);
    artist_similar_req.open("GET", `proxy.php?method=${artist_similar_method}&artist=${artist}&api_key=${api_key}&format=json`, true);
    artist_similar_req.setRequestHeader("Accept","application/json");
    artist_similar_req.onreadystatechange = function () {
        if (this.readyState == 4) {
            let json = JSON.parse(this.responseText);
            console.log(json);

            var artist_similar = '';

            json.similarartists.artist.forEach(artist => {
                artist_similar += `<li class="list-group-item">
                <a href="${artist.url}" target="__blank">${artist.name}</a>
                </li>`;
            })

            var similar_data = `
            <ul class="list-group">
            <li class="list-group-item active" aria-current="true">Similar Artists</li>
            ${artist_similar}
            </ul>`

            
            document.getElementById("artist_similar").innerHTML = similar_data;
        }
    };
    artist_similar_req.send(null);
}
