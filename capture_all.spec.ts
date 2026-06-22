import { test, expect } from '@playwright/test';

test('capture all dashboard screens', async ({ page }) => {
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
    await page.goto(`http://localhost:5173${route.path}`);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `screenshot_${route.name}.png`, fullPage: true });
  }
});
