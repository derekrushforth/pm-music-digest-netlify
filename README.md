# 🚨WIP🚨
I'm still working on the instructions so don't follow these unless you like pain.

1. (optional) nvm use (node.js 16+)
2. npm install
3. npm init
- manual

- go to netlify site under your account
- integrations > emails
- click [enable emails]
- select postmark, add API key, leave emails directory

- site settings > environment variables
- click [add variable] -> single variable
- all scopes
- enter key/value "LAST_FM_API_TOKEN" 
- [ create variable]

- duplicate .env.example and rename to .env
- add tokens to the file and save

- netlify dev
