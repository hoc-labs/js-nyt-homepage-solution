function getHTMLForArticleSummary(article, topic) {
  
  let imageURL = (article.multimedia)?article.multimedia[0].url:'';

  let articleSummaryHTML = `
    <article>
      <img src="${imageURL}" alt="" />
      <span class="category category-${topic.name}">${topic.title}</span>
      <h3><a href="">${article.title}</a></h3>
      <div class="profile">${article.byline}</div>
      <p>${article.abstract}</p>
    </article>
  `;

  return articleSummaryHTML;
}

async function getHTMLForArticleGrid(topic) {
  let articles = await getArticles(topic.name);
  let articleGridHTML = articles.map(x=>getHTMLForArticleSummary(x, topic)).join("");
  return articleGridHTML;
}

async function getHTMLForShowcaseArticleSummary(topic) {
  
  let articles = await getArticles(topic.name);

  // for now, just get the first article
  let article = articles[0];
  let imageURL = article.multimedia[0].url;

  return `
    <section style="background:url(${imageURL}) center/cover" class="showcase ${topic.name}">
        <span class="category category-${topic.name}">${capitalize(topic.name)}</span>
        <h1>${article.title}</h1>
        <p>
          ${article.abstract}
        </p>
        <a href="" class="btn">Learn More</a>
    </section>`;
}

async function showTopic(topic) {
  let element = document.getElementById("showcase");
  element.innerHTML = await getHTMLForShowcaseArticleSummary(topic);
    
  element = document.getElementById("article-grid");
  let articleGridHTML = await getHTMLForArticleGrid(topic);
  element.innerHTML = articleGridHTML;
}

function initTopic(topic) {
  let button = document.getElementById(`${topic.name}-link`);

  button.addEventListener("click", (event)=>{
    event.preventDefault();
    showTopic(topic);
  });
}

function initTopics() {
  topicsData.forEach(x=>initTopic(x));
}

initTopics();