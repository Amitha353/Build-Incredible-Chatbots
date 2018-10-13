'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const FBeamer = require('./fbeamer');
// Vanilla
const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather, forecastWeather} = require('./parser');

const server = express();
const PORT = process.env.PORT || 3000;
const f = new FBeamer(config.fb);

server.get('/', (req, res) => f.registerHook(req, res));
server.post('/', bodyParser.json({
  verify: f.verifySignature
}));
server.post('/', (req, res, next) => {
  // Messages will be received here if the signature goes through
  // we will pass the messages to FBeamer for parsing
  return f.incoming(req, res, data => {
    try {
      if(data.type === 'text') {
        matcher(data.content, async resp => {
          switch(resp.intent) {
            case 'Hello':
              await f.txt(data.sender, `${resp.entities.greeting} to you too!`);
              await f.img(data.sender,'http://s1.1zoom.me/b4949/691/Scenery_Sunrises_and_sunsets_Fields_Sky_Grass_Sun_539960_2048x1152.jpg');
              break;
            case 'CurrentWeather':
              await f.txt(data.sender, 'Let me check...');
              let cwData = await weather(resp.entities.city, 'current');
              let cwResult = currentWeather(cwData);
              await f.txt(data.sender, cwResult);
              break;
            case 'WeatherForecast':
              await f.txt(data.sender, 'Let me check...');
              let wfData = await weather(resp.entities.city);
              let wfResult = forecastWeather(wfData, resp.entities);
              await f.txt(data.sender, wfResult);
              break;
            default: {
              await f.txt(data.sender, "I don't know what you mean :(");
            }
          }
        });
      } else if(data.type === 'img') {
        matcher(data.content, async resp => {
        await f.img(data.sender,'http://s1.1zoom.me/b4949/691/Scenery_Sunrises_and_sunsets_Fields_Sky_Grass_Sun_539960_2048x1152.jpg');
        });
      }
    } catch(e) {
      console.log(e);
    }
  });
});
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));