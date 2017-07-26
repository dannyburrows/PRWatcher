import { GithubconnectorPage } from './app.po';

describe('githubconnector App', () => {
  let page: GithubconnectorPage;

  beforeEach(() => {
    page = new GithubconnectorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
