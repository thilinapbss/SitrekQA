import { Page } from '@playwright/test';

/**
 * Wait utility functions
 */
export class WaitHelpers {
  /**
   * Wait for a specific amount of time (use sparingly, prefer Playwright's auto-waiting)
   */
  static async wait(milliseconds: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM content to be loaded
   */
  static async waitForDOMContentLoaded(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
  }
}

/**
 * String utility functions
 */
export class StringHelpers {
  /**
   * Generate random string
   */
  static randomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static randomEmail(domain: string = 'example.com'): string {
    return `user_${this.randomString(8)}@${domain}`;
  }

  /**
   * Generate random number within range
   */
  static randomNumber(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Date utility functions
 */
export class DateHelpers {
  /**
   * Get current date in YYYY-MM-DD format
   */
  static getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  /**
   * Get timestamp
   */
  static getTimestamp(): number {
    return Date.now();
  }

  /**
   * Format date
   */
  static formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
}

/**
 * Environment utility functions
 */
export class EnvHelpers {
  /**
   * Get environment variable
   */
  static getEnv(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue;
  }

  /**
   * Check if running in CI
   */
  static isCI(): boolean {
    return !!process.env.CI;
  }

  /**
   * Get base URL
   */
  static getBaseURL(): string {
    return this.getEnv('BASE_URL', 'http://localhost:3000');
  }
}

/**
 * Screenshot utility functions
 */
export class ScreenshotHelpers {
  /**
   * Generate screenshot filename with timestamp
   */
  static generateScreenshotName(prefix: string): string {
    const timestamp = DateHelpers.getTimestamp();
    return `${prefix}_${timestamp}.png`;
  }

  /**
   * Take full page screenshot
   */
  static async takeFullPageScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ 
      path: `test-results/screenshots/${name}`,
      fullPage: true 
    });
  }
}
