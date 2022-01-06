const request = require('postman-request')
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmM2NTQyOCIsImEiOiJja3h3ZzlwZW02Yjk3Mm5tZm1pYzh3dGRmIn0.DoeerDFpYQ7B9pa7-FMsGQ&limit=1' //&country=AR'
    request({
        url,
        json: true
    }, (error, {body}) =>{
        if (error){
            callback('Unable to connect to location service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name})
        }
    })
}

module.exports = geocode