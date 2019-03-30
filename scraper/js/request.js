const request = require("request");
const cheerio = require("cheerio");

const jsdom = require('jsdom');
const { JSDOM } = jsdom;




const returnBody = (body) => {
    return cheerio.load(body)
    // return new JSDOM(body);
}

const returnJSON = ($) => {
    return $(".location",".jobsearch-SerpJobCard")
}

const returnNumElements = (json) => {
    return json.length
}




request("https://www.indeed.com/jobs?q=React+Developer&explvl=entry_level&fromage=last&start=90", function(err, response, body){
    const $ = returnBody(body);
    const json = returnJSON($);
    const numElements = returnNumElements(json);
    console.log(json[0])
})