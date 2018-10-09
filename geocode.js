const fs = require('fs')
const request = require ('request')

const geocode = (address) => {

    return new Promise ((resolve, reject) => {
        const addr = encodeURIComponent (address)
        const APIKey = fs.readFileSync ('./googlemaps.apikey')
    
        request ({
            url: {
                protocol: 'https:',
                hostname: 'maps.googleapis.com',
                port: 443,
                pathname: '/maps/api/geocode/json',
                search: '?key=' + APIKey + '&address=' + addr
            },
            method: 'GET',
            json: true,
        }, (err, resp, body) => {
            if (err) 
                reject (`Error: Couldn\'t connect to Google Maps. ${err.message}`)
            else if (resp.statusCode != 200) 
                reject (`Error: HTTP Error ${resp.statusMessage}`)
            else if (body.status != "OK") 
                reject (`Error: Google Maps couldn't locate "${address}"`)
            else resolve ({
                addr: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            })
        })    
    })
}

module.exports = { geocode }