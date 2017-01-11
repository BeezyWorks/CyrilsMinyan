import { CyrilsMinyanAngPage } from './app.po';

describe('cyrils-minyan-ang App', function() {
  let page: CyrilsMinyanAngPage;

  beforeEach(() => {
    page = new CyrilsMinyanAngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
