var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/alerts',
  params: {lat: '38.5', lon: '-78.5'},
  headers: {
    'x-rapidapi-key': '39daefd305mshbaaaf94660b1ee2p1cbb6cjsnaa36d941551c',
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});