function genShortUrl(word)
{
if (word.includes("www."))
{
    wordSplit=word.split('.')[1]
    

  

}

else {
    wordSplit=word.split('//')[1]
    wordSplit=wordSplit.split('.')[0]
}

if (wordSplit.length>4)
    {
        wordSplit=wordSplit.substr(0,4)

    }
    
wordId=Math.round(Math.random()*1E9)
wordId=wordId.toString()
query=wordSplit+wordId

return query

}
module.exports={genShortUrl}


// console.log(query)



