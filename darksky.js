const fs = require('fs')
const request = require ('request')

const darksky = (lat, lng) => {

    return new Promise ((resolve, reject) => {
        const APIKey = fs.readFileSync ('./darksky.apikey')

        request ({
            url: {
                protocol: 'https:',
                hostname: 'api.darksky.net',
                port: 443,
                pathname: '/forecast/' + APIKey + '/' + lat + ',' + lng,
                search: '?units=si'
            },
            method: 'GET',
            json: true,
        }, (err, resp, body) => {
            if (err)
                reject (`Error: Couldn\'t connect to Dark Sky. ${err.message}`)
            else if (resp.statusCode != 200) 
                reject (`Error: HTTP Error ${resp.statusMessage}`)
            else if (body.code) 
                reject (`Error: "${body.error}"`)
            else resolve ({
                temp: body.currently.temperature,
                now: body.currently.summary,
                today: body.hourly.summary,
                week: body.daily.summary
            })
        })    
    })
}

module.exports = { darksky }