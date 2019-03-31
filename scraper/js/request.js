const request = require("request");
const cheerio = require("cheerio");

const parseHTML = (body) => {
    return cheerio.load(body)
    // return new JSDOM(body);
}

const getJobCards = ($) => {
    return $(".jobsearch-SerpJobCard").toArray()
}

const parseJobCard = ($, jobCard) => {
    return parseHTML($(jobCard).html())
}

const returnParsedJobs = (jobs, $) => {
    let parsedJobs = []
    let $$;
    jobs.forEach(job => {
        $$ = parseJobCard($, job);
        parsedJobs.push({
            title: $$(".jobtitle").text().trim(),
            href: `https://www.indeed.com${$$("a").first().attr("href")}`,
            location: $$(".location").text().trim(),
            summary: $$(".paddedSummary").text().trim(),
            responsive: !($$(".serp-ResponsiveEmployer").text() === ""),
            date: $$(".date").text().trim(),
            sponsored: !($$(".sponsoredGray").text() === "Sponsored")
        })
    })
    return parsedJobs
}

const sendRequest = (url) => {
    request(url, function(err, response, body){
        const $ = parseHTML(body);
        const jobs = getJobCards($);
        let parsedJobs = returnParsedJobs(jobs, $);
    
        console.log(parsedJobs);
        
    })
}

sendRequest("https://www.indeed.com/jobs?q=&l=washington+dc&fromage=last");