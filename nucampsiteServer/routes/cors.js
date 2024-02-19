const cors = require('cors')

const whitelist = ['http://localhost:3000', 'https://localhost:3443']

const corsOptionsDelegate = (req, callback) => {
    let corsOptions
    console.log(req.header('Origin'))
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

exports.cors = cors() //allow cors for all orgins
exports.corsWithOptions = cors(corsOptionsDelegate) //check incoming bleongs to whitelist, then apply this middleware to that endpoint
