const bankScraper = require('israeli-bank-scrapers');
const router = require('express').Router();
const fs = require('fs');

function buildOptions({ company, year, month, day }) {
  return {
    companyId: company,
    startDate: new Date(year, month, day),
    combineInstallments: true, // if set to true, all installment txns will be combine into the first one
    verbose: true, // include more debug info about in the output
  };
}

function buildCredentials({ id, card, num, password, company }) {
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
  if (!params.length) {
    const contents = fs.readFileSync('server/data/data1.json');
    const jsonContent = JSON.parse(contents);
    res.send(jsonContent);
  } else {
    const scraper = bankScraper.createScraper(buildOptions(params));
    scraper.scrape(buildCredentials(params)).then((result) => {
      if (result.success) {
        res.send(JSON.stringify(result.accounts));
      } else {
        res.send(`scraping failed for the following reason:  ${result.errorType}`);
      }
    });
  }
});
module.exports = router;
