/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer();

// eslint-disable-next-line new-cap
const examples = express.Router();
const US_CAPITAL_CITIES = [
  'Montgomery, Alabama',
  'Juneau, Alaska',
  'Phoenix, Arizona',
  'Little Rock, Arkansas',
  'Sacramento, California',
  'Denver, Colorado',
  'Hartford, Connecticut',
  'Dover, Delaware',
  'Tallahassee, Florida',
  'Atlanta, Georgia',
  'Honolulu, Hawaii',
  'Boise, Idaho',
  'Springfield, Illinois',
  'Indianapolis, Indiana',
  'Des Moines, Iowa',
  'Topeka, Kansas',
  'Frankfort, Kentucky',
  'Baton Rouge, Louisiana',
  'Augusta, Maine',
  'Annapolis, Maryland',
  'Boston, Massachusetts',
  'Lansing, Michigan',
  'Saint Paul, Minnesota',
  'Jackson, Mississippi',
  'Jefferson City, Missouri',
  'Helena, Montana',
  'Lincoln, Nebraska',
  'Carson City, Nevada',
  'Concord, New Hampshire',
  'Trenton, New Jersey',
  'Santa Fe, New Mexico',
  'Albany, New York',
  'Raleigh, North Carolina',
  'Bismarck, North Dakota',
  'Columbus, Ohio',
  'Oklahoma City, Oklahoma',
  'Salem, Oregon',
  'Harrisburg, Pennsylvania',
  'Providence, Rhode Island',
  'Columbia, South Carolina',
  'Pierre, South Dakota',
  'Nashville, Tennessee',
  'Austin, Texas',
  'Salt Lake City, Utah',
  'Montpelier, Vermont',
  'Richmond, Virginia',
  'Olympia, Washington',
  'Charleston, West Virginia',
  'Madison, Wisconsin',
  'Cheyenne, Wyoming',
];
const US_CAPITAL_CITIES_RICH = [
  {
    'city': 'Albany',
    'state': 'New York',
    'areaCode': 518,
    'population': 98251,
  },
  {
    'city': 'Annapolis',
    'state': 'Maryland',
    'areaCode': 410,
    'population': 39321,
  },
  {
    'city': 'Trenton',
    'state': 'New Jersey',
    'areaCode': 609,
    'population': 84964,
  },
];
const CHARACTERS = [
  {'email': 'harrypotter@hogwarts.edu', 'name': 'Harry Potter'},
  {
    'email': 'albusdumbledore@hogwarts.edu',
    'name': 'Albus Dumbledore',
  },
  {
    'email': 'voldemort@deatheater.org',
    'name': 'Tom Marvolo Riddle',
  },
  {'email': 'severussnape@hogwarts.edu', 'name': 'Severus Snape'},
  {'email': 'siriusblack@hogwarts.edu', 'name': 'Sirius Black'},
  {
    'email': 'hermionegranger@hogwarts.edu',
    'name': 'Hermione Granger',
  },
  {'email': 'ronweasley@hogwarts.edu', 'name': 'Ron Weasley'},
  {'email': 'dracomalfoy@hogwarts.edu', 'name': 'Draco Malfoy'},
  {
    'email': 'nevillelongbottom@hogwarts.edu',
    'name': 'Neville Longbottom',
  },
  {'email': 'rubeushagrid@hogwarts.edu', 'name': 'Rubeus Hagrid'},
  {'email': 'dobby@hogwarts.edu', 'name': 'Dobby'},
  {
    'email': 'bellatrixlestrange@deatheater.org',
    'name': 'Bellatrix Lestrange',
  },
  {
    'email': 'minervamcgonagall@hogwarts.edu',
    'name': 'Minerva McGonagall',
  },
];

examples.get('/autosuggest/search_list', upload.none(), handleSearchRequest);
examples.get('/autosuggest/cities', upload.none(), handleCitySearchRequest);
examples.get(
  '/autosuggest/characters',
  upload.none(),
  handleCharacterSearchRequest
);
examples.post('/autosuggest/address', upload.none(), handleAddressRequest);

function handleSearchRequest(request, response) {
  const query = request.query ? request.query.q : '';
  const results = US_CAPITAL_CITIES.filter((key) =>
    key.toUpperCase().includes(query.toUpperCase())
  );
  response.json({items: results});
}

function handleCitySearchRequest(request, response) {
  const query = request.query ? request.query.q : '';
  const results = US_CAPITAL_CITIES_RICH.filter(
    (key) =>
      key.city.toUpperCase().includes(query.toUpperCase()) ||
      key.state.toUpperCase().includes(query.toUpperCase())
  );
  response.json({items: results});
}

function handleCharacterSearchRequest(request, response) {
  const query = request.query ? request.query.q : '';
  const results = CHARACTERS.filter((key) =>
    key.name.toUpperCase().includes(query.toUpperCase())
  );
  response.json({items: results});
}

function handleAddressRequest(request, response) {
  const city = request.body ? request.body.city : '';
  let result;

  if (US_CAPITAL_CITIES.includes(city)) {
    result = `Success! Your package is on it's way to ${city}.`;
  } else {
    result = `Sorry! We don't ship to ${city}.`;
  }

  response.json({
    result,
  });
}

module.exports = examples;
