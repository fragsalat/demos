import {Page1} from './page1/page1';
import {Page2} from './page2/page2';

export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config) {
    config.map([
      {route: '', name: 'page1', moduleId: './page1/page1'},
      {route: 'page2', name: 'page2', moduleId: './page2/page2'}
    ]);
  }
}
