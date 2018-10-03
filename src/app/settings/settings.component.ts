import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileSettingsModel} from '../profile/models/profileSettings.model';
import {ProfileState} from '../profile/reducers';
import {select, Store} from '@ngrx/store';
import {SaveProfileSetting} from '../profile/actions/profile.actions';
import * as profileSelectors from '../profile/selectors';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  isAlive = true;
  frontEnds: string[];
  preferredFrontEnd: string;
  username: string;
  profileSettings$: Observable<ProfileSettingsModel>;

  constructor(private store: Store<ProfileState>) {
    this.frontEnds = ['steemit.com', 'busy.org', 'steemitstage.com'];
    this.profileSettings$ = store.pipe(select(profileSelectors.profileSettings));
  }

  ngOnInit() {
    this.profileSettings$.pipe(takeWhile(() => this.isAlive)).subscribe((settings) => {
      this.username = settings.username;
      this.preferredFrontEnd = settings.sitePreference;
    });
  }

  // Method to save users selection in local storage.
  savePreferences() {
    const preferences: ProfileSettingsModel = {
      sitePreference: this.preferredFrontEnd,
      username: this.username
    };

    this.store.dispatch(new SaveProfileSetting(preferences));
  }

  ngOnDestroy() {
    // All the observables that we are subscribing to need to get unsubscribed before we exit controller to prevent memory leak
    this.isAlive = false;
  }
}
