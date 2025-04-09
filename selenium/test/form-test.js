// Practice Form Automation with Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Practice Form Automation', function() {
  // Increase timeout for async tests
  this.timeout(60000);
  
  let driver;

  before(async function() {
    try {
      console.log('Setting up ChromeDriver...');
      
      // Set up Chrome options
      const options = new chrome.Options();
      options.addArguments('--disable-extensions');
      options.addArguments('--disable-gpu');
      options.addArguments('--no-sandbox');
      
      // Specify the path to your ChromeDriver
      const chromeDriverPath = 'C:\\Users\\Mateo\\Desktop\\chromedriver-win64\\chromedriver.exe';
      console.log('Using ChromeDriver from:', chromeDriverPath);
      
      // Set the system property for ChromeDriver
      process.env.PATH = `${path.dirname(chromeDriverPath)}${path.delimiter}${process.env.PATH}`;
      console.log('Updated PATH environment variable');
      
      // Initialize the driver with the environment variable set
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      
      console.log('WebDriver initialized successfully');
      
      // Set implicit wait time
      await driver.manage().setTimeouts({ implicit: 10000 });
      
      // Maximize window
      await driver.manage().window().maximize();
      
      // Visit the page
      console.log('Navigating to the form page...');
      await driver.get('https://demoqa.com/automation-practice-form');
      console.log('Page loaded');

      // Execute script to remove ads/footer that might block clicks
      await driver.executeScript('document.querySelector("footer") && document.querySelector("footer").remove();');
      await driver.executeScript('document.querySelector("#fixedban") && document.querySelector("#fixedban").remove();');
    } catch (error) {
      console.error('Error in before hook:', error);
      throw error;
    }
  });

  after(async function() {
    // Close the driver after all tests
    if (driver) {
      try {
        await driver.quit();
        console.log('WebDriver closed successfully');
      } catch (error) {
        console.error('Error closing WebDriver:', error);
      }
    }
  });

  it('Should fill name fields', async function() {
    try {
      await driver.findElement(By.id('firstName')).sendKeys('John');
      await driver.findElement(By.id('lastName')).sendKeys('Doe');
      
      // Verify the name fields contain the expected values
      const firstName = await driver.findElement(By.id('firstName')).getAttribute('value');
      const lastName = await driver.findElement(By.id('lastName')).getAttribute('value');
      
      assert.strictEqual(firstName, 'John');
      assert.strictEqual(lastName, 'Doe');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should fill email field', async function() {
    try {
      await driver.findElement(By.id('userEmail')).sendKeys('john.doe@example.com');
      
      // Verify the email field contains the expected value
      const email = await driver.findElement(By.id('userEmail')).getAttribute('value');
      assert.strictEqual(email, 'john.doe@example.com');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should select gender', async function() {
    try {
      await driver.findElement(By.css('label[for="gender-radio-1"]')).click();
      
      // Verify the gender radio button is selected
      const isSelected = await driver.executeScript(
        "return document.getElementById('gender-radio-1').checked"
      );
      assert.strictEqual(isSelected, true);
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should fill mobile number', async function() {
    try {
      await driver.findElement(By.id('userNumber')).sendKeys('1234567890');
      
      // Verify the mobile field contains the expected value
      const mobile = await driver.findElement(By.id('userNumber')).getAttribute('value');
      assert.strictEqual(mobile, '1234567890');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should select date of birth', async function() {
    try {
      await driver.findElement(By.id('dateOfBirthInput')).click();
      const yearSelect = await driver.findElement(By.className('react-datepicker__year-select'));
      await yearSelect.click();
      await yearSelect.findElement(By.css('option[value="2025"]')).click();
      
      const monthSelect = await driver.findElement(By.className('react-datepicker__month-select'));
      await monthSelect.click();
      await monthSelect.findElement(By.css('option[value="3"]')).click(); // April is index 3
      
      await driver.findElement(By.css('.react-datepicker__day--008')).click();
      
      // Verify the date was selected
      const dateValue = await driver.findElement(By.id('dateOfBirthInput')).getAttribute('value');
      assert.ok(dateValue.includes('08 Apr 2025'));
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should add subject', async function() {
    try {
      const subjectInput = await driver.findElement(By.id('subjectsInput'));
      await subjectInput.sendKeys('Math');
      await subjectInput.sendKeys(Key.ENTER);
      
      // Verify the subject was added
      const subjectText = await driver.findElement(By.css('.subjects-auto-complete__multi-value__label')).getText();
      assert.strictEqual(subjectText, 'Maths');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should select hobbies', async function() {
    try {
      await driver.findElement(By.css('label[for="hobbies-checkbox-1"]')).click(); // Sports
      await driver.findElement(By.css('label[for="hobbies-checkbox-2"]')).click(); // Reading
      
      // Verify the hobbies are checked
      const isSportsSelected = await driver.executeScript(
        "return document.getElementById('hobbies-checkbox-1').checked"
      );
      const isReadingSelected = await driver.executeScript(
        "return document.getElementById('hobbies-checkbox-2').checked"
      );
      
      assert.strictEqual(isSportsSelected, true);
      assert.strictEqual(isReadingSelected, true);
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should upload a file', async function() {
    try {
      const filePath = path.resolve(__dirname, './dr.png');
      console.log('File path:', filePath);
      await driver.findElement(By.id('uploadPicture')).sendKeys(filePath);
      
      // Verify the file was uploaded
      const fileName = await driver.findElement(By.id('uploadPicture')).getAttribute('value');
      assert.ok(fileName.length > 0);
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

  it('Should enter current address', async function() {
    try {
      await driver.findElement(By.id('currentAddress')).sendKeys('123 Cypress Lane');
      
      // Verify the address field contains the expected value
      const address = await driver.findElement(By.id('currentAddress')).getAttribute('value');
      assert.strictEqual(address, '123 Cypress Lane');
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
});