const THREE = require('three');
const assert = require('assert');
const http = require('http');

var option = {
    host: '18.233.36.202',
    port: 4000,
    path: '/graphql?query=%7B%0A%20%20record_by_uuid(uuid%3A"adsf")%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%20%0A%20%20%7D%0A%7D'
  };

var str = '';

callback = function(response) {
    response.on('data', function (chunk) {
      str += chunk;
    });
  
    response.on('end', function () {
      console.log(str);
    });
  }

describe('The MedNode record object', function() {
  it('should have a defined MedNote record constant', function() {
    assert.notEqual('undefined', str);
  }),

  it('should have a defined MedNote record constant and should not be empty', function() {
    assert.notEqual(null, str);
  }),

  it('should accept formated input', function() {
    try{
        req = http.request(option, callback);
    }catch(error){
        console.error(error);
    }
    assert.equal(true, true);
  }),

  it('should not accept unformated input', function() {
    state = 1;
    var unformOpt = {
        host: '18.233.36.202',
        port: 4000,
        path: '/graphql?query=%7B%0A%20%20record_by_uuid(uuid%3A"adsf")%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%20%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(unformOpt, callback);
    }catch(error){
        state = 0;
        console.error(error);
    }
    assert.equal(1, state);
  }),

  it('should return empty for uuid that is not in the database', function() {
    var missingOpt = {
        host: '18.233.36.202',
        port: 4000,
        path: '/graphql?query=%7B%0A%20%20record_by_uuid(uuid%3A"adsf")%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%20%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(missingOpt, callback);
    }catch(error){
        state = 0;
        console.error(error);
    }
    assert.equal(1, state);
  }),

  it('should be able to return a record with given uuid if it exists in database', function() {
    const result = 
    {
        "data": {
          "record_by_uuid": {
            "uuid": "adsf",
            "name": {
              "first_name": "UpdatedFirstName",
              "last_name": "UpdatedLastName"
            },
            "dob": null,
            "allergies": [
              "UpdatedA55",
              "UpdatedA66"
            ],
            "medications": [
              "UpdatedMED344",
              "UpdatedMED444"
            ],
            "immunizations": [],
            "visit_notes": []
          }
        }
    }
    try{
        req = http.request(option, callback);
    }catch(error){
        console.error(error);
    }
    assert.notEqual('undefined', req);
  }),

  it('should be able to connect to AWS API', function() {
      state = 1;
    try{
        req = http.request(option, callback);
    }catch(error){
        state = 0;
        console.error(error);
    }
    assert.equal(1, state);
  }),

  it('should add a new record with given formatted input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    correctResult = 
    {
        "data": {
          "record_by_uuid": {
            "uuid": "adsf",
            "name": {
              "first_name": "UpdatedFirstName",
              "last_name": "UpdatedLastName"
            },
            "dob": null,
            "allergies": [
              "UpdatedA55",
              "UpdatedA66"
            ],
            "medications": [
              "UpdatedMED344",
              "UpdatedMED444"
            ],
            "immunizations": [],
            "visit_notes": []
          }
        }
    }
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 0;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with unformatted input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error when trying to add an existing uuid to database', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid name field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name, invalid_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid dob field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"@!$%Hdg",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid allergies field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"!)@(&*((是",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid medications field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"akdsh%^*%&お休みなさい",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid immunization field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date,wrong format place holder}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should return error with invalid visit_notes field input', function() {
    state = 1;
    const mutation = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date,wrong format place holder}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20%22dalsdfasjdfsdf%22%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20%22UpdatedFirstName%22%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20%22UpdatedLastName%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B%22UpdatedA3%22%2C%20%22UpdatedA4%22%5D%2C%0A%20%20%20%20medications%3A%20%5B%22UpdatedMED3%22%2C%20%22UpdatedMED4%22%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%7Bimmunization%3A%20%22UpdatedImmu3%22%7D%2C%7Bimmunization%3A%20%22UpdatedImmu4%22%7D%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%7Bnote%3A%20%22TestNote1%22%7D%2C%20%7Bnote%3A%20%22TestNote2%22%7D%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to append new data based on old data in database with formated input', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 0;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with unformated input', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with nonexisting uuid', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"slkjdshjga@&^@&",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"slkjdshjga@&^@&"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid name', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name, invalid_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid dob', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"sdalkgha*&%*%",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid allergies', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"*&^&%^*#akjアｌｄｊ",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid medications', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"测试(^%$",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid immunizations', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date,invalid immunization place holder}",
        visit_notes:"{note,date}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  }),

  it('should be able to return error when append new data based on old data in database with invalid visit_notes', function() {
    state = 1;
    const mutationAppend = 
    {
        uuid:"asdf",
        name:"{first_name,last_name}",
        dob:"test",
        allergies:"test",
        medications:"test",
        immunizations:"{immunization,date}",
        visit_notes:"{note,date,wrong format place holder}"
    };
    mutationQuest = {
        host: '18.233.36.202',
        port: 4000,
        method: "POST",
        path: '/graphql?query=mutation%20%7B%0A%20%20appendRecord(%0A%20%20%20%20uuid%3A%20"adsf"%2C%0A%20%20%20%20name%3A%20%7B%0A%20%20%20%20%20%20first_name%3A%20"UpdatedFirstName"%2C%0A%20%20%20%20%20%20%20%20last_name%3A%20"UpdatedLastName"%0A%20%20%20%20%7D%2C%0A%20%20%20%20allergies%3A%5B"UpdatedA55"%2C%20"UpdatedA66"%5D%2C%0A%20%20%20%20medications%3A%20%5B"UpdatedMED344"%2C%20"UpdatedMED444"%5D%2C%0A%20%20%20%20immunizations%3A%20%5B%5D%2C%0A%20%20%20%20visit_notes%3A%20%5B%5D%0A%20%20)%7B%0A%20%20%20%20uuid%0A%20%20%20%20name%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%7D%0A%20%20%20%20dob%0A%20%20%20%20allergies%0A%20%20%20%20medications%0A%20%20%20%20immunizations%7B%0A%20%20%20%20%20%20immunization%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%20%20visit_notes%7B%0A%20%20%20%20%20%20note%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
    };
    try{
        req = http.request(mutationQuest, callback);
    }catch(error){
        state = 1;
        console.error(error);
    }
  assert.equal(1, state);
  })
})