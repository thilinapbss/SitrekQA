import { Page, BrowserContext } from '@playwright/test';

/**
 * Browser storage utilities for managing cookies, local storage, and session storage
 */
export class StorageHelpers {
  /**
   * Set local storage item
   */
  static async setLocalStorage(page: Page, key: string, value: string): Promise<void> {
    await page.evaluate(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key, value }
    );
  }

  /**
   * Get local storage item
   */
  static async getLocalStorage(page: Page, key: string): Promise<string | null> {
    return await page.evaluate(
      (key) => {
        return localStorage.getItem(key);
      },
      key
    );
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.clear();
    });
  }

  /**
   * Set session storage item
   */
  static async setSessionStorage(page: Page, key: string, value: string): Promise<void> {
    await page.evaluate(
      ({ key, value }) => {
        sessionStorage.setItem(key, value);
      },
      { key, value }
    );
  }

  /**
   * Get session storage item
   */
  static async getSessionStorage(page: Page, key: string): Promise<string | null> {
    return await page.evaluate(
      (key) => {
        return sessionStorage.getItem(key);
      },
      key
    );
  }

  /**
   * Clear session storage
   */
  static async clearSessionStorage(page: Page): Promise<void> {
    await page.evaluate(() => {
      sessionStorage.clear();
    });
  }

  /**
   * Get all cookies
   */
  static async getCookies(context: BrowserContext): Promise<any[]> {
    return await context.cookies();
  }

  /**
   * Set cookie
   */
  static async setCookie(
    context: BrowserContext,
    name: string,
    value: string,
    options?: any
  ): Promise<void> {
    await context.addCookies([
      {
        name,
        value,
        url: options?.url || 'http://localhost:3000',
        ...options,
      },
    ]);
  }

  /**
   * Clear all cookies
   */
  static async clearCookies(context: BrowserContext): Promise<void> {
    await context.clearCookies();
  }
}
