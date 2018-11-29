const signale = require('signale');
const fs = require('fs');
const path = require('path');

const CONFIG_BASE_PATH = '../config';
const GROW_CONFIG_TEMPLATE_PATH = `${CONFIG_BASE_PATH}/templates/podspec.yaml`;
const GROW_CONFIG_DEST = '../../pages/podspec.yaml';
const GROW_OUT_DIR = '../platform/pages';

class Config {

  constructor(environment = 'development') {
    const environmentConfig = require(`${CONFIG_BASE_PATH}/environments/${environment}.json`);

    this.environment = environment;
    this.hosts = environmentConfig.hosts;

    // Import the configs for importing stuff - basically only used in
    // platform/lib/pipeline/import/reference.js

    // Synchronously write podspec for Grow to run flawlessly later in pipeline.
    // Check if running inside GAE as writes are not permitted there
    if (!process.env.GAE_SERVICE) {
      this._writeGrowConfig();
    }
  }

  _writeGrowConfig() {
    let template = fs.readFileSync(path.join(__dirname, GROW_CONFIG_TEMPLATE_PATH));
    let podspec = `${template}\n`
                + `env:\n`
                + `  name: ${this.environment}\n`
                + `  host: ${this.hosts.pages.host}\n`
                + `  port: ${this.hosts.pages.port}\n`
                + `  scheme: ${this.hosts.pages.scheme}\n`
                + `\n`
                + `deployments:\n`
                + `  default:\n`
                + `    name: default\n`
                + `    destination: local\n`
                + `    out_dir: ${GROW_OUT_DIR}\n`
                + `    env:\n`
                + `      name: ${this.environment}\n`
                + `      host: ${this.hosts.pages.host}\n`
                + `      port: ${this.hosts.pages.port}\n`
                + `      scheme: ${this.hosts.pages.scheme}`;

    fs.writeFileSync(path.join(__dirname, GROW_CONFIG_DEST), podspec);
    signale.info(`Wrote podspec to ${GROW_CONFIG_DEST}`);
  }
}

let config = new Config(process.env.NODE_ENV);

module.exports = config;
