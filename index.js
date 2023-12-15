const express = require('express')
const cors = require('cors')

require('./drivers/connect-db')

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(cors())

app.use('/band', require('./routes/band'))
app.use('/member', require('./routes/member'))

app.listen(app.get('PORT'), ()=>console.log(`Server listen at port ${app.get('PORT')}`))