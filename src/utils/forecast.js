const request = require('request')
// const forecast = (latitude, longitude, callback) => {
//     //chennai coordinates
//     // const url = 'http://api.weatherstack.com/current?access_key=e5cba3ee2df000062d365f6ef745d23e&query=13.09,80.27&units=f'
    
//     const url = 'http://api.weatherstack.com/current?access_key=e5cba3ee2df000062d365f6ef745d23e&query=' + latitude + ',' + longitude + '&units=f'

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location !', undefined)
//         } else {
//             const str = response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' fahrenheit out. It feels like ' + response.body.current.feelslike + ' fahrenheit out'
//             callback(undefined, str);

//             // callback(undefined, console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' fahrenheit out. It feels like ' + response.body.current.feelslike + ' fahrenheit out.'))
//         }
//     })
// }

// Destructuring and shorthand
const forecast = (latitude, longitude, callback) => {
    //chennai coordinates
    // const url = 'http://api.weatherstack.com/current?access_key=e5cba3ee2df000062d365f6ef745d23e&query=13.09,80.27&units=f'
    
    const url = 'http://api.weatherstack.com/current?access_key=e5cba3ee2df000062d365f6ef745d23e&query=' + latitude + ',' + longitude + '&units=f'
// url shorthand and destructuring response.body
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location !', undefined)
        } else {
            // callback(undefined, console.log(body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' fahrenheit out. It feels like ' + body.current.feelslike + ' fahrenheit out.'))
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' fahrenheit out. It feels like ' + body.current.feelslike + ' fahrenheit out.')
        }
    })
}
module.exports = forecast