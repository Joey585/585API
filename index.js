const express = require("express");
const app = express();
const mysql = require("mysql");
const {displayFoodPicture} = require("./utils/displayFoodPicture")
const {getDoxInfo} = require("./utils/getDoxInfo");
const multer  = require('multer');
const {makeid} = require("./utils/genId");
const os = require("os");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "585API"
});

app.use(express.static(__dirname))
app.use(express.static("./food-pics"))
app.use(express.static("./uploads"));


app.get("/food/random", (req, res) => {
    con.query("SELECT * FROM foodpics ORDER BY RAND() LIMIT 1", (err, result) => {
        if(err) throw err;
        console.log(result[0].views++);
        con.query(`UPDATE \`foodpics\` SET \`views\`='${result[0].views++}' WHERE \`ID\` = ${result[0].ID}`, (err, resultMain) => {if (err) throw err;})
        // res.json({title: result[0].title, location: `${req.get("host")}/${result[0].location}`});
        const foodData = {
            title: result[0].title,
            location: `${req.protocol}://${req.get("host")}/${result[0].location}`,
            views: result[0].views
        }
        res.send(displayFoodPicture(foodData));
    });
});

app.get("/dox", async (req, res) => {
    if(!req.query.id) { return res.status(400)}

    const data = await getDoxInfo(req.query.id);
    res.send(data)
});

const pictureUpload = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb){
        const id = makeid(6)
        cb(null, id + ".png")
    }
});

const upload = multer({storage: pictureUpload})


app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file)
    res.json({data: "//" + req.headers.host + "/uploads/" + req.file.filename})
});




app.listen(3000, () => {
    console.log("585 API initialized")
})
