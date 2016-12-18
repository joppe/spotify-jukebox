let auth = require('./auth.js');

class Spotify {
    constructor(clientId, accessToken) {
        this.clientId = clientId;
        this.accessToken = accessToken;
    }

    playlists() {
        return auth.request(`/v1/users/${this.clientId}/playlists?limit=50`, this.accessToken);
    }
}

exports.Spotify = Spotify;
