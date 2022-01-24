const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Wheater',
        'name': 'Hanif Nuryanto'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Hanif Nuryanto'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
    
        forecast(location, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }

            return res.send({
                forecast: forecastData,
                location, address
            })  
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'Hanif Nuryanto',
        'helpText': 'This is some helpful text.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': 'Not Found',
        'name': 'Hanif Nuryanto',
        'message': 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': 'Not Found',
        'name': 'Hanif Nuryanto',
        'message': 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})