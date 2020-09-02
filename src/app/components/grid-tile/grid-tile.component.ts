import { GridTileModel } from './../../model/grid-tile.model';
import { GridTile } from './../../model/grid-tile.interface';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {
  @Input() tile: GridTile = new GridTileModel();
  @Output() tileClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick($event: MouseEvent): void {
    this.tileClick.emit($event);
  }

}
