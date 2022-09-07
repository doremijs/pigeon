/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  'admin/*.{js,ts,tsx}': ['eslint . --fix'],
  'admin/*.{css,less,styl,scss,sass}': ['stylelint --fix'],
  'server/*.{js,ts}': ['eslint . --fix']
}
