/**
 * @jest-environment jsdom
 */

const {createEmailLoader} = require('./email-loader.js');

describe('EmailLoader', () => {
  let emailLoader = null;
  let setSourceMock = null;

  beforeEach(() => {
    setSourceMock = jest.fn();
    emailLoader = createEmailLoader({
      setSource: setSourceMock,
    });
  });

  test('throws when email is not multipart', () => {
    expect(() => {
      emailLoader.loadEmail(`
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: Test
Content-Type: text/plain

Hello World in plain text!
    `);
    }).toThrow();
  });

  test('throws when email has no AMP part', () => {
    expect(() => {
      emailLoader.loadEmail(`
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: Test
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/html

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
    `);
    }).toThrow();
  });

  test('parses valid email', () => {
    const ampPart = emailLoader.loadEmail(`
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; charset="utf-8"; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
    `);
    expect(ampPart).toBe(`<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
`);
  });
});
