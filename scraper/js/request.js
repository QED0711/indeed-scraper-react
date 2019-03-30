const request = require("request");
const cheerio = require("cheerio");

const jsdom = require('jsdom');
const { JSDOM } = jsdom;




const parseHTML = (body) => {
    return cheerio.load(body)
    // return new JSDOM(body);
}

const getJobCards = ($) => {
    return $(".jobsearch-SerpJobCard").toArray()
}




request("https://www.indeed.com/jobs?q=React+Developer&explvl=entry_level&fromage=last&start=90", function(err, response, body){
    const $ = parseHTML(body);
    const jobs = getJobCards($);
    let $$;

    let parsedJobs = [];
    jobs.forEach(job => {
        $$ = parseHTML($(job).html());

        parsedJobs.push({
            title: $$(".jobtitle").text().trim(),
            // href: $$(".jobTitle").attr("href"),
            location: $$(".location").text().trim(),
            summary: $$(".paddedSummary").text().trim(),
            responsive: !($$(".serp-ResponsiveEmployer").text() === ""),
            date: $$(".date").text().trim(),
            sponsored: !($$(".sponsoredGray").text() === "Sponsored")
        })
    })
    console.log(parsedJobs);
    
})