const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors')
// require('dotenv')
const app = express();
app.use(cors())


//>>>>>>>>>>>>>>>>>>>>Middlewares<<<<<<<<<<<<<<<<<//

app.use(express.urlencoded(extended = true))
app.use(express.json());

// ====================== DATABASE CONNECTION CODE ======================

// CONNECTION URI || DATABASE URI  || CONNECTION STRING

mongoose.connect('mongodb+srv://dbUser1:ali0347@cluster0.562465z.mongodb.net/dbUser1')

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
})
db.once("connected", () => {
    console.log("DataBase Connected")
})
// ====================== DATABASE CONNECTION END ======================

// ====================== DB SCHEMA START======================

const userSchema = new mongoose.Schema({
    username: { type: String, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, }
});

// ====================== DB SCHEMA END======================

// ====================== DB MODEL START======================

const userModel = new mongoose.model("Collection_sheet1", userSchema)

// ====================== DB MODEL END======================


// ====================== ROUTES START ======================



// **************   CRUDE  OPERATION  ************ //

//  DB CREATE 

app.get("/", (req, res) => {
    res.send("This Is Professional Server By Express")

})


app.post("/login", async (req, res) => {

    // await userModel.create({
    //     name:req.body.name,
    //     age:req.body.age
    // })

    //                              OR
    console.log(req.body)
    const user = await userModel.findOne({
        email: req.body.email
    })

    if (user) {

        if (user.password === req.body.password) {
            // try {
                res.status(200).json({"userData":user, "msg":"User Signed in Successfully"});
            // } catch {
            //     res.status(400).json({ msg: "Error Occured", logs: error.message });
            // }
        }
        else {
            res.status(409).json({ msg: "Incorrect Password " });
        }
    } else {
        res.status(404).json({ msg: "User is Not Found" });

    }
    console.log(user)
    res.status(200).json(req.body);


})


app.post("/signUp", async (req, res) => {

    // await userModel.create({
    //     name:req.body.name,
    //     age:req.body.age
    // })

    //                              OR

    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const output = await user.save();
        res.status(200).json(output)

    } catch (error) {

        res.status(400).json({ msg: "Error Occured", logs: error.message });

    }

    //

    console.log(user)
    res.status(200).json(req.body);


})

// DB READ


// ====================== ROUTES END ======================




app.listen(process.env.PORT || 5000,
    () => {
        console.log("Server Started")
    })
