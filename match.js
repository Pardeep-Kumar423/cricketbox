const rssFeedUrl = 'http://static.cricinfo.com/rss/content/story/feeds/0.xml';
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const iplContainer = document.getElementById('ipl-news-container');
    const teamContainer = document.getElementById('team-news-container');

    const iplNews = [];
    const teamNews = [];

    data.items.forEach(item => {
      const text = (item.title + item.description).toLowerCase();
      const teams = ['india', 'australia', 'england', 'pakistan', 'new zealand', 'south africa', 'sri lanka', 'afghanistan', 'west indies', 'bangladesh'];

      if (text.includes('ipl') || text.includes('indian premier league')) {
        iplNews.push(item);
      } else if (teams.some(team => text.includes(team))) {
        teamNews.push(item);
      }
    });

    function createCard(item) {
      const card = document.createElement('div');
      card.className = 'news-card';

      const img = item.thumbnail ? `<img src="${item.thumbnail}" alt="News Image">` : '';
      const date = new Date(item.pubDate).toLocaleDateString();

      card.innerHTML = `
        ${img}
        <div class="news-content">
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <p class="news-date">${date}</p>
          <p>${item.description.slice(0, 150)}...</p>
        </div>
      `;
      return card;
    }

    // Display IPL News
    if (iplNews.length === 0) {
      iplContainer.innerHTML = '<p>No IPL news available.</p>';
    } else {
      iplNews.slice(0, 6).forEach(item => {
        iplContainer.appendChild(createCard(item));
      });
    }

    // Display Team News
    if (teamNews.length === 0) {
      teamContainer.innerHTML = '<p>No team news available.</p>';
    } else {
      teamNews.slice(0, 6).forEach(item => {
        teamContainer.appendChild(createCard(item));
      });
    }
  })
  .catch(err => {
    console.error('Error fetching cricket news:', err);
  });
