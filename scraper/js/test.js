const https = require("https");


https.get('https://www.indeed.com/jobs?q=React+Developer&explvl=entry_level&fromage=last&start=90', res => {
res.setEncoding('utf8');    
res.on('data', body => {
        console.log(body)
    })
})