const googlePlaces = {
  API_KEY: 'GOOGLE_API_KEY',
  LOCATION: '32.5190,34.9045',
  RADIUS: 50000,
  BASE_URL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
};

const companyToCategoryMapping = {
  MAPPING_FILE: 'server/data/companies-dummy.json',
};

module.exports = { googlePlaces, companyToCategoryMapping };
