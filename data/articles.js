
async function getArticles (section) {
    
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=5Vd8O8baGS3WEG1eQVAaS2mG6K0VyHH8`)
    const articles = response.data.results;
    // console.log(`GET articles`, articles);
    return articles;
};
