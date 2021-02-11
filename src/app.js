const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename) 

// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//console.log(publicDirectoryPath)
//const viewsPath = path.join(__dirname, '../templates')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //res.render('index') 
    res.render('index', {
        title: 'Weather',
        name: 'Chennai'        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dwaraknath'       
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Benchmark'
    })
})
// app.com
// app.com/help
// app.com/about

// app.get('', (req, res) => {
//     //res.send('Hello Benchmark')
//     res.send('<h1> Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     //res.send('Help Page')
//     res.send( [{
//         name: 'Dwarak',
//         age: 52
//     }, {
//         name: 'Benchmark',
//         age: 21
//     }])
// })

// app.get('/about', (req, res) => {
//     //res.send('About Benchmark')  
//     res.send('<h1>About Benchmark</h1>')   
// })

app.get('/weather', (req, res) => {
    //res.send('Your Weather')
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({ error}) 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})   
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address       
        })
    })

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Chennai',
    //     address: req.query.address 
    // })
})
})

app.get('/products', (req, res) => {
    // console.log(req.query)
    // console.log(req.query.search)
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    // res.send({
    //     products: []
    // })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Benchmark',
        errorMessage: 'Help article not found'
    })
} )


app.get('*', (req,res) => {
    //res.send('My 404 Page')
    res.render('404', {
        title: '404',
        name: 'Dwaraknath',
        errorMessage: 'Page not found'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})