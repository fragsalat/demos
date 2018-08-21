import {freeze} from './util';

export class Store {

  /**
   * Current application state
   * @type {Object}
   */
  _state;

  /**
   * List of subscribers to notify on state change
   * @type {Array}
   */
  _callbacks = [];

  /**
   * Initialize store
   */
  constructor() {
    this._state = freeze({});
  }

  /**
   * Subscribe to state changes and get the initial state
   * @param {Function} callback Will be initially called and when state changes. The state is passed as parameter.
   */
  subscribe(callback) {
    this._callbacks.push(callback);
    // Call back with current state
    callback(this.getState());
  }

  /**
   * Replaces the current application state with a new one
   * @param {Object} newState
   */
  replaceState(newState) {
    const nextState = freeze(newState);

    this._callbacks.forEach(callback =>
      callback(nextState, this._state)
    );

    this._state = nextState;
  }

  /**
   * Get a clone of the current state
   * @returns {Object}
   */
  getState() {
    return this._state;
  }
}
