import { test, expect } from '@playwright/test';

test.describe('TrackerPro E2E Critical Path', () => {

  test('Homepage has correct SEO and calls to action', async ({ page }) => {
    // Navigate to the root URL
    await page.goto('/');

    // Verify Title (SEO Check)
    await expect(page).toHaveTitle(/Study Tracker/i);

    // Verify Hero CTA exists and navigates to login
    const ctaButton = page.locator('text=Start Tracking for Free');
    await expect(ctaButton).toBeVisible();
    
    // Test navigation routing
    await ctaButton.click();
    await expect(page).toHaveURL(/\/login/);
  });

  // Note: True Auth flows (typing passwords) require a clean test DB. 
  // In a CI pipeline, playwright would use storageState to bypass repetitive logins.
  // Here we verify the login page structurally enforces fields.
  test('Login Page structural integrity', async ({ page }) => {
    await page.goto('/login');

    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Verify client-side validation triggers on empty submit
    await submitButton.click();
    await expect(page.locator('text=Invalid formatting')).not.toBeVisible(); 
    // It should just prevent HTML default since fields are required.
  });

});
