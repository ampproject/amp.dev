FROM python:3.7.9-slim-buster
ENV PYTHONUNBUFFERED 1

RUN \
  apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
  build-essential \
  git \
  libyaml-dev \  
  curl && \
  pip install -U pip && pip install grow && \
  rm -rf /var/lib/apt/lists/*

RUN \
  curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs && \
  npm i -g npm && \
  npm install -g gulp

RUN mkdir /amp-dev
WORKDIR /amp-dev/

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . /amp-dev/

RUN ls

EXPOSE 80 8080
WORKDIR /amp-dev/
ENV NODE_ENV=staging
CMD ["npx", "gulp", "--gulpfile", "gulpfile.js/run.js", "--cwd", ".", "run"]