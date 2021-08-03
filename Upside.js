var axios = require("axios").default;
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we ask the user for what country they are looking for.
        {
            type: "input",
            message: "What country do you want information about ?",
            name: "country"
         },
    ]).then(function(covidStats){
    var country = (covidStats.country)
    var options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        params: {name: 'USA'},
        headers: {
          'x-rapidapi-key': '9ea6446dd8mshf4965f7f2bdf857p12bdd8jsnc7eaee27c0f8',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
      };
  axios.request(options).then(function (response) {
      console.log (response.data[0])
    var longitude = (response.data[0].longitude)
    var latitude = (response.data[0].latitude)
    inquirer
    .prompt([
    // Here we ask the user if they want the forecast for the same country.
    {
        type: "confirm",
        message: "Would you also like to see the current weather forecast in this area as well ?",
        name: "forecast",
        default: true
    }
    ]).then(function(weather){
        if (weather.forecast === true){
        var options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: latitude + ',' + longitude},
        headers: {
          'x-rapidapi-key': '9ea6446dd8mshf4965f7f2bdf857p12bdd8jsnc7eaee27c0f8',
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          inquirer
          .prompt([
          // Here we ask the user if they want tips to help prevent covid.
          {
              type: "confirm",
              message: "Would you also like to see tips on how to be safe during covid ?",
              name: "tips",
              default: true
          }
              ]).then(function(covidT){
              if (covidT.tips){
                  console.log(" tips on how to prevent covid")
                  var tipsR = [
                  "1. Always wear a mask to protect yourself.", "2. Stay atleast 6 feet from others.", "3. Avoid crowds." ,"4. Get the covid-19 vaccine.", "5. Clean your hands often." ,"6. Avoid close contact with people who are sick.", "7. Cover your mouth when you cough or sneeze with a tissue or your arm." ,"8. Clean frequently touched objects and surfaces daily.", "9. Monitor your health weekly." ]
                  for (var i = 0; i < tipsR.length; i++){
                      console.log(tipsR[i])
                  }
              }else{
                console.log ("Ok have a good day and make sure to be safe by wearing a mask when you go out. :)")
                }
              })    
      })
    }else{
    console.log ("Ok have a good day and make sure to be safe by wearing a mask when you go out. :)")
    }
    })

}).catch(function (error) {
	console.error(error);
    });
})

