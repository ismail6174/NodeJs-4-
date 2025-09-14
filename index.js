import express from "express";
import mongoose from "mongoose";
import { userModal } from "./model/userSchema.js";
import bcrypt from "bcryptjs";


const app = express();

app.use(express.json()) //middleware

// mongodb connecting start:
const MongoDB_URI = "mongodb+srv://ismailshah:61746174@cluster0.wgdrzzf.mongodb.net/"

mongoose.connect(MongoDB_URI).then(()=>{
    console.log("mongodb connected successfully");
    
}).catch((err)=>{
    console.log(err);
    
})
// mongodb connecting end:




// app.get("/api/getusers",async (req,res)=>{
//     const getData = await userModal.find();
    
//     res.json({
//         message:"get data from mdb successfully",
//         getData,
//     })
//     res.send("user get successfully")
// })

// creating data and send into mdb:
// app.post("/api/createusers", async (req, res) => {
//     const { name, email, password } = req.body;

//     // Check for required fields
//     if (!name || !email || !password) {
//         return res.json({
//             message: "Required fields are missing!",
//             status: false
//         });
//     }

//     try {
//         const userObj = { name, email, password };

//         // Save user to MongoDB
//         const sendData = await userModal.create(userObj);

//         return res.json({
//             message: "User created successfully",
//             data: sendData,
//             status: true
//         });
//     } catch (error) {
//         console.log("Error creating user:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             status: false
//         });
//     }
// });



// user signup 
app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
        return res.json({
            message: "Required fields are missing!",
            status: false
        });
    }

const encryptPass = await bcrypt.hash(password,10)

        const userObj2 = { name, email, password:encryptPass };
        const saveData = userModal.create(userObj2)

       return res.json({
            message:"signup user successfully",
            data:saveData,
            status:true
        })

    } catch (error) {
        console.log(err);
           return res.status(500).json({
            message: "Internal server error",
            status: false
        });
        
    }
    



   }); 
      


app.put("/api/putusers",(req,res)=>{
    
    res.send("user updated successfully")
})




app.listen(8000,(req,res)=>console.log("server created successfully"));
