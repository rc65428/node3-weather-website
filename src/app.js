const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rodrigo Cortez'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Rodrigo Cortez'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help page',
        name: 'Rodrigo Cortez',
        message: 'This is all the help you need'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error: 'Please provide an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {return res.send({ error })}

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
   
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({products: []})
    
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'Help page',
        name: 'Rodrigo S. Cortez',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Rodrigo S. Cortez',
        errorMsg: 'Page not found'
    })
    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})