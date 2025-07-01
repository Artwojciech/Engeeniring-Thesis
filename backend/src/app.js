const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./utils/db');

require('./models/user');
require('./models/photo');
require('./models/category');
require('./models/favourite');
require('./models/relations');

const usersRoute = require('./routes/usersRoute');
const photosRoute = require('./routes/photosRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const favouritesRoute = require('./routes/favouritesRoute');
const authRoutes = require('./routes/authRoute');


const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//uploads zeby dzialaly sciezki z bazy
app.use('/uploads', express.static('uploads'));

//routes
// app.use('/api/users', usersRoute);
// app.use('/api/photos', photosRoute);
// app.use('/api/categories', categoriesRoute);
// app.use('/api/favourites', favouritesRoute);
// app.use('/api/auth', authRoutes);

//testowe
// app.get('/', (req, res) => {
//   res.send('Portfolio backend running...');
// });

//bledy
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({message: message}); 
});

//polaczenie z baza
db.sync()
    .then(res => {
        console.log("DB connected");
        app.listen(port);
        })
        .catch(err => 
            console.log(err));
    