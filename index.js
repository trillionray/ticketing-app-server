const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");


const app = express();

app.use(express.json());

// const corsOptions = {
//     origin: ['http://localhost:5173'],
//     credentials: true,
//     optionsSuccessStatus: 200 
// };

app.use(cors());

// app.use(session({
//     secret: process.env.clientSecret,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use("/users", userRoutes);
app.use("/tickets", ticketRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
    });
}

module.exports = { app, mongoose };
