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
import * as NodeCache from 'node-cache';
import * as cors from 'cors';
import * as fs from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/bitcoach-onepager/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const myCache = new NodeCache();

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

  server.use(cors({origin: '*'}));

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  server.get('/youtube', async (req, res) => {
    let videos = myCache.get('video');

    if (videos === undefined) {
      const API_KEY = 'AIzaSyCdgCwTbAfZ5NxPNFV2GuayKF7S9Kbod00';
      const maxResult = 100;
      const youtubeData = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=snippet,contentDetails,id,status&maxResults=3&playlistId=PL4RE5QP-sB4KqW5F9406gKL7hjc5jnyKt&maxResults=${maxResult}`);

      videos = youtubeData.data.items;
      videos = (videos as any[]).map( (video, index) => {
        const originalTitle = video.snippet.title;

        const numberValue = originalTitle.match(/(#)\w+/)[0];
        const episodeNumber = originalTitle.indexOf(numberValue);

        const title = originalTitle.substring(0, episodeNumber - 1);
        const subtitle = originalTitle.substring(episodeNumber + numberValue.length);
        return {
          ...video.snippet,
          title,
          subtitle,
          episodeNumber: index + 1,
          videoId: video.id.videoId
        };
      });

      const success = myCache.set( 'video', videos, 1800000 );
    }

    res.status(200).send(videos);
  });


  server.get('/medium', async (req, res) => {
    const mediumData = await axios.get(
      'https://medium.com/feed/bitcoach');
    xmlParser.parseString(mediumData.data, {trim: true}, (err, jsonData) => {
      const parsedMediumData = (jsonData.rss.channel[0].item as any[]).map(item => {
        const content = item['content:encoded'][0];
        const imgEndIndex = content.indexOf('" />');

        const image = content.substring(content.indexOf('src="') + 5, imgEndIndex);
        const descriptionIndex = content.lastIndexOf('<\/figure>') + 9;
        const description = content.substring(descriptionIndex);

        return {
          title: item.title[0],
          category: item.category,
          publishedAt: item.pubDate[0],
          createdBy: item['dc:creator'][0],
          image,
          description, // : content.substring(0, descriptionIndex + 200),
          link: item.link[0],
        };
      });


      const staticArticle = {
        title: 'Začnite blogovať s Bitcoachom!',
        category: ['BLOG'],
        publishedAt: 'Sun, 20 Dec 2020 15:09:27 GMT',
        createdBy: 'Bitcoach',
        image: 'https://miro.medium.com/max/3840/1*FUUOz_JMgtuX8hmf11PMQw.jpeg',
        description: 'V rámci našej Blog sekcie sme si pre vás pripravili novinku. Keďže sme komunitný portál, prinášame našej komunite možnosť blogovania na Bitcoach.net. Odteraz môžete verejne vyjadriť svoje postrehy, názory, odborný výskum a popritom si možno niečo aj zarobiť.\n' +
          'Každý zverejnený blog bude totižto obsahovať aj peňaženku autora, na ktorú môžu ľudia priamo autorovi prispieť a dať mu najavo svoju vďaku za prínosný obsah. Okrem iného môžete vo vašich blogoch zverejňovať obľúbené referaly (pokiaľ samozrejme súvisia s témou 🙂 ).', // : content.substring(0, descriptionIndex + 200),
        link: 'https://medium.com/bitcoach/za%C4%8Dnite-blogova%C5%A5-s-bitcoachom-e49fee1959e3',
      };
      // console.log(parsedMediumData);
      res.status(200).send([...parsedMediumData.slice(0, 2), staticArticle]);
    });
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
  });

  return server;
}

function run(): void {
  const privateKey  = fs.readFileSync('cert/server.key', 'utf8');
  const certificate = fs.readFileSync('cert/server.crt', 'utf8');
  const credentials = {key: privateKey, cert: certificate};
  const httpsServer = https.createServer(credentials, app);
  const port = process.env.PORT || 80;

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
