FROM node:10-alpine


# Create app directory
WORKDIR /usr/src/app

# Install dependencies
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
