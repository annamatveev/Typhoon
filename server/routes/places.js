const router = require('express').Router();
const axios = require('axios');
const placesConfig = require('../config/places');
const fs = require('fs');
const qs = require('qs');

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const findCompanyInGooglePlaces = async function (keyword) {
  const query = qs.stringify({
    location: placesConfig.googlePlaces.LOCATION,
    radius: placesConfig.googlePlaces.RADIUS,
    keyword,
    key: placesConfig.googlePlaces.API_KEY,
  });
  const response = await axios.get(`${placesConfig.googlePlaces.BASE_URL}${query}`);
  if (response.data.results.length) {
    return {
      id: response.data.results[0].place_id,
      types: response.data.results[0].types,
      name: response.data.results[0].name,
      vicinity: response.data.results[0].vicinity,
    };
  }
  return false;
};

router.get('/', (req, res, next) => {
  const contents = fs.readFileSync(placesConfig.companyToCategoryMapping.MAPPING_FILE);
  const jsonContent = JSON.parse(contents);
  res.send(jsonContent);
});

router.get('/map', asyncMiddleware(async (req, res, next) => {
  const placesMapping = JSON.parse(fs.readFileSync(placesConfig.companyToCategoryMapping.MAPPING_FILE));
  const creditCards = JSON.parse(fs.readFileSync('server/data/data1.json'));
  for (let i = 0; i < creditCards.length; i++) {
    for (let j = 0; j < creditCards[i].txns.length; j++) {
      const keyword = creditCards[i].txns[j].description;
      if (!placesMapping[keyword]) {
        placesMapping[keyword] = await findCompanyInGooglePlaces(keyword);
      }
    }
  }
  fs.writeFile(placesConfig.companyToCategoryMapping.MAPPING_FILE, JSON.stringify(placesMapping), (err) => { res.send(err ? 'Error' : 'Done'); });
}));

module.exports = router;
