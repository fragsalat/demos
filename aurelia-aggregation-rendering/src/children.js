import {bindable, computedFrom, customElement} from 'aurelia-framework';
import {Store} from './store';

export class ChildrenCustomElement {

  static inject = [Store];

  @bindable child;

  /**
   * @param {Store} store
   */
  constructor(store) {
    this.store = store;
  }

  /**
   * Change name of current child
   */
  changeName(newName) {
    // Would normally be done by an action class
    const state = this.store.getState().clone();
    state.object.children.find(child => child.id === this.child.id).name = newName;
    this.store.replaceState(state);
  }

  /**
   * Get child name an log for debugging
   */
  @computedFrom('child.name')
  get childName() {
    console.log('Got name for ', this.child.id);
    return this.child.name;
  }
}
