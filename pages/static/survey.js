const c = document.createElement.bind(document);
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('#fez');
const dismiss = $('.ap-a-ico');

const _safe = function (str) {
  return str.replace(/ /g, '_').replace(/[^a-zA-Z]/g, '');
};

function Fez(data) {
  if (data === null) {
    throw new Error(
      'Surveys must have an <amp-state> element, with the ID "surveyQuestions"'
    );
  }

  try {
    this.questions = this.validate(data);
    this.name = data.survey;
    this.url = data._url;
    this.shownAt = new Date().toISOString();
  } catch (e) {
    throw new Error(e);
  }

  this.init();
}

Fez.prototype._questionTypes = [
  'likert',
  'multiple',
  'open',
  'rating',
  'single',
];

Fez.prototype.validate = function (data) {
  if (!Array.isArray(data.questions)) {
    throw new Error('Survey data must include questions');
  }

  data.questions.forEach((q) => {
    if (typeof q.text !== 'string') {
      throw new Error('Survey questions must include a `text` field');
    }
    if (typeof q.type !== 'string') {
      throw new Error('Survey questions must include a `type` field');
    }
    if (this._questionTypes.indexOf(q.type) === -1) {
      throw new Error(q.type + ' is not a valid survey question type');
    }
  });

  return data.questions;
};

Fez.prototype.init = function () {
  const answerExpiration = localStorage.getItem(`survey_${this.name}`);
  const surveyTimestamp = parseInt(answerExpiration);

  // if the answer expired, or there is no saved answer
  // (and is therefore a NaN when parsed)...
  if (Number.isNaN(surveyTimestamp) || Date.now() > new Date(surveyTimestamp)) {
    localStorage.removeItem(`survey_${this.name}`);

    this.build();
  }
};

Fez.prototype._attachListeners = function () {
  const inputs = [...$$('[type=radio]'), ...$$('[type=button]')];

  inputs.forEach((e) => {
    e.addEventListener('click', (e) => {
      const el = e.target;
      let card = el;

      while (card && !card.classList.contains('active')) {
        card = card.parentNode;
      }

      const index = card.parentNode.children.indexOf(card);
      const question = this.questions[index];

      if (question.type === 'likert' || question.type === 'rating') {
        question.answer = el.nextSibling.textContent;
      } else if (question.type === 'open') {
        question.answer = card.querySelector('textarea').value;
      }

      this.nextSlide();
    });
  });

  dismiss.addEventListener('click', this.submit);

  setTimeout(this.nextSlide, 500);
};

Fez.prototype.nextSlide = async function () {
  const cards = form.querySelectorAll('.slide');
  const currentCard = form.querySelector('.active');
  let currentIndex = cards.indexOf(currentCard);
  const nextIndex = (currentIndex += 1);

  if (nextIndex < cards.length) {
    if (currentCard) {
      currentCard.classList.remove('active');
    }

    cards[nextIndex].classList.add('active');

    if (nextIndex === cards.length - 1) {
      dismiss.classList.add('hide');
      this.submit();
    }
  }

  const {height} = await cards[nextIndex].getBoundingClientRectAsync();

  form.style.height = `${height}px`;
};

Fez.prototype.submit = async function (dismissed) {
  $('#fez').style.height = 0;

  try {
    fetch(`${self.location.origin}/fez-survey-response`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'survey': this.name,
        'questions': this.questions,
        'url': this.url,
        'shownAt': `${this.shownAt}`,
        dismissed,
      }),
    });
  } catch (e) {
    // we don't actually care if there are errors at this point
    // they will show up in the server logs, and we don't want
    // to show any error to the end user.
  }

  // store the fact we replied to the survey for 4 weeks
  localStorage.setItem(
    `survey_${this.name}`,
    Date.now(this.shownAt) + 1000 * 60 * 60 * 24 * 28
  );

  this.remove(dismissed);
};

Fez.prototype.remove = function (dismissed) {
  form.style.height = 0;
  setTimeout(
    () => {
      form.parentNode.innerHTML = '';
    },
    dismissed ? 0 : 2500
  );
};

Fez.prototype.build = function () {
  const slides = $('.slides');
  const thanks = $('.thanks').parentNode;

  this.questions.forEach((q, i) => {
    slides.insertBefore(new FezSlide(q, i), thanks);
  });

  this._attachListeners();
};

function FezSlide(data, index) {
  const wrap = c('div');
  const question = c('p');

  wrap.classList.add('slide');
  question.classList.add('surveyQuestion');

  wrap.appendChild(question);
  question.textContent = data.text;

  if (data.type === 'rating' || data.type === 'likert') {
    const ul = c('ul');
    const values = data.values || [
      'Strongly Agree',
      'Agree',
      'Neutral',
      'Disagree',
      'Strongly Disagree',
    ];

    values.forEach((v) => {
      const li = c('li');
      const rating = c('input');
      const label = c('label');

      rating.type = 'radio';

      li.appendChild(rating);
      rating.name = _safe(data.text);
      rating.value = _safe(v);
      rating.id = label.htmlFor = `survey_card_${index}_${_safe(v)}`;

      label.textContent = v;

      li.appendChild(label);

      ul.appendChild(li);
    });

    wrap.appendChild(ul);
  }

  if (data.type === 'open') {
    const textarea = c('textarea');

    wrap.appendChild(textarea);

    const buttonWrapper = c('div');

    buttonWrapper.className = 'buttons';

    const skip = c('button');
    const submit = c('button');

    skip.type = submit.type = 'button';

    skip.className = 'button-negative';
    submit.className = 'button-affirm';

    skip.textContent = 'Nope!';
    submit.textContent = 'Submit';

    buttonWrapper.appendChild(skip);
    buttonWrapper.appendChild(submit);

    wrap.appendChild(buttonWrapper);
  }

  this.toString = function () {
    return wrap.outerHTML;
  };

  return wrap;
}

AMP.getState('surveyQuestions').then((data) => new Fez(JSON.parse(data)));
