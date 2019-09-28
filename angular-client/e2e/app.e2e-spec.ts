import { AtlasPage } from './app.po';

describe('atlas App', function() {
  let page: AtlasPage;

  beforeEach(() => {
    page = new AtlasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
