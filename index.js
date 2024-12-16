import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

import userLoader from './server/http_methods/user_http_methods.js'
import postLoader from './server/http_methods/post_http_methods.js'

const app = express()
dotenv.config()

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '5mb' }))

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}))

app.use(userLoader)
app.use(postLoader)

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
    console.log('http://localhost:' + app.get('port'))
})