import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = require('./config.js');

const mode = process.argv.mode || 'production';
const apiKey = process.env.AMP_DEV_PIXI_APIS_KEY;

export default {
  input: 'src/Cli.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      IS_DEVELOPMENT: mode !== 'production',
      API_ENDPOINT_LINTER: JSON.stringify(config[mode].API_ENDPOINT_LINTER),
      API_ENDPOINT_LINTER_CANARY: JSON.stringify(
        config[mode].API_ENDPOINT_LINTER_CANARY
      ),
      API_ENDPOINT_SAFE_BROWSING: JSON.stringify(
        config[mode].API_ENDPOINT_SAFE_BROWSING
      ),
      API_ENDPOINT_PAGE_SPEED_INSIGHTS: JSON.stringify(
        config[mode].API_ENDPOINT_PAGE_SPEED_INSIGHTS
      ),
      API_ENDPOINT_MOBILE_FRIENDLINESS: JSON.stringify(
        config[mode].API_ENDPOINT_MOBILE_FRIENDLINESS
      ),
      AMP_DEV_PIXI_APIS_KEY: JSON.stringify(apiKey),
    }),
  ],
};
