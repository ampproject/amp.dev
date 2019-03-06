FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
