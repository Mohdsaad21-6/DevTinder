const express = require("express");

const app = express();

app.use("/user",(req,res)=>{
    res.send("hahahhahah")
})

//This will match only GET call to /user

app.get("/user",(req,res)=>{
    res.send({firstname:"Mohd ",lastName:"Saad"});
})

app.post("/user",(req,res)=>{
    // console.log("Save dataa to the DB");
    //Saving data to DB
    res.send("Data successfully save to the DB")
    
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfuly")
})
//This will match all the http methods API call to/test

app.use("/test", (req, res) => {
  res.send("Hello from the server from test");
});

app.listen(7777, () => {
  console.log("server is sucessfully listening");
});
