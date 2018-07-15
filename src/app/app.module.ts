import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ProfileModule} from './profile/profile.module';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BotModule} from './bot/bot.module';
import { CommentCurationComponent } from './comment-curation/comment-curation.component';
import { HomePageComponent } from './home-page/home-page.component';
import {PostModule} from './post/post.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    CommentCurationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    /**
     * Store dev-tools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'Steem Curator Store DevTools',
      logOnly: false,
    }),
    EffectsModule.forRoot([]),
    ProfileModule.forRoot(),
    BotModule.forRoot(),
    PostModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
