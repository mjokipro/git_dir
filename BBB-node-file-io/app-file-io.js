const faker = require('faker');
const fs = require('fs');
const _ = require('lodash');

//define the headers of your csv file.
//define the object literal that would store the functions for each index
//faker generates new data for every call
let csvHeaders = {
    FIRST_NAME: faker.name.firstName(),
    LAST_NAME: faker.name.lastName(),
    STREET_ADDRESS: faker.address.streetAddress(),
    CITY: faker.address.city(),
    STATE: faker.address.state(),
    ZIP_CODE: faker.address.zipCode(),
    COUNTRY: faker.address.country(),
    VOICE_NUMBER: faker.phone.phoneNumber(),
    EMAIL_ADDRESS: faker.internet.email(),
}

// open write stream
let stream = fs.createWriteStream("huge-csv.csv");
// write the header line.
stream.write(Object.keys(csvHeaders).toString()+ "\n");

//write the body
let csvBody = [];
for (let i = 0; i < 1000; i++) {
    _.forEach(csvHeaders, function(value, key){
        //console.log(value);
        csvBody.push(value);
    })
    //console.log(csvBody.toString(), 'CSV BODY');
    stream.write(csvBody.toString()+ "\n");
    csvBody = [];


}
// close the stream
stream.end(); 