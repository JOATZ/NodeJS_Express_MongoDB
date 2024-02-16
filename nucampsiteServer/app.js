var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const promotionRouter = require('./routes/promotionRouter')
const partnerRouter = require('./routes/partnerRouter')
const campsiteRouter = require('./routes/campsiteRouter')

const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/nucampsite'
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

connect.then(
    () => console.log('Connected correctly to server'),
    (err) => console.log(err)
)

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use(cookieParser('12345-67890-09876-54321'))

app.use(
    session({
        name: 'session-id',
        secret: '12345-67890-09876-543221',
        saveUninitialized: false,
        resave: false,
        store: new FileStore()
    })
)

function auth(req, res, next) {
    if (!req.session.user) {
        const err = new Error('You are not authenticated!')

        err.status = 401
        return next(err)
    } else {
        if (req.session.user === 'authenticated') {
            return next()
        } else {
            const err = new Error('You are not authenticated!')
            err.status = 401
            return next(err)
        }
    }
}
//these need ot be before auth since we have login setup
app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(auth)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/campsites', campsiteRouter)
app.use('/promotions', promotionRouter)
app.use('/partners', partnerRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
