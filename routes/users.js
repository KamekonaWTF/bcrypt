const express = require('express')
const router = express.Router()
const {generateToken, verifyToken} = require('../middlewares/authMiddleware')
const users = require('../data/users')

router.get('/', (req, res) => {
    if(req.session.token) {
        res.send(`
            <h1>Bienvenido</h1>
            <a href="/dashboard">Dashboard</a>
            <form ation="/logout" method="post">
                <button type="submit">LogOut</button>
            </form>
        `)
    } else {
        res.send(`
        <form ation="/login" method="post">
            <label for="username">Username: </label>
            <input type="text" id="username name="username">

            <label for="password">Pasword: </label>
            <input type="password" id="password" name="password">
            <button type="submit">Entrar</button>
        </form> 
        <a href="/dashboard">Dashboard</a>
    `)
    }
    
})

router.get('/dashboard', (req, res) => {
    const userId = req.user
    const user = users.find(user => user.id === userId)
    if(user) {
       res.send(`
        <h1>Bienvenido ${user.name}</h1>
        <p>Username: ${user.username}</p>
        <p>UserId: ${user.id}</p>
        <form ation="/logout" method="post">
        <button type="submit">Logout</button>
        </form> 
       `) 
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    const user = users.find(user => user.username === username && user.password === password)

    if(user) {
        const token = generateToken(user)
        req.session.token = token
        res.redirect('/dashboard')
    } else {
        res.status(401).json({mensaje:"usuario o contraseña incorrectos"})
    }
})


router.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router