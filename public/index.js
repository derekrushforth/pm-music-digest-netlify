//------------------------------------------
// Fetch tracks
//------------------------------------------
fetch('/.netlify/functions/getRecentTracks')
  .then(response => response.json())
  .then(data => {
    const dataContainer = document.querySelector('.js-recent-tracks');
    const recentTracks = data.recenttracks.track;

    const html = `
      ${recentTracks.map(track => 
        `<div class="track">
          <a href="${track.url}" target="_blank" class="track_link">
            <img src="${track.image[3]['#text']}" class="track_image">
            <div class="track_content">
              <h2 class="track_artist">${track.artist['#text']}</h2>
              <p class="track_name">${track.name}</p>
              <p class="track_album">${track.album['#text']}</p>
              ${track.hasOwnProperty('@attr') && 
                track['@attr'].hasOwnProperty('nowplaying') && 
                track['@attr'].nowplaying === 'true' ? '<span class="track_playing">▶️ Now Playing</span>' : ''}
            </div>
          </a>
          <div class="track_record"></div>
          </div>`).join('')
      }
    `;
    dataContainer.innerHTML = html;
  })
  .catch(error => console.error(error));


//------------------------------------------
// Send email
//------------------------------------------
const emailButton = document.querySelector('.js-email');
const emailField = document.querySelector('.js-email-field');

emailButton.addEventListener('click', function(event) {
  event.preventDefault();

  const emailValue = emailField.value;

  // Ensure email is not blank
  if (emailValue == '') {
    alert('Please enter an email.');
    return;
  }
  
  const url = emailButton.getAttribute('href')
  fetch(url, {
    method:"POST", 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailValue
    })
  })
    .then(response => response.json())
    .then(data => {
      alert('Email sent!')
    })
    .catch(error => console.error(error));
})