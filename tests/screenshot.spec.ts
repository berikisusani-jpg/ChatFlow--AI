import { test } from '@playwright/test';

test('capture dashboard', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const routes = [
    { name: 'overview', path: '/dashboard' },
    { name: 'inbox', path: '/dashboard/inbox' },
    { name: 'training', path: '/dashboard/training' },
    { name: 'profile', path: '/dashboard/profile' },
    { name: 'creative', path: '/dashboard/creative' },
    { name: 'deploy', path: '/dashboard/deploy' }
  ];
  for (const route of routes) {
    try {
      await page.goto('http://localhost:5173' + route.path);
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'screenshot_' + route.name + '.png', fullPage: true });
      console.log('Captured ' + route.name);
    } catch (e) {
      console.error('Failed to capture ' + route.name, e);
    }
  }
});
