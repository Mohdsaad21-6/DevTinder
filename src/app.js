const express=require('express');

const app=express();
// console.log(app);


app.use("/Home",(req,res)=>{
    res.send('Hello Worlds home')
});


app.use("/hello",(req,res)=>{
    res.send("Hello sello bye ")
    
})
app.use("/test",(req,res)=>{
    res.send("Hello from the server")
    
})

app.listen(7777,()=>{
    console.log("server is sucessfully listening");
    
})


// const express=require('express');

// const app=express();

// app.use((req,res)=>{
//     res.send("Hello from the server saad")
// })


// app.listen(4000,()=>{
//     console.log("From the server");
    
// })