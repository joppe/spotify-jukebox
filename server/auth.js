let https = require('https');

/**
 * POST https://accounts.spotify.com/api/token
 *
 * header
 * Authorization: client_id:client_secret
 *
 * body
 * grant_type=client_credentials
 *
 * Example
 * curl -H "Authorization: Basic ZjM4ZjAw...WY0MzE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token
 */
exports.authorize = (clientId, clientSecret) => {
    return new Promise((resolve, reject) => {
        let postData = 'grant_type=client_credentials';
        let requestOptions = {
            host: 'accounts.spotify.com',
            path: '/api/token',
            method: 'POST',
            auth: clientId + ':' + clientSecret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        let request = https.request(requestOptions, (response) => {
            let buffer = [];

            response.on('data', (chunk) => {
                buffer.push(chunk);
            });

            response.on('end', () => {
                let data = JSON.parse(Buffer.concat(buffer).toString());

                if (undefined !== data.error) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });

        request.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        request.write(postData);
        request.end();
    });
};

exports.request = (path, accessToken) => {
    return new Promise((resolve, reject) => {
        let request = https.request({
            host: 'api.spotify.com',
            path,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }, (response) => {
            let buffer = [];

            response.on('data', (chunk) => {
                buffer.push(chunk);
            });

            response.on('end', () => {
                let data = JSON.parse(Buffer.concat(buffer).toString());

                if (undefined !== data.error) {
                    reject(data);
                } else {
                    resolve(data);
                }
            });
        });

        request.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        request.end();
    });
};


// expired token response
//{ error: { status: 401, message: 'The access token expired' } }
