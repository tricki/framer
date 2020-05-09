import { newE2EPage } from '@stencil/core/testing';

describe('framer-frame', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<framer-frame></framer-frame>');
    const element = await page.find('framer-frame');
    expect(element).toHaveClass('hydrated');
  });

  it('renders correctly at half scale', async () => {
    const page = await newE2EPage();

    await page.setContent('<framer-frame width="1920" height="1080" style="width:960px"></framer-frame>');
    const component = await page.find('framer-frame');
    const style = await component.getComputedStyle();
    expect(style.scale === 'scale(-0.5)');
  });
});
