'use strict';
const Restify = require('restify');
const server = Restify.createServer({
  name: "MoneyBot"
});
const request = require('request');
const PORT = process.env.PORT || 3000;

server.use(Restify.bodyParser());
server.use(Restify.jsonp());

const convertCurrency = (amountToConvert, outputCurrency, cb) => {
  const {
    amount,
    currency
  } = amountToConvert;
  return request({
    url: "https://free.currencyconverterapi.com/api/v6/convert",
    qs: {
      q: `${currency}_${outputCurrency}`,
      compact: 'y'
    },
    method: 'GET',
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      let computedValue = Math.round(body[`${currency}_${outputCurrency}`]['val'] * amount);
      cb(null, `${amount} ${currency} converts to about ${outputCurrency} ${computedValue} as per current rates!`);
    } else {
      cb(error, null);
    }
  });

}

// POST route handler
server.post('/', (req, res, next) => {
  let {
    queryResult
  } = req.body;

  if(queryResult) {
    const {
      outputCurrency,
      amountToConvert
    } = queryResult.parameters;

      // Check if input currency code === output currency code
      if(amountToConvert.currency === outputCurrency) {
        const {
          amount
        } = amountToConvert;
        
        let responseText = `Well, ${amount} ${outputCurrency} is obviously equal to ${amount} ${outputCurrency}!`;
        let respObj = {
          fulfillmentText: responseText
        }
        res.json(respObj);
      } else {
        // Query the fixer.io API to fetch rates and create a response
        
        convertCurrency(amountToConvert, outputCurrency, (error, result) => {
          if(!error && result) {
            let respObj = {
              fulfillmentText: result
            }
            res.json(respObj);
          }
        });
      }
  }

  return next();
});

server.listen(PORT, () => console.log(`MoneyBot running on ${PORT}`));
