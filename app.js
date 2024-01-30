const express = require('express')
const app = express()
const session = require('express-session')
const hashedSecret = require('./crypto/config')
const route = require('./routes/users')

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(
    session({
        secret: hashedSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)

app.use('/', route)

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto htto://localhost:3000')
})

