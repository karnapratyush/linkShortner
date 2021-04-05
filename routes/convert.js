//  acurring router
const conversionRouter=require('express').Router()

// acurring the model of mongoDb  made
const {model}=require('../model/model')


// importing the link shortner function
const {genShortUrl}=require('../urlShort/shortner')
require('dotenv').config()


conversionRouter.post('/',async(req, res)=>{

    // getting the link in the body and checking it in the DB
    
    const link=await model.findOne({originalUrl:req.body.url})
   

    // if no such Original Url is found
    if (!link)
    {
        shortLink=genShortUrl(req.body.url)
        shortLink=process.env.APP_BASE_URL+shortLink
        let checkIfPresent=await model.findOne({newUrl:shortLink})

        // checking if the new url generated is already present. if yes keep on generating till we find the new one

        while(checkIfPresent)
        {
            shortLink=genShortUrl(req.body.url)
            shortLink=process.env.APP_BASE_URL+shortLink
            checkIfPresent=await model.findOne({newUrl:shortLink})

        }

        // creating data for storing in db
        
        const data=new model({
            originalUrl:req.body.url,
            newUrl:shortLink,
            count:0
        })
        // savinvg the data in db
        await data.save()
        res.send(shortLink)
    }
    else
    {res.send(link.newUrl)

    }

})


conversionRouter.get('/:newUrl',async(req, res)=>{
    console.log(req.params.newUrl);
    newlink=process.env.APP_BASE_URL+req.params.newUrl
     
    const data=await model.findOne({newUrl:newlink})
    // console.log(data)
    if (!data)
    {
        res.json({error:"couldnot Find the url"})
    }
    else
    {
        res.redirect(data.originalUrl)
        data.count++;
        await model.updateOne({newUrl:newlink},data,(err, res)=>{
            if (err)
            console.log("error in updation")
        })
    }
})


module.exports={conversionRouter}