const express = require('express');
const cors = require('cors');

const app = express();

var corOptions = {
  origin: 'https://localhost:8081',
};

//middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const router = require('./route/promotionRouter');
app.use('/events/promotion', router);

//port
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
