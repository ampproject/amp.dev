const signale = require('signale');
const fs = require('fs');
const path = require('path');
const mri = require('mri');

const CONFIG_BASE_PATH = '../config';
const GROW_CONFIG_TEMPLATE_PATH = `${CONFIG_BASE_PATH}/templates/podspec.yaml`;
const GROW_CONFIG_DEST = '../../pages/podspec.yaml';
const GROW_OUT_DIR = '../platform/pages';

class Config {
  constructor(environment = 'development') {
    const environmentConfig = require(`${CONFIG_BASE_PATH}/environments/${environment}.json`);
    const sharedConfig = require(`${CONFIG_BASE_PATH}/shared.json`);

    this.environment = environmentConfig.name;
    this.hosts = environmentConfig.hosts;

    this.shared = sharedConfig;

    // Globally initialize command line arguments for use across all modules
    this.options = mri(process.argv.slice(2));

    // Synchronously write podspec for Grow to run flawlessly later in pipeline.
    // Check if running inside GAE as writes are not permitted there
    if (!process.env.GAE_SERVICE) {
      this._writeGrowConfig();
    }
  }

  /**
   * Helper method to make it possible to write absolute project paths
   * @return {String} an absolute ready to use path
   */
  path(relativePath) {
    return path.join(__dirname, '../../', relativePath);
  }

  /**
   * Builds a URL from a host object containing scheme, host and port
   * @return {[type]} [description]
   */
  _buildUrl(host) {
    let url = `${host.scheme}://${host.host}`;
    if (host.port) {
      url = url + `:${host.port}`;
    }

    return url;
  }

  _writeGrowConfig() {
    const template = fs.readFileSync(path.join(__dirname, GROW_CONFIG_TEMPLATE_PATH));
    const podspec = `${template}\n`
                + 'env:\n'
                + `  name: ${this.environment}\n`
                + `  host: ${this.hosts.pages.host}\n`
                + `  port: ${this.hosts.pages.port}\n`
                + `  scheme: ${this.hosts.pages.scheme}\n`
                + '\n'
                + 'base_urls:\n'
                + `  repository: ${this.shared.baseUrls.repository}\n`
                + `  playground: ${this.shared.baseUrls.playground}\n`
                + `  platform: ${this._buildUrl(this.hosts.platform)}\n`
                + `  api: ${this._buildUrl(this.hosts.api)}\n`
                + '\n'
                + 'deployments:\n'
                + '  default:\n'
                + '    name: default\n'
                + '    destination: local\n'
                + `    out_dir: ${GROW_OUT_DIR}\n`
                + '    env:\n'
                + `      name: ${this.environment}\n`
                + `      host: ${this.hosts.pages.host}\n`
                + `      port: ${this.hosts.pages.port}\n`
                + `      scheme: ${this.hosts.pages.scheme}`;

    fs.writeFileSync(path.join(__dirname, GROW_CONFIG_DEST), podspec);
    signale.info(`Wrote podspec to ${GROW_CONFIG_DEST}`);
  }
}

const config = new Config(process.env.NODE_ENV);

module.exports = config;
