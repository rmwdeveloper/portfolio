require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Robert Westenberger',
    description: 'Portfolio of Robert Westenberger - Full Stack Web Developer',
    head: {
      titleTemplate: 'Robert Westenberger',
      meta: [
        {name: 'description', content: 'Portfolio of Robert Westenberger - Full Stack Web Developer'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Robert Westenberger'},
        {property: 'og:description', content: 'Portfolio of Robert Westenberger - Full Stack Web Developer'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@rmwdeveloper'},
        {property: 'og:creator', content: '@rmwdeveloper'}
      ]
    }
  },

}, environment);
