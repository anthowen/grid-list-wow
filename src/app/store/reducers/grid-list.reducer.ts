import { Action, createSelector, createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import { GridListState } from './../state/grid-list.state';
import * as GridListActions from '../actions/grid-list.actions';
import { TileStatus } from './../../model/grid-tile.interface';
import { initialState } from '../state/grid-list.state';
import { AppState } from '.';
import { generateList, expandSelection, shrinkSelection, mergeSelectedTiles} from './grid-list.utils';

// Reducer
const gridListReducer = createReducer<GridListState>(
  initialState,

  mutableOn(GridListActions.generateLists, (state, {setting}) => {
    state.setting = setting;
    state.tiles = generateList(setting);
  }),

  mutableOn(GridListActions.setMergePossible, (state, {isPossible}) => {
    state.isMergePossible = isPossible;
  }),

  mutableOn(GridListActions.selectTile, (state, {id}) => {
    const idx = state.tiles.findIndex(t => t.id === id);

    if (idx >= 0) {
      state.tiles[idx].setTileStatus(TileStatus.SELECTED);

      expandSelection(state, idx);
    }
  }),

  mutableOn(GridListActions.deselectTile, (state, {id}) => {
    const idx = state.tiles.findIndex(t => t.id === id);

    if (idx >= 0) {
      state.tiles[idx].setTileStatus(TileStatus.DEFAULT);

      shrinkSelection(state, idx);
    }
  }),

  mutableOn(GridListActions.mergeTiles, (state) => {
    mergeSelectedTiles(state);
  }),

);

export function reducer(state: GridListState | undefined, action: Action) {
  return gridListReducer(state, action);
}

// Selectors
export const selectGridList = (state: AppState) => state.gridList;
export const selectGridListTiles = createSelector(
  selectGridList,
  (gridList) => gridList.tiles
);

export const selectGridListSetting = createSelector(
  selectGridList,
  (gridList) => gridList.setting
);

export const selectGridListIsMergePossible = createSelector(
  selectGridList,
  (gridList) => gridList.isMergePossible
);
