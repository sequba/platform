import { createSelector } from '@ngrx/store';
import {
  EntityDefinition,
  Comparer,
  IdSelector,
  EntityAdapter,
} from './models';
import { createInitialStateFactory } from './entity_state';
import { createSelectorsFactory } from './state_selectors';
import { createSortedStateAdapter } from './sorted_state_adapter';
import { createUnsortedStateAdapter } from './unsorted_state_adapter';

export function createEntityAdapter<T>(options: {
  selectId: IdSelector<T>;
  sortComparer?: false | Comparer<T>;
}): EntityAdapter<T> {
  const { selectId, sortComparer }: EntityDefinition<T> = {
    sortComparer: false,
    ...options,
  };

  const stateFactory = createInitialStateFactory<T>();
  const selectorsFactory = createSelectorsFactory<T>();
  const stateAdapter = sortComparer
    ? createSortedStateAdapter(selectId, sortComparer)
    : createUnsortedStateAdapter(selectId);

  return {
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter,
  };
}