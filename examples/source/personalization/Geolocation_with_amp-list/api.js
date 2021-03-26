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
const fetch = require('node-fetch');
const credentials = require('@lib/utils/credentials');

// eslint-disable-next-line new-cap
const examples = express.Router();

const IPSTACK_API_KEY = 'ipstack_api_key';
const GEONAMES_USERNAME = 'geonames_username';
const IPSTACK_API_URL = 'http://api.ipstack.com/';
const GEONAMES_API_URL = 'http://api.geonames.org/findNearbyPostalCodesJSON';

examples.get('/location-specific-results.json', async (request, response) => {
  const ipstackCredential = await credentials.get(IPSTACK_API_KEY);
  let ip =
    request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  ip = ip.split(',')[0];

  let ipstackResponse;
  let geonamesResponse;

  try {
    ipstackResponse = await fetch(
      IPSTACK_API_URL + ip + '?access_key=' + ipstackCredential
    );
    ipstackResponse = await ipstackResponse.json();
  } catch (err) {
    response.status(500).send('Error fetching ipstack data.');
  }

  const geonamesCredential = await credentials.get(GEONAMES_USERNAME);
  const geoNamesSearchParams = new URLSearchParams({
    maxRows: 150,
    lat: ipstackResponse.latitude,
    lng: ipstackResponse.longitude,
    username: geonamesCredential,
  }).toString();

  try {
    geonamesResponse = await fetch(
      GEONAMES_API_URL + '?' + geoNamesSearchParams
    );
    geonamesResponse = await geonamesResponse.json();
  } catch (err) {
    response.status(500).send('Error fetching geonames data.');
  }

  const existingPlaceNames = {};
  const places = geonamesResponse.postalCodes.filter((place) => {
    if (
      !(place.placeName in existingPlaceNames) &&
      Object.keys(existingPlaceNames).length < 5
    ) {
      existingPlaceNames[place.placeName] = true;
      return true;
    }
  });

  // ipstack is supposed to return data.city, but sometimes doesn't
  const location = ipstackResponse.city || places[0].placeName;

  response.json({
    location,
    results: places,
  });
});

module.exports = examples;
