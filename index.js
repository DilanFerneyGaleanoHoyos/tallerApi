
//index.jso
 express = require('express');
const cors = require('cors');

require('./drivers/connect-db');

const app = express();

app.set('PORT', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());

app.use('/doghouses', require('./routes/doghouses'));
app.use('/dogs', require('./routes/dogs'));

app.listen(app.get('PORT'), () => console.log(`Server listen at port ${app.get('PORT')}`));