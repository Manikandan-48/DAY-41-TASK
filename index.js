const express=require('express');
const dotenv=require('dotenv');

const mongo=require('./connect')
const cors=require('cors')

const router=require('./router/router')

const port=process.env.PORT ||8000;

const app=express();
app.use(cors({origin:"*",credentials : true}))

dotenv.config();
mongo.connect();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to Assign Mentor API...🙏')
});


app.use('/api',router)

app.listen(port, ()=>{
    console.log(`The server is running in port: ${port}🎉🎉🎆🎆`)
})

