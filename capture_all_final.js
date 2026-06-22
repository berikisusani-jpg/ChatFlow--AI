import { chromium } from 'playwright-core';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const routes = [
    { name: '1_overview', path: '/dashboard' },
    { name: '2_inbox', path: '/dashboard/inbox' },
    { name: '3_training', path: '/dashboard/training' },
    { name: '4_profile', path: '/dashboard/profile' },
    { name: '5_creative', path: '/dashboard/creative' },
    { name: '6_deploy', path: '/dashboard/deploy' }
  ];

  for (const route of routes) {
    console.log(`Capturing ${route.name}...`);
    try {
      await page.goto('http://localhost:3003' + route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `final_full_${route.name}.png`, fullPage: true });
    } catch (e) {
      console.error(`Failed ${route.name}: ${e.message}`);
    }
  }

  await browser.close();
})();
