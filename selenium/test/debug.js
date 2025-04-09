// Create a file named debug-driver.js
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testDriver() {
  try {
    console.log('Starting driver test...');
    const driver = await new Builder().forBrowser('chrome').build();
    console.log('Driver created successfully');
    await driver.quit();
  } catch (error) {
    console.error('Error:', error);
  }
}

testDriver();