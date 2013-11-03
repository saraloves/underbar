/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
   if (n >= 0) {
    var newArray = array.slice(0, n);
    return newArray;
   } else {
    return array[0];
   }
    
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n >= 0) {
      var first = array.length-n;
        if (first < 0) {
          first = 0;
        }
      var newArray = array.slice(first, array.length);
      return newArray;
    } else {
      return array[array.length-1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
        for (var i = 0; i<collection.length; i++) {
        for (var i = 0; i < collection.length; i++) {
          iterator(collection[i], i, collection);
        }
      } 
    }else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }    
  };



  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var myIndex =- 1;
      _.each(array, function(value, index, data) {
        if (myIndex === -1 && value === target) {
          myIndex = index;
        }
      });
      return myIndex;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
      var newArray = [];
      var test = "";
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i]) === true) {
          newArray.push(collection[i]);
        }
      }
      return newArray;
  };



  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var newArray = [];
      var test = "";
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i]) === false) {
          newArray.push(collection[i]);
        }
      }
      return newArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    for (var i = 0; i < array.length; i++) {
      if (unique.indexOf(array[i]) === -1) {
        unique.push(array[i]);
      }
    }
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(iterator(array[i]));
    }
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
    return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === 'string'){
      for (var i in list) {  
        list[i][methodName]();
      }
    } else {
      for (var i in list) {
          methodName.call(list[i]);
      }
    }
    return list;
  };
  

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var result = initialValue || 0;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        result = iterator(result, collection[i]);
      }
    } else {
      for (var key in collection) {
        console.log(collection[key]);
        result = iterator(result, collection[key]);
      }
    }
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
_.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      return (wasFound === true ? true : item === target);
        // non-ternary version was
        //  if(wasFound) {
        //   return true;
        // } else {
        // return item === target;
        // }
    }, false);

  };

  // Determine whether all of the elements match a truth test.

  _.every = function(collection, iterator) {
    return _.reduce(collection, function(isTrue, item){
      //Run the function reduce within every.  Reduce will iterate over
      //a dataset and return a single value.  Here the inputs for reduce
      //are collection, the iterator, and true. The inputs for the
      //iterator are isTrue and item.  We should include iterator.
       // console.log(isTrue, item, iterator);
      if (isTrue === false) {
        return false;
      } else {
        if (iterator) {
          return Boolean(iterator(item));
        } else {
          return Boolean(item);
        }
      }
    }, true);
  };

  _.some = function(collection, iterator) {
    return Boolean(_.reduce(collection, function(isTrue, item){
      if (isTrue === true) {
        return true;
      } else {
        if (iterator) {
          return Boolean(iterator(item));
        } else {
          return Boolean(item);
        }
      }

    }, false));
  };
    // TIP: There's a very clever way to re-use every() here.
      //return _.every(collection, !iterator);
      // i am reversing the iterator, so every will return true if none of the values evaluate to true
      // 

  



  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // _.some = function(collection, iterator) {
  //   debugger;
  //   // TIP: There's a very clever way to re-use every() here.
  //   return _.every(collection, !iterator);

  //   };

// _.some([null, 0, 'yes', false]);

  // return _.every(collection, function(isTrue, item) {
  //     console.log(isTrue, item);
  //     if (iterator) {
  //       if (iterator(item)) {
  //         console.log(item);
  //         return true;
  //       } else {
  //         if (item) {
  //           console.log(item);
  //           return true;
  //         }
  //       }
  //     }
  //   });
  // };


   // return _.every(collection, function(everTrue, item){
   //    console.log("hey");
   //    if (everTrue === true) {
   //      return true;
   //    } else if (iterator) {
   //      if (iterator(item)===true) {
   //      return true;
   //      }
   //    } else {
   //      if (item===true) {
   //        return true;
   //      }
   //    }
   //  });


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  // _.extend = function(obj) {
  //     var newObj = obj;
  //       for (var key in obj) {
  //         console.log(newObj[key]);
  //         newObj[key] = obj[key];
  //       }
  //     return newObj;
  // };


  _.extend = function(obj) {
    var mergedObj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        mergedObj[key] = arguments[i][key];
      }
    }
    return mergedObj;
  }


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];

        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result;
    return function(){
      result = func.apply(this, arguments);
      return result;
    }
  };
  
 

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  _.delay = function(func, wait) {
    var argArray = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(this, argArray);
    }, wait);
  };




  // _.delay = function(func, wait, args) {
  //     var argArray = Array.prototype.slice.call(arguments);
  //     console.log(argArray);
  //     console.log(argArray.slice(2, arguments.length));
  //     return setTimeout(function() {return func.apply(argArray.slice(2, arguments.length));}, wait);

  // };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  
  _.shuffle = function(array) {
    var oldArray = array;
    var newArray = [];
    for (var i = array.length; i>0; i--) {
      var random = Math.floor(Math.random() * i)
      newArray.push(oldArray[random]);
      oldArray.splice(random, 1);
    }
    return newArray;
  };

  // _.shuffle = function(array) {
  //   var shuffledArray = [];
  //   for (var i = 0; i < array.length; i++) {
  //     if (i < Math.floor(Math.random()*10)) {
  //       shuffledArray.push(array[i]);
  //     } else {
  //       shuffledArray.unshift(array[i]);
  //     }
  //   }
  //   return shuffledArray;
  // };
  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
