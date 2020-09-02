import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GridListSettingComponent } from './components/grid-list-setting/grid-list-setting.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from './store/reducers';
import * as GridListActions from 'src/app/store/actions/grid-list.actions';
import * as fromGridList from 'src/app/store/reducers/grid-list.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'doWow';
  isMergePossible$: Observable<boolean>;

  constructor(public dialog: MatDialog,
              private store: Store<AppState>) {}


  ngOnInit(): void {
    this.isMergePossible$ = this.store.select(fromGridList.selectGridListIsMergePossible);
  }

  openSettingDialog(): void {
    const dialogRef = this.dialog.open(GridListSettingComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  mergeTiles(): void {
    this.store.dispatch(GridListActions.mergeTiles());
  }
}
