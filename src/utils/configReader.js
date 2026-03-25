const fs = require('fs');
const path = require('path');

class ConfigReader {
  constructor() {
    this.configPath = path.join(__dirname, '../config/testData.json');
    this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
  }

  getBaseUrl() {
    return this.config.baseUrl;
  }

  getUser(type) {
    return this.config.users[type];
  }

  getProduct(name) {
    return this.config.products[name];
  }

  getCheckoutData(type) {
    return this.config.checkout[type];
  }
}

module.exports = ConfigReader;