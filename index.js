const express = require("express");
const app = express();

app.get("/food", (req, res) => {
   if(req.query.size === 0){

   }
});




app.listen(3000, () => {
    console.log("585 API initialized")
})