const lastFMToken = process.env.LAST_FM_API_TOKEN;
const lastFMUser = 'bordesak';

const fetch = require('node-fetch');

const handler = async function (request, context) {
  console.log("Calling email.js function");

  // TODO: Validate POST request

  const body = JSON.parse(request.body)
  
  if (body.email && body.email === '') {
    // TODO: return an error
    return
  }
  console.log(body)

  const tracks = await getTracks();
  let templateData = {
    tracks: []
  }

  tracks.recenttracks.track.forEach((item, index) => {
    if (index > 11) return

    const track = {
      artist: item.artist['#text'],
      album: item.album['#text'],
      image: item.image[2]['#text'],
      name: item.name,
      url: item.url
    }
    templateData.tracks.push(track)
  })

  const results = await fetch(
    `${process.env.URL}/.netlify/functions/emails/digest`,
    {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
      },
      method: "POST",
      body: JSON.stringify({
        from: process.env.POSTMARK_FROM_ADDRESS,
        to: body.email,
        subject: 'Rian’s recent tracks',
        parameters: templateData,
      }),
    }
  );

  const data = await results.json()

  console.log(data)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
}

module.exports = { handler }

async function getTracks() {
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFMUser}&api_key=${lastFMToken}&format=json`
  const results = await fetch(url);

  // If there was an error
  if (!results.ok) {
    console.error(results);
    return
  }

  // Get JSON body from results
  const data = await results.json();

  // Return data
  return data
}