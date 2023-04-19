# Music digest using Netlify + Last.fm + Postmark
This example site illustrates how to show what  you're listening to on [Last.fm](https://last.fm), as well as trigger an email digest using [Postmark](https://postmarkapp.com). It makes use of Netlify’s [serverless functions](https://docs.netlify.com/functions/overview/) and [email integration](https://docs.netlify.com/integrations/email-integration/#app).

The front-end HTML, CSS, and javascript inside of the `public` directory are all vanilla. No fancy frameworks here, so feel free to integrate this into whatever frameworks you’re comfortable with.

## Instructions

Follow these steps to deploy your site to Netlify and get this up and running on your local dev environment.

### Requirements
- [Node.js 16+](https://nodejs.org/en/download)
- [Postmark account](https://postmarkapp.com) - Ensure that you have a [verified domain or Sender Signature](https://postmarkapp.com/manual#step-2-set-up-the-address-you-plan-to-send-from)
- [Netlify account](https://netlify.com) - Ensure that you've installed the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Last.fm account](https://last.fm) - Ensure that you’ve been listening to some sweet tunes 🎶. [Phil Collins - In the air tonight](https://www.last.fm/music/Phil+Collins/_/In+The+Air+Tonight+-+2015+Remastered) is highly recommended cause it'll give you the strength to get through your day.


### Deploy site
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/derekrushforth/pm-music-digest-netlify)

1. Deploy your site to Netlify using the big 🔵blue button above
1. Once deployed, select your site's name at the top and go to `Integrations`
1. Select `Emails` from the menu on the left and then `Enable emails`
1. Select `Postmark` as your email provider, [enter your Postmark API token](https://postmarkapp.com/support/article/1008-what-are-the-account-and-server-api-tokens#:~:text=To%20find%20the%20Server%20API,and%20many%20other%20common%20tasks.), ensure the emails directory is `./emails`, and save
1. Go to `Site settings` from the top menu
1. Go to `Environment variables` from the menu on the left
1. Add a single environment variable with these key names. Ensure that `All scopes` and `Same value for all deploy contexts` are selected.
  - `LAST_FM_API_TOKEN` - Enter your Last.fm API token as the value
  - `POSTMARK_FROM_ADDRESS` - This is the address the digest email will be sent from. [Enter an address from a verified domain or Sender Signature in Postmark](https://postmarkapp.com/manual#step-2-set-up-the-address-you-plan-to-send-from).
1. Now let's trigger a deploy so that your site will load the new environment variables. Go to `Deploys` from the top menu
1. Then `Trigger deploy` -> `Deploy site`
1. Once the deployment is finished, select the `Preview` button. You should see that all of the recent tracks are loaded. Also make sure to send a digest email to yourself to make sure the Postmark integration is working.

### Set up your local dev environment

1. When you deployed your site to Netlify, it should have created a repository on your Github account. From Netlify, navigate to the `Site overview` page and then it should say `Deploys from Github`. Select that link to view the repo.
1. Clone the git repository on your local system. Select the big 🟢green `Code` button to see how.
1. Open the terminal and navigate to your website: `cd ~/your-site`
1. `npm install`
1. `netlify link` and select `Use current git remote origin` - Links this folder to your Netlify website so that it loads your environment variables locally and you can deploy. Once finished it should show you the admin and site URL.
1. `netlify dev` - This will start your local dev server and your site will be accessible at [localhost:8888](http://localhost:8888)
 
You're all set! You can now make edits to the site. Run `netlify deploy --prod` to deploy your site from this folder.

## Helpful thingys
- `netlify build` - Build your site locally to make sure that you don’t run into any snags during deployment
- `netlify deploy` - Deploys a private staging instance of the site so that you can preview your changes. Add the `--prod` flag to deploy to production.
- Preview the digest email template at [localhost:8888/.netlify/functions/emails/digest](http://localhost:8888/.netlify/functions/emails/digest)
- By default Netlify uses your environment variables for Postmark and Last.fm from your Netlify config. If you'd prefer to override these locally, rename `.env.example` to `.env` and update your tokens. Be sure not to commit the `.env` file to your repo.

## 🚨🚨Work in progress🚨🚨

We’re still working on improving some stuff.

- [ ] Triggering a digest email from the front-end isn't a real use case, this was purely just to show how to send an email using Netlify’s new email integration. So we are considering turning this into a subscription form that automatically sends out digests every x days to a list. This would require an integration with some sort of serverless database tool to store the contacts.
- [ ] The digest HTML email template under `./email/digest/index.html` is a bit buggy on certain email clients
- [ ] Errors aren’t handled very gracefully in javascript
- [ ] CSS needs to be tidied up
- [ ]  The site doesn't work very well on smaller screens
