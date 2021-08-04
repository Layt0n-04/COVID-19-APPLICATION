var axios = require("axios").default;
var inquirer = require("inquirer");
const { table } = require('table');
var NodeGeocoder = require("node-geocoder");
var weather = require("weather-js");
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
        params: {name: country},
        headers: {
          'x-rapidapi-key': '9ea6446dd8mshf4965f7f2bdf857p12bdd8jsnc7eaee27c0f8',
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
      };
  axios.request(options).then(function (response){
      console.log (response.data[0])
      var countryTotalStats = response.data[0]
      const data = [
        ["Total Confirmed Cases:", "Total People Recovered:","Total Critical:", "Total Deaths:"],
        [countryTotalStats.confirmed, countryTotalStats.recovered, 
          countryTotalStats.critical, countryTotalStats.deaths]
      ];
      // table settings     
      const config = {
        columnDefault: {
          width: 16,
        },
        columns: [
          { alignment: 'right' },
          { alignment: 'right' },
          { alignment: 'right' },
          { alignment: 'right' },
          {truncate: 100}
        ],
        header: {
          alignment: 'center',
          content: 'Covid-19 Total stats for \n' + countryTotalStats.country.toUpperCase(),
        },
      }
        // table being logged here 
        console.log(table(data, config));
      inquirer
    .prompt([
    // Here we ask the user if they want to see the table
    {
        type: "confirm",
        message: "Would you also like to see daily staistics of some provinces in this country ?",
        name: "daily",
        default: true
    }
    ]).then(function(specific){
        if(specific.daily){

            var country = (covidStats.country)
    var options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/report/country/name',
  params: {name: country, date: '2020-04-01'},
  headers: {
    'x-rapidapi-key': '9ea6446dd8mshf4965f7f2bdf857p12bdd8jsnc7eaee27c0f8',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    } 
  };
  axios.request(options).then(function (response){
      var provinces = response.data[0].provinces

      const data = [
        ["Province:", "Confirmed Cases:", "People Recovered:","Deaths:", "Active Cases:"]
      ];
      // table settings     
      const config = {
        columnDefault: {
          width: 16,
        },
        columns: [
          { alignment: 'right' },
          { alignment: 'right' },
          { alignment: 'right' },
          { alignment: 'right' },
          {wrapWord: true},
          {truncate: 100}
        ],
        header: {
          alignment: 'center',
          content: 'Covid-19 Daily stats \n' + covidStats.country.toUpperCase(),
        },
      }
      for (var i = 0; i < provinces.length; i++){
        data.push([provinces[i].province, provinces[i].confirmed, provinces[i].recovered, provinces[i].deaths, provinces[i].active])
        };
        // table being logged here 
        console.log(table(data, config));
        inquirer
          .prompt([
          // Here we ask the user if they want to see the vaccine data
          {
              type: "confirm",
              message: "Would you also like to see all FDA apporved vaccines for Covid-19 ?",
              name: "vaccine",
              default: true
          }
          ]).then(function(fdaApp){
            if (fdaApp.vaccine){
              var options = {
                method: 'GET',
                url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-fda-approved-vaccines',
                headers: {
                  'x-rapidapi-key': '9ea6446dd8mshf4965f7f2bdf857p12bdd8jsnc7eaee27c0f8',
                  'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
                }
              };              
              axios.request(options).then(function (response) {
                
                var vaccineArr = response.data
                const data = [
                  ["Developer/Researcher:", "Category:", "Phase:","Description:",]
                ];
                // table settings     
                const config = {
                  columnDefault: {
                    width: 17,
                  },
                  columns: [
                    { alignment: 'right' },
                    { alignment: 'right' },
                    { alignment: 'right' },
                    { alignment: 'right' },
                    {truncate: 100},
                    {wrapWord: true}
                  ],
                  header: {
                    alignment: 'center',
                    content: 'Covid-19 \n' + "Vaccine Info".toUpperCase(),
                  },
                }
                for (var i = 0; i < vaccineArr.length; i++){
                  var element = vaccineArr[i];
                  data.push([element.developerResearcher, element.category, element.phase, element.description])
                  };
                  // table being logged here 
                  console.log(table(data, config));

                inquirer
                .prompt([
                // Here we ask the user if they want the forecast for the same country.
                {
                    type: "confirm",
                    message: "Would you also like to see the current weather forecast in a area ?",
                    name: "forecast",
                    default: true
                }
                ]).then(function(whether){
                    if (whether.forecast){
                        inquirer
                          .prompt([
                          // Here we ask the user for what country they are looking for.
                            {
                          type: "input",
                          message: "Please list the city and state you want the forecast for",
                          name: "userInput"
                            }
                    ]).then(function(response){
                      var options = {
                        provider: "mapquest",
                        apiKey: "v2rTncGTaPacUB47gDtAvBdFYs1ZbWGW"
                      };
                      
                      var geocoder = NodeGeocoder(options);
                      
                      // Get all elements in process.argv, starting from index 2 to the end
                      // Join them into a string to get the space delimited address
                      var address = response.userInput
                      
                      
                      // Then use the Google Geocoder to geocode the address
                      geocoder.geocode(address, function(err, data) {
                        
                      var address = data[0]
                      
                        // Depending on what information is available for an address, build formatted search
                        var search = address.city + ", " + address.stateCode
                        
                        // Run the weather package to search by either zip or city.
                        weather.find({ search: search, degreeType: "F" },function(err, result) {
                          // If there is insufficient data, notify the user.
                          if (err) {
                            console.log("\r\n\r\n\r\n");
                      
                            console.log("Sorry we don't have enough data on that location! Try somewhere else.");
                      
                            console.log("\r\n\r\n\r\n");
                      
                            return;
                          }
                
                    // Then print the Weather information and complete Address
                    console.log("\r\n\r\n\r\n");
                
                    console.log("Weather Forecast for: " + search);
                
                    console.log("Current Temperature: " + result[0].current.temperature + "° F");
                
                    console.log("Sky: " + result[0].current.skytext);
                
                    console.log(
                      "Tomorrow's Forecast: Low of " +
                        result[0].forecast[1].low +
                        "° F | High of " +
                        result[0].forecast[1].high +
                        "° F"
                    );
                
                    console.log("\r\n\r\n\r\n");
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
                  });
                });
              })}          
          })  
              }).catch(function (error) {
                console.error(error);
              });
              
              }
            })    
        })}
      })   
     })
})