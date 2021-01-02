// const credential = require('./credential.js');
//
// (async () => {
//     const myCloud = await credential();
//     //console.log(myCloud);
//     var events = await myCloud.Calendar.getEvents("2018-11-01", "2018-11-30");
//     console.log(events)
// })();
//
// console.log('hello')

const iCloud = require('apple-icloud');
const prompt = require("prompt");

var session = {};
var username = "";
var password = "";

var myCloud = new iCloud(session, username, password);

// Handles the requirement of two-factor-authentication
async function readyHandlerTwoFactor(myCloud) {

  if (myCloud.twoFactorAuthenticationIsRequired) {
    prompt.get(["Security Code"], function(err, input) {
      if (err) return console.error(err);
      const code = input["Security Code"];
      myCloud.securityCode = code;
    });
    return false;
  }
  else {
    console.log("You are logged in successfully!");

    return true;
  }

}


//console.log(prompt);
myCloud.login(username, password, function(){
    console.log('hello, world');


    // let question = {
    //     type: "text",
    //     name: "security_code",
    //     message: "type in the security code"
    // }

    const needsSecurityCode = myCloud.twoFactorAuthenticationIsRequired;

    if (needsSecurityCode){
        console.log('type!');
        prompt.get(['security code'], async function(err, input){
            if (err) return console.error(err);
            const code = input["security code"];
            myCloud.securityCode = code;
            //myCloud.sendSecurityCode("sms");
            var events = await myCloud.Calendar.getEvents("2020-07-15", "2020-12-31");
            console.log(events);

        })
        // ( async() => {
        //     var events = await myCloud.Calendar.getEvents("2020-07-15", "2020-12-31");
        //     console.log(events);
        // })();

    }else{
        console.log('no!')
    }
})

//(async ()=>{
//    const collections = await myCloud.Calendar.getCollections();
//    console.log(collections);
//})();
//
