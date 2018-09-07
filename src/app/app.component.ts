import {Component, OnInit} from '@angular/core';
import {LoadProfileSetting} from './profile/actions/profile.actions';
import {Store} from '@ngrx/store';
import {ProfileState} from './profile/reducers';
import fontawesome from '@fortawesome/fontawesome';
import {faCogs} from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<ProfileState>) {}

  ngOnInit() {
    // Load profile settings from local storage when the application is first loaded.
    this.store.dispatch(new LoadProfileSetting());
    fontawesome.library.add(faCogs);
  }
}
