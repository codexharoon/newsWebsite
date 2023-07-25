const API_KEY = '9bcf98e62fec48a1865177bcf3ca6e5c';
const API_URL = 'https://newsapi.org/v2/everything?q=';


window.addEventListener('load', () => fetchNews('Pakistan'));


async function fetchNews(query){
    let cardHTML = ``;

    const response = await fetch(`${API_URL}${query}&apikey=${API_KEY}`);
    const data = await response.json();

    const articles = data.articles;

    await articles.forEach((article)=>{

        const url = article.url;
        let urlToImage = article.urlToImage;
        const title = article.title;
        const source = `${article.source.name}`;
        const desc = article.description;

        if(urlToImage){

            cardHTML += `

                <a href="${url}" target="_blank">

                    <div class="card">

                        <div class="card-header">
                            <img src="${urlToImage}" alt="">
                        </div>

                        <div class="card-content">
                            <h3>${title}</h3>
                            <h6 class="news-source">${source}</h6>
                            <p class="news-desc" id="news-desc">${desc}</p>
                        </div>

                    </div>
                
                </a>
            `;

        }

    });

    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = cardHTML;
    
}

let currentNavItem = null;
function onNavClick(query){
    fetchNews(query);

    const navItem = document.getElementById(query);
    if(currentNavItem)
        currentNavItem.classList.remove('selected');
    currentNavItem = navItem;
    navItem.classList.add('selected');
}


document.querySelector('.search-button').addEventListener('click',()=>{
    const searchQuery = document.querySelector('.news-input').value;

    if(searchQuery){
        fetchNews(searchQuery);
    }

});



document.querySelector('.news-input').addEventListener('keydown',(key)=>{
    if(key.key === 'Enter'){
        const searchQuery = document.querySelector('.news-input').value;
        if(searchQuery){
            fetchNews(searchQuery);
        }
    }
});


document.querySelector('.js-nav-toggle').addEventListener('click',()=>{
    document.querySelector('.toggle-icon').classList.toggle('fa-xmark');
    document.querySelector('.right-nav').classList.toggle('active');
});



// window.addEventListener('load', async ()=> {
//    const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2023-06-24&sortBy=publishedAt&apiKey=9bcf98e62fec48a1865177bcf3ca6e5c`)
//    console.log(await response.json());
// }
// );