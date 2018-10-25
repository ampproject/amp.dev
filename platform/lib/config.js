const log = require('loglevel');
const fs = require('fs');
const path = require('path');

const CONFIG_BASE_PATH = '../config';
const GROW_CONFIG_TEMPLATE_PATH = `${CONFIG_BASE_PATH}/templates/podspec.yaml`;
const GROW_CONFIG_DEST = '../../pages/podspec.yaml';
const GROW_OUT_DIR = '../platform/pages';

class Config {

  constructor(environment = 'development') {
    const config = require(`${CONFIG_BASE_PATH}/${environment}`);

    // Set log level for the overall application
    log.setLevel(config.logLevel);

    this.environment = environment;
    this.hosts = config.hosts;
  }

  writeGrowConfig() {
    let template = fs.readFileSync(path.join(__dirname, GROW_CONFIG_TEMPLATE_PATH));
    let podspec = `${template}\n`
                + `env:\n`
                + `  name: ${config.environment}\n`
                + `  host: ${config.hosts.pages.host}\n`
                + `  port: ${config.hosts.pages.port}\n`
                + `  scheme: ${config.hosts.pages.scheme}\n`
                + `\n`
                + `deployments:\n`
                + `  default:\n`
                + `    name: default\n`
                + `    destination: local\n`
                + `    out_dir: ${GROW_OUT_DIR}\n`
                + `    env:\n`
                + `      name: ${config.environment}\n`
                + `      host: ${config.hosts.pages.host}\n`
                + `      port: ${config.hosts.pages.port}\n`
                + `      scheme: ${config.hosts.pages.scheme}`;

    fs.writeFileSync(path.join(__dirname, GROW_CONFIG_DEST), podspec);
    log.debug(`Wrote podspec to ${GROW_CONFIG_DEST}`);
  }
}

let config = new Config(process.env.NODE_ENV);
config.writeGrowConfig();

module.exports = config;
