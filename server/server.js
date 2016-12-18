const clientId = 'afecec421c5448409e5446fd8d7a6e7b';
const clientSecret = 'bbdf3a1bc7564dbfbb8b110704768160';

const bearer = {
    access_token: 'BQD1_xF_DVWuX98HPJDW0yzCmGS03zYYMGLGcq7CR2C0ygYdhVH6WUw8lE0DE7dSELRUffGZwnROKdw_Pi1JVg',
    token_type: 'Bearer',
    expires_in: 3600
};

let auth = require('./auth.js');
let Spotify = require('./Spotify.js').Spotify;
//
let spotify = new Spotify('j0pp3rt', bearer.access_token);

let playlists = spotify.playlists();
playlists.then((d) => {
    console.log(d);
});
playlists.catch((e) => {
    console.log(e);
});

/*/
auth
    .authorize(clientId, clientSecret)
    .then((bearer) => {
        // let spotify = new Spotify(clientId, bearer);
        console.log(bearer);
    })
    .catch((err) => {
        console.log(err);
    })
;
/**/