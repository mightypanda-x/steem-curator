import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducers, botsReducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {BotEffects} from './effects/bot.effects';
import {BotService} from './services/bot.service';

@NgModule()
export class BotModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootBotsModule,
      providers: [BotService]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('bots', botsReducers),
    StoreModule.forFeature('bids', reducers),
    EffectsModule.forFeature([BotEffects])
  ],
  declarations: []
})
export class RootBotsModule {}
