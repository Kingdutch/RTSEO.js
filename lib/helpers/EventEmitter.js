/**
 * A simple event emitter class.
 */
export default class EventEmitter {
  events = {};

  /**
   * Add a listener to an event.
   *
   * @param {string} event
   *   The event to listen to.
   * @param {Function} listener
   *   The function to call when the event occurs.
   * @return {EventEmitter}
   *   The EventEmitter that was called to allow for chaining.
   */
  on(event, listener) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    this.events[event].push(listener);

    return this;
  }

  /**
   * Remove a listener for an event.
   *
   * @param {string} event
   *   The event to remove the listener for.
   * @param {Function} listener
   *   The listener to remove.
   * @return {EventEmitter}
   *   The EventEmitter that was called to allow for chaining.
   */
  removeListener(event, listener) {
    if (typeof this.events[event] !== 'undefined') {
      const idx = this.events[event].indexOf(listener);

      if (idx !== -1) {
        this.events[event].splice(idx, 1);
      }
    }

    return this;
  }

  /**
   * Emit an event to all its listeners.
   *
   * @param {string} event
   *   The event to emit.
   * @param {...} args
   *   The arguments to pass to the event listeners.
   */
  emit(event, ...args) {
    if (this.events[event] !== 'undefined') {
      const listeners = this.events[event].slice();

      for (let i = 0, length = listeners.length; i < length; ++i) {
        listeners[i].apply(null, args);
      }
    }
  }

  /**
   * Add an event listener to an event that is removed after it's invoked.
   *
   * @param {string} event
   *   The event to subscribe to.
   * @param {Function} listener
   *   The listeren to add for this event.
   * @return {EventEmitter}
   *   The EventEmitter that was called to allow for chaining.
   */
  once(event, listener) {
    const self = this;
    this.on(event, function g() {
      self.removeListener(event, g);
      listener.apply(null, arguments);
    });

    return this;
  }
}
