//Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var clients = [
    {
        name: "Adam",
        phoneNumber: 437567772,
        email: "adam@gmail.com",
        id: 1
    },

    {
        name: "Sophie",
        phoneNumber: 437987123,
        email: "sophie@gmail.com",
        id: 2
    },
    {
        name: "Sam",
        phoneNumber: 437233432,
        email: "sam@gmail.com",
        id: 3
    }
];

var waitingList = [];

//Initial page routing
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    console.log("hello");
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//To display the details of all the tables

app.get("/api/tables", function (req, res) {
    return res.json(clients);
});

//To display the details of all waitlist tables

app.get("/api/waitlist", function (req, res) {
    return res.json(waitingList);
});
// To post the table details when a reservation is made

app.post("/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    newReservation.Name = newReservation.name.replace(/\s+/g, "").toLowerCase();

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html


    if (clients.length < 6) {
        //newReservation.Name = newReservation.name.replace(/\s+/g, "").toLowerCase();

        console.log(newReservation);

        clients.push(newReservation);

        res.json(newReservation);
    } else {
        waitingList.push(newReservation);
    }
});

//To listen to the local port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
