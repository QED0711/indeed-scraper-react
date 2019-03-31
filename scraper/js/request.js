const request = require("request");
const cheerio = require("cheerio");

const parseHTML = (body) => {
    return cheerio.load(body)
    // return new JSDOM(body);
}

const getJobCards = ($) => {
    return $(".jobsearch-SerpJobCard").toArray()
}




request("https://www.indeed.com/jobs?q=&l=washington+dc&fromage=last", function(err, response, body){
    const $ = parseHTML(body);
    const jobs = getJobCards($);
    let $$;

    let parsedJobs = [];
    jobs.forEach(job => {
        $$ = parseHTML($(job).html());
        // console.log($(job).html())
        // console.log("\n=====================================================================\n")
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
    console.log(parsedJobs);
    
})