import { GridSetting } from './../../model/grid-setting.interface';
import { GridTileModel } from './../../model/grid-tile.model';

export interface GridListState {
  tiles: GridTileModel[];
  setting: GridSetting;
  isMergePossible: boolean;
}

export const initialState: GridListState = {
  tiles: [],
  setting: {
    cols: 4,
    rows: 4,
    widthRatio: 1,
    heightRatio: 1
  },
  isMergePossible: false,
};
