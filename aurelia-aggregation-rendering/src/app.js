import {computedFrom} from 'aurelia-framework';
import {Store} from './store';
import {ChildGroup} from './child-group';

export class App {

  static inject = [Store]

  /**
   * Get object updates
   * @param {Store} store
   */
  constructor(store) {
    this.store = store;
    this.store.replaceState({
      object: {
        name: 'I\'m the only and real object',
        children: [
          {id: 1, name: 'Nami'},
          {id: 2, name: 'Zoro'},
          {id: 3, name: 'Luffy'},
          {id: 4, name: 'Shopper'},
          {id: 5, name: 'Sanji'},
          {id: 6, name: 'Brook'}
        ]
      }
    });

    store.subscribe(state => {
      console.log('new state');
      this.object = state.clone().object;
    })
  }

  /**
   * Add a children with name
   */
  addChildren(name) {
    // Would normally be done by an action class
    const state = this.store.getState().clone();
    state.object.children.push({
      id: state.object.children.length,
      name
    });
    this.store.replaceState(state);
  }

  /**
   * Group children based on their id
   * @returns {Array}
   */
  @computedFrom('object')
  get groupedChildren() {
    return ChildGroup.groupChildren(this.object.children);
  }
}
