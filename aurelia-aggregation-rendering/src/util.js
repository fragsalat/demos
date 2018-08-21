

/**
 * Helper function to use splice to add an array entry or to just assign the property
 * Splice is important because otherwise JS/Aurelia observers doesn't recognize changes
 * @param {Object|Array} objOrArray
 * @param {string} keyOrIndex
 * @param {*} value
 */
function setOrSplice(objOrArray, keyOrIndex, value) {
  if (Array.isArray(objOrArray) && isFinite(keyOrIndex)) {
    objOrArray.splice(keyOrIndex, 0, value);
  } else {
    objOrArray[keyOrIndex] = value;
  }
}

/**
 * Merge objects or arrays deep
 * @param {Object|Array} destination
 * @param {Array<Object|Array>} objects
 * @returns {Object}
 */
export function deepMerge(destination, ...objects) {
  // Iterate over objects object by object
  for (let o = 0; o < objects.length; o++) {
    // Iterate over object levels
    const levels = [{target: destination, source: objects[o], path: []}];
    for (let l = 0; l < levels.length; l++) {
      // Iterate over level properties
      const {target, source, path} = levels[l];
      const keys = Object.keys(source);
      for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
        const value = source[key];
        // If the value is an array concat with target
        if (Array.isArray(value)) {
          // Create new array (or array extending class) if not exist in target
          if (Array.isArray(target[key])) {
            target[key].splice(0, target[key].length);
          } else {
            setOrSplice(target, key, new value.constructor());
          }
          levels.push({target: target[key], source: value, path: path.concat([key])});
          // If the value is an object add it as level
        } else if (value && typeof value === 'object') {
          // Ensure the target is an object we can merge into
          if (typeof target[key] !== 'object') {
            setOrSplice(target, key, new value.constructor());
          }
          levels.push({target: target[key], source: value, path: path.concat([key])});
        } else {
          setOrSplice(target, key, value);
        }
      }
    }
  }
  return destination;
}

/**
 * Freezes an object deep and prevent any modification
 * @param {Object} obj
 * @returns {Object}
 */
export function freeze(obj) {
  // Iterate over all nesting levels to freeze them
  const levels = [obj];
  for (let l = 0; l < levels.length; l++) {
    const target = levels[l];
    // Create clone function to create a unfrozen object
    if (!Object.isFrozen(target)) {
      Object.defineProperty(target, 'clone', {
        enumerable: false,
        writable: false,
        value: function cloneFrozen() {
          const clone = deepMerge({}, {target});
          return clone.target;
        }
      });
      Object.freeze(target);
    }

    const keys = Object.keys(target);
    for (let k = 0; k < keys.length; k++) {
      const key = keys[k];
      if (target[key] && typeof target[key] === 'object') {
        levels.push(target[key]);
      }
    }
  }

  return obj;
}
