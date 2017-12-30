import App from "./App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <link href="https://fonts.googleapis.com/css?family=Caveat+Brush" rel="stylesheet">
        <meta name="theme-color" content="#eab608">
        <title>The Gang Picks an Episode</title>
        <meta property="og:title" content="The Gang Picks an Episode" />
        <meta property="og:description" content="The unofficial It's Always Sunny in Philadelphia random episode picker" />
        <meta property="og:image" content="http://thegangpicksanepisode.com/opengraph.png" />
        <meta property="og:image:secure_url" content="https://thegangpicksanepisode.com/opengraph.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="The Gang Picks an Episode logo" />
        <meta property="og:site_name" content="The Gang Picks an Episode" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://thegangpicksanepisode.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="http://thegangpicksanepisode.com/twitter.png" />
        <meta name="twitter:description" content="The unofficial It's Always Sunny in Philadelphia random episode picker" />
        <meta name="twitter:site" content="@hawkinjs" />
        <meta name="twitter:site:id" content="@hawkinjs" />
        <meta name="twitter:creator" content="@hawkinjs" />
        <meta name="twitter:creator:id" content="@hawkinjs" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
        (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-78807236-2', 'auto');
        ga('send', 'pageview');
        </script>
    </body>
</html>`
      );
    }
  });

export default server;
