// creating a function for easy coding
const $ = id => document.getElementById(id);


// onclick function for search bar
function doingOnSearch() {
  $('search-btn').addEventListener('click', () => {
    const searchValue = $('search-box').value;
    $('fancy').innerHTML = '';
    $('search-box').value = '';
    if (searchValue === '') {
      return;
    }
    apiCall(searchValue);
  })
}

doingOnSearch();



// call api
function apiCall(value) {
  const link = `https://api.lyrics.ovh/suggest/${value}`
  fetch(link)
    .then(response => response.json())
    .then(json => {
      const data = json.data;
      for (let i = 0; i < 10; i++) {
        const singleData = data[i];
        
        const songName = singleData.title;
        const artistName = singleData.artist.name;
        const id = singleData.id;
        makeList(songName, artistName, id);
      }
    });
}

// making a lyrics list
function makeList(songName, artistName, id) {
  const parentNode = $('fancy');

  const lyrics = `<div class="single-result row align-items-center my-3 p-3">
                          <div class="col-md-9">
                              <h3 class="lyrics-name">${songName}</h3>
                              <p class="author lead">Album by <span>${artistName}</span></p>
                          </div>
                          <div class="col-md-3 text-md-right text-center">
                              <button class="btn btn-success" onClick="getLyrics('${artistName}', '${songName}', '${id}')">Get Lyrics</button>
                              
                          </div>
                          <div id="${id}" class="single-lyrics mx-auto text-center">
                          </div>
                          
                        </div>`;
  const singleLyrics = document.createElement('div');
  singleLyrics.innerHTML = lyrics;
  parentNode.appendChild(singleLyrics);
}



// search for lyrics and show 
function getLyrics(artistName, songName, id) {
  const link = `https://api.lyrics.ovh/v1/${artistName}/${songName}`;
  fetch(link)
    .then(response => response.json())
    .then(data => {
      const parentNode = $(id);

      if (data.lyrics === undefined) {
        parentNode.innerHTML = `
                <h2 class="text-warning mb-4">Sorry, lyrics is not found</h2>
                
                <div class="single-lyrics text-center">
                  <button class="btn go-back bg-success" onClick="hideLyrics('${id}')">&lsaquo; Hide</button>
                </div>
                `
      } else {  
        parentNode.innerHTML = `
                <h2 class="text-success mb-4">${songName} - ${artistName}</h2>
                <pre class="lyric text-white">${data.lyrics}</pre>
                <div class="single-lyrics text-center">
                  <button class="btn go-back bg-success" onClick="hideLyrics('${id}')">&lsaquo; Hide</button>
                </div>
                `
      }
    });
}


// hide lyrics
function hideLyrics(id) {
  const parentNode = $(id);
  parentNode.innerHTML = '';
}