var inquirer = require("axios");
var inquierer = require ("inquirer");
inquierer.prompt([
{type: "input",
 message: "Welcome, please enter your name/username",
 name: "username"
},

{type: "password",
message: " Enter your password please, this is personal data here!",
name: "password",
},
 
{ type: "list",
choices: ["Would you like to search for COVID-19 stats by country?", "Would you like to check the weather in a certain country?"],
message: "What task would you like to perform?",
name: "userChoice"
},

])
 .then (function(inquirerResponse) {
    var userChoice = inquirerResponse.userChoice;
    if (userChoice === "Would you like to check the weather in a certain country?") {
        
        inquierer.prompt
        ([
        
            {type: "input",
             message: "Please insert a country.",
             name: "username"
            } 
            ,]) 
    } else if (userChoice === "Would you like to search for COVID-19 stats by country?")
           inquierer.prompt
              ([
                {type: "input",
                message: "Please insert a country you want to search.",
                name: "username"
                }
              ]); 

}) 