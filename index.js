import { compose, pipe } from 'lodash/fp';
import { Map } from 'immutable';
import { produce } from 'immer';
import store from './src/store';
import { bugAdded, bugResolved } from './src/actions';

function sayHello() {
  return function() {
    return 'Hello World';
  };
}

let fn = sayHello();
let message = fn();

let input = '     Javascript    ';
const trim = str => str.trim();
//const wrapInDiv = str => `<div>${str}</div>`;
const wrap = (type, str) => `<type>${str}</type>`;
const toLowerCase = str => str.toLowerCase();

//const result = wrapInDiv(toLowerCase(trim(input)));

const transform_compose = compose(
  wrap,
  toLowerCase,
  trim
);
transform_compose(input);

function wrap_curried(type) {
  return function(str) {
    return `<type>${str}</type>`;
  };
}

const wrap_arrow_curried = type => str => `<${type}>${str}</${type}>`;

const transform_pipe = pipe(
  trim,
  toLowerCase,
  wrap_arrow_curried('div')
);
console.log(transform_pipe(input));

const person = {
  name: 'John',
  address: {
    country: 'USA',
    city: 'San Francisco'
  }
};
const updated = Object.assign({}, person, { name: 'Bob', age: 30 });
const updated2 = {
  ...person,
  name: 'Bob',
  address: { ...person.address, city: 'New York' }
}; //Spread operator, these methods perform shallow copy
//updated2.address.city = 'New York';
console.log(person);
console.log(updated2);

const numbers = [1, 2, 3];

//const added = [...numbers, 4];
const index = numbers.indexOf(2);
const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)]; //not splice

console.log(added);

const removed = numbers.filter(n => n !== 2);
console.log(removed);

const updated_numbers = numbers.map(n => (n === 2 ? 20 : n));
console.log(updated_numbers);

//let book = { title: 'Harry Potter' };
//let book = Map({ title: 'Harry Potter' }); - immutable
let book = { title: 'Harry Potter' };

/*function publish(book) {
  book.isPublished = true;
}*/

/*  function publish(book) {
    return book.set('isPublished', true);
  };

book = publish(book);

console.log(book.toJS());  - immutable */

//using immer
function publish(book) {
  return produce(book, draftBook => {
    draftBook.isPublished = true;
  });
}

let updated_book = publish(book);

console.log(book);
console.log(updated_book);

console.log(store);

const unsubscribe = store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

store.dispatch(bugAdded('Bug 1'));

console.log(store.getState());

store.dispatch(bugResolved(1));

console.log(store.getState());

unsubscribe();

/*store.dispatch({
  type: BUG_REMOVED,
  payload: {
    id: 1
  }
});*/

console.log(store.getState());
