const express = require("express")
const path = require("path")
const routes = require('./routes')

const app = express()
const port=3000
// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'))
 
// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'static/css')))
app.use(express.static(path.join(__dirname, "static/js")))
app.use(express.static(path.join(__dirname, "static/img"))) 
app.use(express.static(path.join(__dirname, "node_modules"))) 

// Set the view engine to ejs
app.set('view engine', 'ejs')
 
app.use('/', routes)
app.listen(port, () => {
 console.log(`CSERVER Port:${port}`)
})
