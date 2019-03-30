const axios = require('axios');

axios.get("https://www.indeed.com/jobs?q=React+Developer&explvl=entry_level&fromage=last&start=90").then((response => {
    console.log(response.data);
}))