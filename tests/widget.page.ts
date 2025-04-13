import { Page } from "@playwright/test";

enum WidgetPageSelectors {
  WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
  WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
  HEADER_TEXT = 'header h5',
  BUTTON_OPEN = '[data-test=openWidget]',
  BUTTON_WRITE_TO_US = 'button:has-text("Написать нам"), [data-test="button_feedback_form"]',
  ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
  ARTICLE_POPULAR_LIST = '[class^=popularTitle__] + ul[class^=articles__]',
  ARTICLE_POPULAR_LIST_ITEM = '[class^=popularTitle__] + ul[class^=articles__] > li',
}

export class WidgetPage {
  static selector = WidgetPageSelectors;

  constructor(protected page: Page) {}

  wrapper() {
    return this.page.locator(WidgetPage.selector.WRAPPER);
  }

  async openWidget() {
    await this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
  }

  async getPopularArticles() {
    const list = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
    await list.first().waitFor({ state: 'visible' });
    return await list.all();
  }

  async clickWriteToUs() {
    await this.wrapper()
      .locator(WidgetPage.selector.BUTTON_WRITE_TO_US)
      .first()
      .click();
  }

  async getTitle() {
    return await this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
  }

  getWidgetBody() {
    return this.page.locator(WidgetPage.selector.WIDGET_BODY);
  }
}