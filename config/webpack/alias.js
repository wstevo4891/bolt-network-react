// config\webpack\alias.js

const path = require('path')

const APP_DIR = '../../app/javascript/main'

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, APP_DIR),

      '@components': path.resolve(__dirname, APP_DIR + '/components'),

      '@helpers': path.resolve(__dirname, APP_DIR + '/helpers'),

      '@services': path.resolve(__dirname, APP_DIR + '/services'),

      '@store': path.resolve(__dirname, APP_DIR + '/store')
    }
  }
}
