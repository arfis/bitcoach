/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';

import {AppServerModule} from './src/main.server';
import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';
import * as https from 'https';
import * as xmlParser from 'xml2js';
import axios from 'axios';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/bitcoach-onepager/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  server.get('/youtube', async (req, res) => {
    const API_KEY = 'AIzaSyCdgCwTbAfZ5NxPNFV2GuayKF7S9Kbod00';
    const maxResult = 3;
    const youtubeData = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?channelId=UCPjDQhKVe2YtPUI3PiWN82A&key=${API_KEY}&part=snippet,id&order=date&maxResults=${maxResult}`);

    res.status(200).send(youtubeData.data);
  });


  server.get('/medium', async (req, res) => {
    const mediumData = await axios.get(
      'https://medium.com/feed/bitcoach');

    xmlParser.parseString(mediumData.data, {trim: true}, (err, jsonData) => {
      const parsedMediumData = (jsonData.rss.channel[0].item as any[]).slice(0, 3).map(item => {
        const content = item['content:encoded'][0];
        const imgEndIndex = content.indexOf('" />');

        const image = content.substring(content.indexOf('src="') + 5, imgEndIndex);
        const descriptionIndex = content.lastIndexOf('<\/figure>') + 9;
        const description = content.substring(descriptionIndex, descriptionIndex + 200);
        return {
          title: item.title[0],
          category: item.category,
          publishedAt: item.pubDate[0],
          createdBy: item['dc:creator'][0],
          image,
          description,
          link: item.link[0]
        };
      });

      // console.log(parsedMediumData);
      res.status(200).send(parsedMediumData);
    });
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
