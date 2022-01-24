const request = require('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=0479f058cbf13683ce710260e0332cff&query='+encodeURIComponent(address)+'&units=m'

    request({url, json: true}, (error, {body: data}) => {
        // const data = JSON.parse(response.body)
        // console.log(data.current);
    
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else {
            const {weather_descriptions, temperature, feelslike, humidity} = data.current
            callback(undefined, `${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degress out. The humidity is ${humidity}%.`);
        }
    
    })
}

module.exports = forecast
