FROM python:3.7.9-slim-buster
ENV PYTHONUNBUFFERED 1

RUN \
  apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
  build-essential \
  git \  
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
RUN npm i

COPY . /amp-dev/

RUN ls

EXPOSE 80 8080
ENV NODE_ENV=local
ENTRYPOINT ["npx", "gulp", "run"]