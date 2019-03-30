const request = require("request");
const cheerio = require("cheerio");

const jsdom = require('jsdom');
const { JSDOM } = jsdom;




const returnBody = (body) => {
    return cheerio.load(body)
    // return new JSDOM(body);
}

const getJobCards = ($) => {
    return $(".jobsearch-SerpJobCard").toArray()
}




request("https://www.indeed.com/jobs?q=React+Developer&explvl=entry_level&fromage=last&start=90", function(err, response, body){
    const $ = returnBody(body);
    const jobs = getJobCards($);

    jobs.forEach(job => {
        console.log($(job).html())
        console.log("\n==========================================================\n")
    })
    
})