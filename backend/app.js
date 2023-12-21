// import express module
const express = require("express");

// import body parser
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import jsonwebtoken module
const jwt = require("jsonwebtoken");

// import express-session module
const session = require("express-session");

// import path and multer
const path = require('path');
const multer = require('multer');

// import axios module
const axios = require("axios");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');

// creer une app BE named app
const app = express();

// configurer body-parser pour structurer la reponse du BE sous format Json
app.use(bodyParser.json());

//  configurer body-parser pour parser le req reçu du FE (acceder au contenu)
app.use(bodyParser.urlencoded({ extended: true }));

//security config
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    next();
})



app.use('/images', express.static(path.join('backend/images')));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};


const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        // let error = new Error("Mime type is invalid");
        // if (isValid) {
        //     error = null;
        // }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

const secretKey = "croco-souhail-23-cun";

app.use(session({
    secret: secretKey,
}));

// import models
const Match = require('./models/match');
const User = require('./models/user');
const Team = require('./models/team');
const Player = require('./models/player');



// simuler database
let allMatches = [
    { id: 1, teamOne: "FCB", teamTwo: "RMD", scoreOne: "1", scoreTwo: "2" },
    { id: 2, teamOne: "JUV", teamTwo: "RMD", scoreOne: "0", scoreTwo: "1" },
    { id: 3, teamOne: "FCB", teamTwo: "MCU", scoreOne: "2", scoreTwo: "2" },
    { id: 4, teamOne: "RMD", teamTwo: "MCU", scoreOne: "0", scoreTwo: "0" },
]
let allPlayers = [
    { id: 1, playerName: "Cristiano", number: "10", position: "attk", age: "37" },
    { id: 2, playerName: "Messi", number: "9", position: "attk", age: "36" },
    { id: 3, playerName: "Romolu", number: "8", position: "attk", age: "39" },
]
let allUsers = [
    { id: 1, firstName: "amira", lastName: "mahdi", tel: "46943997", email: "mehdi.amira95@gmail.com", password: 123456 },
    { id: 2, firstName: "amine", lastName: "mahdi", tel: "23301193", email: "mehdi@gmail.com", password: 123456 },

]


// business logic 

// business logic to addUser
app.post("/weather", (req, res) => {
    console.log("here into weather", req.body);
    let weather;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.weatherSearch}&appid=8c7537ddb9dd086dea797c2fe937cf22`).then(
        (apiRes) => {
            console.log("Here is APIRes", apiRes.data)
            let weather={
                temperature: apiRes.data.main.temp,
                humidity: apiRes.data.main.humidity,
                pressure: apiRes.data.main.pressure,
                speed: apiRes.data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${apiRes.data.weather[0].icon}@2x.png` ,
            }
            res.json({
                city: req.body,
                weatherData: weather
            });
        }

    )
    
})

app.post("/users/signup", multer({ storage: storage }).single("img"), (req, res) => {
    console.log("Here signup BL", req.body);
    bcrypt.hash(req.body.password, 10).then(
        (cryptedPwd) => {
            console.log("Here crypted pwd", cryptedPwd);
            req.body.password = cryptedPwd;
            req.body.avatar = `http://localhost:3000/images/${req.file.filename}`;
            let user = new User(req.body);
            console.log("Here user obj", user);
            user.save();
            res.json({
                msg: "User added with success"
            });
        });
});

// business logic to login
app.post("/users/login", (req, res) => {
    console.log("Here into login BL", req.body);
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            if (!doc) {
                return res.json({
                    msg: "email not found"
                })
            }
            bcrypt.compare(req.body.password, doc.password).then(
                (compareResult) => {
                    if (!compareResult) {
                        return res.json({
                            msg: "False"
                        })
                    }
                    let userToSend = {
                        fName: doc.firstName,
                        lName: doc.lastName,
                        id: doc._id,
                        role: doc.role
                    }
                    const token = jwt.sign(userToSend, secretKey, {
                        expiresIn:
                            '1h'
                    })
                    res.json({
                        token: token,
                        msg: "User found"
                    })
                }
            )
        }
    )
});

app.get("/users/:id", (req, res) => {
    console.log("Here into BL:getUserById");
    let userId = req.params.id;
    User.findById(userId).then(
        (doc) => (
            console.log("here userFound", doc),
            res.json({
                userFound: doc
            })
        ))
})

// business logic to search match by score
app.post("/matches/searchScore", (req, res) => {
    let score = req.body;
    console.log(score);
    let searchedMatches = [];
    for (let i = 0; i < allMatches.length; i++) {
        if (allMatches[i].scoreOne == score.searchScore ||
            allMatches[i].scoreTwo == score.searchScore) {
            searchedMatches.push(allMatches[i]);
        }
    }
    console.log(searchedMatches);
    if (searchedMatches.length == 0) {
        res.json({
            msg: false,
        })

    } else {
        res.json({
            msg: true,
            matches: searchedMatches,
        })

    }

})

