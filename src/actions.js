import { BUG_ADDED, BUG_RESOLVED, BUG_REMOVED } from './actionTypes';

export const bugAdded = description => ({
  type: BUG_ADDED,
  payload: {
    description: description
  }
});

/*export function bugAdded(description) {
  return {
    type: BUG_ADDED,
    payload: {
      description: description
    }
  };
}*/

export function bugResolved(id) {
  return {
    type: BUG_RESOLVED,
    payload: {
      id //short hand syntax
    }
  };
}

export function bugRemoved(id) {
  return {
    type: BUG_REMOVED,
    payload: {
      id: id
    }
  };
}
