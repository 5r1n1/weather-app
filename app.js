const yargs = require('yargs')
const geocode = require('./geocode')
const darksky = require('./darksky')

let addr1, lat1, lng1

const {address} = yargs
    .options ({
        address: {
            describe: 'Address to get weather for',
            alias: 'a',
            type: 'string',
            demandOption: true,
            requiresArg: true
        }
    })
    .help()
    .alias ('help', 'h')
    .argv

geocode.geocode (address)
    .then(({addr, lat, lng}) => {
        addr1 = addr; lat1 = lat; lng1 = lng
        return darksky.darksky (lat, lng)
    })
    .then(({temp, now, today, week}) => {
        console.log ('Address     : %s', addr1)
        console.log ('Latitude    : %f', lat1)
        console.log ('Longitude   : %f', lng1)
        console.log ('Temperature : %f\xB0C', temp)
        console.log ('Weather now : %s', now)
        console.log ('For Today   : %s', today)
        console.log ('This week   : %s', week)
    })
    .catch (err => console.log (err))