// business logic to get allMatches

app.get("/matches", (req, res) => {
    // uniquement le path
    console.log("Here into BL: getAllMatches");
    Match.find().then(
        (docs) => (
            res.json({
                T: docs
            })
        )
    );

})
// business logic to get match by id
app.get("/matches/:id", (req, res) => {
    console.log("Here into BL:getMatchById");
    let matchId = req.params.id;
    Match.findById(matchId).then(
        (doc) => (
            console.log("here matchFound", doc),
            res.json({
                matchFound: doc
            })
        ))
})
// business logic to delete match by id
app.delete("/matches/:id", (req, res) => {
    let matchId = req.params.id;
    Match.deleteOne({ _id: matchId }).then(
        (deleteResponse) => {
            console.log("Here delete response", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "echec"
                })
            }
        }

    )
}
)

// business logic to add match
app.post("/matches", (req, res) => {
    console.log("Here into addMatch", req.body);
    let match = new Match(req.body);
    match.save();
    // allMatches.push(match); ma3adech nest7a9ouh fel base de données
    res.json({
        msg: "match added with success",
    })
}
)

// business logic to edit match
app.put("/matches", (req, res) => {
    console.log("Here into BL: matchEdit");
    let match = req.body;
    Match.updateOne({ _id: req.body._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "error"
                })
            }
        }
    )


}
)


// business logic to get allPlayers

app.get("/players", (req, res) => {
    console.log("Here into BL : getAllPlayers");
    Player.find().then(
        (docs) => (
            res.json({
                T: docs,

            })
        )
    )

})

// business logic to get player by id
app.get("/players/:id", (req, res) => {
    console.log("Here into BL:getPlayerById");
    let playerId = req.params.id;
    Player.findById(playerId).then(
        (doc) => (
            console.log("here playerFound", doc),
            res.json({
                playerFound: doc
            })
        ))

})
// business logic to delete player by id
app.delete("/players/:id", (req, res) => {
    let playerId = req.params.id;
    Player.deleteOne({ _id: playerId }).then(
        (deleteResponse) => {
            console.log("Here delete response", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "echec"
                })
            }
        }

    )
}
)
// business logic to add player
app.post("/players", (req, res) => {
    console.log("Here into BL: addPlayer", req.body);
    Team.findById(req.body.tId).then(
        (team) => {
            if (!team) {
                return res.json({
                    msg: "Team Not Found"
                })
            }
            let player = new Player({
                playerName: req.body.playerName,
                number: req.body.number,
                age: req.body.age,
                position: req.body.position,
                team: team._id
            });
            player.save((err, doc) => {
                if (err) {
                    res.json({ msg: "Error" });
                } else {
                    team.players.push(doc);
                    team.save();
                    res.json({
                        msg: "Player added with success"
                    })
                }
            })
        }
    )

    // let player = new Player(req.body);
    // player.save();
    // res.json({
    //     msg: "player added with success",
    // })

}
);

//business logic to edit player
app.put("/players", (req, res) => {

    console.log("Here into BL: playerEdit");
    let player = req.body;
    Player.updateOne({ _id: player._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "error"
                })
            }
        }

    )
})
// BL for teams 

// business logic to get allTeams

app.get("/teams", (req, res) => {
    console.log("Here into BL : getAllTeams");
    Team.find().then(
        (docs) => (
            res.json({
                T: docs,

            })
        )
    )

})

// business logic to get  by id
app.get("/teams/:id", (req, res) => {
    console.log("Here into BL:getTeamById");
    let teamId = req.params.id;
    Team.findById(teamId).populate("players").then(
        (doc) => (
            console.log("here teamFound", doc),
            res.json({
                teamFound: doc
            })
        ))

})
// business logic to delete  by id
app.delete("/teams/:id", (req, res) => {
    let teamId = req.params.id;
    Team.deleteOne({ _id: teamId }).then(
        (deleteResponse) => {
            console.log("Here delete response", deleteResponse);
            if (deleteResponse.deletedCount == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "echec"
                })
            }
        }

    )
}
)
// business logic to add 
app.post("/teams", (req, res) => {
    console.log("Here into BL: addTeam", req.body)
    let team = new Team(req.body);
    team.save();
    res.json({
        msg: "Team added with success",
    })
}
)

//business logic to edit 
app.put("/teams", (req, res) => {

    console.log("Here into BL: teamEdit");
    let team = req.body;
    Team.updateOne({ _id: team._id }, req.body).then(
        (updateResponse) => {
            console.log("here update response", updateResponse);
            if (updateResponse.nModified == 1) {
                res.json({
                    msg: "success"
                })
            } else {
                res.json({
                    msg: "error"
                })
            }
        }

    )
})




// pour pouvoir importer l app (la rendre exportable)
module.exports = app;
