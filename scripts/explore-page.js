const { chromium } = require('@playwright/test');

async function explorePage() {
  const browser = await chromium.launch();
  const context = await browser.createContext({
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    console.log('\n=== STEP 1: Navigate to login page ===');
    await page.goto('https://111.119.245.10:20081/', { waitUntil: 'domcontentloaded' });
    
    // Take screenshot of login page
    await page.screenshot({ path: 'screenshots/01-login-page.png' });
    console.log('✓ Login page loaded');
    console.log('Page URL:', page.url());

    // Inspect login form elements
    console.log('\n=== LOGIN FORM INSPECTION ===');
    const inputs = await page.locator('input').all();
    console.log(`Found ${inputs.length} input fields`);
    
    for (let i = 0; i < inputs.length; i++) {
      const type = await inputs[i].getAttribute('type');
      const name = await inputs[i].getAttribute('name');
      const placeholder = await inputs[i].getAttribute('placeholder');
      const id = await inputs[i].getAttribute('id');
      console.log(`Input ${i}: type=${type}, name=${name}, placeholder=${placeholder}, id=${id}`);
    }

    // Inspect buttons
    const buttons = await page.locator('button').all();
    console.log(`\nFound ${buttons.length} buttons`);
    for (let i = 0; i < Math.min(5, buttons.length); i++) {
      const text = await buttons[i].textContent();
      const type = await buttons[i].getAttribute('type');
      const id = await buttons[i].getAttribute('id');
      console.log(`Button ${i}: text="${text}", type=${type}, id=${id}`);
    }

    // Login
    console.log('\n=== STEP 2: Logging in ===');
    await page.locator('input').first().fill('chathura');
    await page.locator('input').nth(1).fill('Admin@1234');
    
    // Find and click login button
    const loginBtn = await page.locator('button').filter({ hasText: /login|submit|enter/i }).first();
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
    } else {
      await page.keyboard.press('Enter');
    }
    
    // Wait for page load
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'screenshots/02-after-login.png' });
    console.log('✓ Logged in successfully');
    console.log('Page URL:', page.url());

    // Inspect navigation/menu structure
    console.log('\n=== NAVIGATION MENU INSPECTION ===');
    
    // Find all links and menu items
    const allLinks = await page.locator('a').all();
    console.log(`Found ${allLinks.length} links total`);
    
    const menuLinks = await page.locator('a, [role="menuitem"], [role="navigation"] a, button[class*="menu"]').all();
    console.log(`Found ${menuLinks.length} potential menu items`);
    
    console.log('\nFirst 20 menu items with text:');
    for (let i = 0; i < Math.min(20, allLinks.length); i++) {
      const text = await allLinks[i].textContent();
      const href = await allLinks[i].getAttribute('href');
      const className = await allLinks[i].getAttribute('class');
      if (text && text.trim()) {
        console.log(`Link ${i}: text="${text.trim().substring(0, 50)}", href=${href}, class=${className?.substring(0, 50)}`);
      }
    }

    // Look for specific menu items
    console.log('\n=== SEARCHING FOR SPECIFIC MENU ITEMS ===');
    
    const jobsMenuItem = await page.locator('text=/Jobs?/i').all();
    console.log(`Found ${jobsMenuItem.length} elements with "Jobs" text`);
    
    // Try to find Jobs menu specifically
    console.log('\n=== FINDING JOBS MENU ===');
    
    // Try different selectors
    const selectors = [
      'a:has-text("Jobs")',
      'button:has-text("Jobs")',
      '[role="menuitem"]:has-text("Jobs")',
      'text=/^Jobs$/i',
      'a, button',
    ];
    
    for (const selector of selectors) {
      try {
        const element = await page.locator(selector).first();
        if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
          const text = await element.textContent();
          if (text && text.includes('Jobs')) {
            console.log(`✓ Found with selector: "${selector}"`);
            const html = await element.evaluate(el => el.outerHTML);
            console.log(`HTML: ${html.substring(0, 300)}`);
            break;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Get full page structure
    console.log('\n=== FULL PAGE STRUCTURE ===');
    const pageStructure = await page.evaluate(() => {
      const navigation = document.querySelector('[class*="sidebar"], [class*="nav"], nav');
      const allText = [];
      
      // Find all elements with text "Jobs"
      const allElements = document.querySelectorAll('*');
      const jobsElements = [];
      
      allElements.forEach(el => {
        if (el.textContent && el.textContent.includes('Jobs') && el.children.length === 0) {
          jobsElements.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            text: el.textContent.substring(0, 50),
            attrs: {
              href: el.getAttribute('href'),
              role: el.getAttribute('role'),
              'data-testid': el.getAttribute('data-testid'),
            }
          });
        }
      });
      
      return {
        navFound: !!navigation,
        navHTML: navigation ? navigation.outerHTML.substring(0, 500) : 'Not found',
        jobsElements: jobsElements.slice(0, 5),
        documentTitle: document.title,
        bodyChildCount: document.body.children.length
      };
    });
    
    console.log('Page Structure:', JSON.stringify(pageStructure, null, 2));

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/03-full-dashboard.png' });
    
    await context.close();
    await browser.close();
    
    console.log('\n=== EXPLORATION COMPLETE ===');
    console.log('Screenshots saved to: screenshots/');
    process.exit(0);

  } catch (error) {
    console.error('Error during exploration:', error);
    await browser.close();
    process.exit(1);
  }
}

explorePage();
