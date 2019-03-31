import request from 'request';
import cheerio from 'cheerio';


// ================================================================

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

const queryJobs = (url, limit = 100, index = 0, parsedJobs = []) => {
    request(url + `&start=${index}`, function(err, response, body){    
        if(err){
            console.log(err);
            return
        }
        const $ = parseHTML(body);
        const jobs = getJobCards($);
        parsedJobs.push(...returnParsedJobs(jobs, $));
        console.log("+++++++++++++++++++++++++++++ ", index, " +++++++++++++++++++++++++++++");
        if(hasNextPage($) && parsedJobs.length < limit){
            return queryJobs(url, limit, index + 10, parsedJobs);
        } else {
            console.log(parsedJobs)
        }
        
    })
}



// queryJobs("https://www.indeed.com/jobs?q=&l=washington+dc&fromage=last", 25);


export default queryJobs;