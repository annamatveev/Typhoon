const bankScraper = require('israeli-bank-scrapers');
const router = require('express').Router();
const axios = require('axios');
const googlePlacesConfig = require('../config/googlePlaces');
const fs = require('fs');
const qs = require('qs');

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

function buildOptions({company, year, month, day}) {
  return {
    companyId: company,
    startDate: new Date(year, month, day),
    combineInstallments: true, // if set to true, all installment transactions will be combine into the first one
    verbose: true, // include more debug info about in the output
  };
}

function buildCredentials({id, card, num, password, company}) {
  const credentials = {
    id,
    password,
  };

  switch (company) {
    case 'isracard':
    case 'amex':
      credentials.card6Digits = card;
      break;
    case 'discount':
      credentials.num = num;
      break;
    default:
      break;
  }

  return credentials;
}

router.get('/', (req, res, next) => {
  const params = req.query;
  const scraper = bankScraper.createScraper(buildOptions(params));
  scraper.scrape(buildCredentials(params)).then((result) => {
    if (result.success) {
      res.send(JSON.stringify(result.accounts));
    } else {
      res.send(`scraping failed for the following reason:  ${result.errorType}`);
    }
  });
});

router.get('/transactionsMock', (req, res, next) => {
  const contents = fs.readFileSync('server/data/data.json');
  const jsonContent = JSON.parse(contents);
  res.send(jsonContent);
});

router.get('/places', (req, res, next) => {
  const contents = fs.readFileSync('server/data/companies.json');
  const jsonContent = JSON.parse(contents);
  res.send(jsonContent);
});

router.get('/mapPlaces', asyncMiddleware(async (req, res, next) => {
  const placesMapping = fs.readFileSync('server/data/companies.json');
  const placesMappingJsonContent = JSON.parse(placesMapping);
  const creditCards = fs.readFileSync('server/data/data.json');
  const creditCardsJsonContent = JSON.parse(creditCards);
  for (let i = 0; i < creditCardsJsonContent.length; i++) {
    for (let j = 0; j < creditCardsJsonContent[i].txns.length; j++) {
      const keyword = creditCardsJsonContent[i].txns[j].description;
      console.log(`Keyword: ${keyword}`);
      if (placesMappingJsonContent[keyword] === undefined) {
        placesMappingJsonContent[keyword] = false;
        const query = qs.stringify({
          location: googlePlacesConfig.LOCATION,
          radius: googlePlacesConfig.RADIUS,
          keyword,
          key: googlePlacesConfig.API_KEY,
        });
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${query}`);
        if (response.data.results.length) {
          placesMappingJsonContent[keyword] = {
            id: response.data.results[0].place_id,
            types: response.data.results[0].types,
            name: response.data.results[0].name,
            vicinity: response.data.results[0].vicinity,
          };
        }
        console.log(keyword);
      }
    }
  }
  fs.writeFile('server/data/companies.json', JSON.stringify(placesMappingJsonContent), (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      console.log('The file was saved!');
      res.send('Done');
    }
  });
}));


module.exports = router;
