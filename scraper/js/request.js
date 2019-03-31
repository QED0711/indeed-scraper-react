const request = require("request");
const cheerio = require("cheerio");

const parseHTML = (body) => {
    return cheerio.load(body)
}

const getJobCards = ($) => {
    return $(".jobsearch-SerpJobCard").toArray()
}

const parseJobCard = ($, jobCard) => {
    return parseHTML($(jobCard).html())
}

const hasNextPage = ($) => {
    return !!($(".np").last().text().match(/next/i))
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

const sendRequest = (url, index = 0, parsedJobs = []) => {
    request(url + `&start=${index}`, function(err, response, body){
        const $ = parseHTML(body);
        const jobs = getJobCards($);
        parsedJobs.push(...returnParsedJobs(jobs, $));
        console.log("+++++++++++++++++++++++++++++ ", index, " +++++++++++++++++++++++++++++");
        if(hasNextPage($)){
            return sendRequest(url, index + 10, parsedJobs);
        } else {
            console.log(parsedJobs)
        }
        
    })
}


sendRequest("https://www.indeed.com/jobs?q=Music&l=Columbus+OH");