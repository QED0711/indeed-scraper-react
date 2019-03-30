const indeed = require('indeed-scraper');

const queryOptions = {
    host: 'www.indeed.com',
    query: 'javascript',
    city: 'Columbus, OH',
    radius: '25',
    level: 'entry_level',
    jobType: 'fulltime',
    maxAge: '3',
    sort: 'date',
    limit: '10'
  };
  
  indeed.query(queryOptions).then(res => {
      console.log(res); // An array of Job objects
  });