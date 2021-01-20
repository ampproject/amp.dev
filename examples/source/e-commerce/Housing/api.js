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

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.get('/calculate-mortgage', (request, response) => {
  response.status(400).end();
});
examples.get('/calculate-mortgage-xhr', (request, response) => {
  const mortgageForm = parseMortgageForm(request);
  const monthlyPayment = calculateMonthlyPayment(mortgageForm);

  response.json({
    monthly_repayment: `£${monthlyPayment}`,
  });
});

function calculateMonthlyPayment(mortgageForm = {}) {
  const monthlyInterestRateDecimal = mortgageForm.interest / 12 / 100;
  const numberOfMonthlyPayments = mortgageForm.period * 12;
  const amountBorrowed = mortgageForm.price - mortgageForm.deposit;
  // eslint-disable-next-line max-len
  return (
    (monthlyInterestRateDecimal *
      amountBorrowed *
      Math.pow(1 + monthlyInterestRateDecimal, numberOfMonthlyPayments)) /
    (Math.pow(1 + monthlyInterestRateDecimal, numberOfMonthlyPayments) - 1)
  ).toFixed(2);
}

function parseMortgageForm(request) {
  const price = Number(request.query.price);
  const deposit = Number(request.query.deposit);
  const interest = Number(request.query.annual_interest);
  const period = Number(request.query.repayment_period);

  return {
    price,
    deposit,
    interest,
    period,
  };
}

module.exports = examples;
