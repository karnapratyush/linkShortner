const express=require('express');
const app=express();
const {conversionRouter}=require('./routes/convert')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.send("LINK SHORTNER")
})

app.use('/api/',conversionRouter)

app.listen('4444',()=>{
    console.log('http://localhost:4444')
})

