import { chromium } from '@playwright/test';

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
    const loginButtons = buttons.slice(0, 5);
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
    
    console.log('\nMenu items with text:');
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
    for (let i = 0; i < Math.min(3, jobsMenuItem.length); i++) {
      const tag = await jobsMenuItem[i].evaluate((el) => el.tagName);
      const text = await jobsMenuItem[i].textContent();
      console.log(`Jobs item ${i}: tag=${tag}, text="${text}"`);
    }

    // Try to access the sidebar/navigation
    console.log('\n=== SIDEBAR INSPECTION ===');
    const sidebars = await page.locator('[class*="sidebar"], [class*="nav"], [class*="menu"]').all();
    console.log(`Found ${sidebars.length} potential sidebar elements`);
    
    for (let i = 0; i < Math.min(5, sidebars.length); i++) {
      const className = await sidebars[i].getAttribute('class');
      const text = await sidebars[i].textContent();
      console.log(`Sidebar ${i}: class="${className?.substring(0, 60)}", text_length=${text?.length}`);
    }

    // Try to find Jobs menu specifically
    console.log('\n=== FINDING JOBS MENU ===');
    const jobsLink = await page.locator('a:has-text("Jobs"), button:has-text("Jobs"), [role="menuitem"]:has-text("Jobs")').first();
    if (await jobsLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('✓ Found Jobs menu item');
      const html = await jobsLink.evaluate((el) => el.outerHTML);
      console.log('HTML:', html.substring(0, 200));
    } else {
      console.log('✗ Jobs menu item not found with standard selectors');
      
      // Try alternative search
      console.log('Trying alternative selectors...');
      const allText = await page.locator('body').evaluate(() => {
        const divs = Array.from(document.querySelectorAll('*'));
        const jobsElements = divs.filter(el => el.textContent?.includes('Jobs'));
        return jobsElements.map(el => ({
          tag: el.tagName,
          class: el.className,
          text: el.textContent?.substring(0, 50),
          html: el.outerHTML.substring(0, 100)
        })).slice(0, 5);
      });
      console.log('Found elements with "Jobs" text:', JSON.stringify(allText, null, 2));
    }

    // Export full page HTML for analysis
    const html = await page.content();
    console.log('\n=== PAGE STRUCTURE SUMMARY ===');
    console.log(`Total HTML length: ${html.length} characters`);
    
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
