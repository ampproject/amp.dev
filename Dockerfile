FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make vips-dev python3 tini git
RUN npm install --quiet node-gyp -g
# Add Tini
ENTRYPOINT ["/sbin/tini", "--"]

# Bundle app source
COPY . .

# Install app dependencies
RUN npm ci

EXPOSE 80 8080
CMD ["/bin/sh"]
