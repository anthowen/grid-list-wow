import { GridListState } from './../state/grid-list.state';
import { Action, createSelector, on } from '@ngrx/store';
import { createMutableReducer, mutableOn } from 'ngrx-etc';
import * as GridListActions from '../actions/grid-list.actions';

import { TileStatus } from './../../model/grid-tile.interface';
import { GridSetting } from './../../model/grid-setting.interface';
import { GridTileModel } from './../../model/grid-tile.model';

import { AppState } from '.';
import { initialState } from '../state/grid-list.state';
import { state } from '@angular/animations';

const generateList = (setting: GridSetting) => {
  const { cols, rows} = setting;
  const tiles: GridTileModel[] = [];
  for (let i = 0; i < rows; i ++ ) {
    for (let j = 0; j < cols; j ++ ) { 
      const newTile = new GridTileModel({
        cols: 1,
        rows: 1,
        color: 'lightgreen',
        text: `Tile (${i}, ${j})`,
        status: TileStatus.DEFAULT,
      })
      .setXPosition(i)
      .setYPosition(j);

      tiles.push(newTile);
    }
  }

  return tiles;
};


// Reducer
const gridListReducer = createMutableReducer<GridListState>(
  initialState,

  on(GridListActions.generateLists, (state, {setting}) => ({ setting, tiles: generateList(setting) })),

  on(GridListActions.setMergePossible, (state, {isPossible}) => ({ ...state, isMergePossible: isPossible})),

  mutableOn(GridListActions.selectTile, (state, {id}) => {
    const idx = state.tiles.findIndex(t => t.id === id);

    if (idx >= 0) {
      state.tiles[idx].setTileStatus(TileStatus.SELECTED);
    }
  }),

  mutableOn(GridListActions.deselectTile, (state, {id}) => {
    const idx = state.tiles.findIndex(t => t.id === id);

    if (idx >= 0) {
      state.tiles[idx].setTileStatus(TileStatus.DEFAULT);
    }
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
