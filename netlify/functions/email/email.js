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
        subject: `test`,
        parameters: {
          
        },
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

