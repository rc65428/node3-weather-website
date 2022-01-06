const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7ddd146e065507e4206f61421bf78dc7&query=' + longitude + ',' + latitude
    request({
        url,
        json: true
       }, (error, {body}) => {
       
           if (error) {
               callback('Unable to connect to weather service.', undefined)
           }
           else if (body.error){
               callback('Unable to find location', undefined)
           }
           else {
               callback(undefined, body.current.weather_descriptions[0] +'. La temperatura actual es ' + body.current.temperature + 'º con una sensacion terminca de ' + body.current.feelslike + 'º')
           }       
   })
}

module.exports = forecast