import {reducers} from '../post/reducers';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UtopianService} from './services/utopian.service';
import {UtopianEffects} from './effects/utopian.effects';

@NgModule()
export class UtopianPostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUtopianPostModule,
      providers: [UtopianService]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([UtopianEffects])
  ],
  declarations: []
})
export class RootUtopianPostModule {}
