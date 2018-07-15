import {ModuleWithProviders, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducers} from './reducers';
import {PostEffects} from './effects/post.effects';
import {PostService} from './services/post.service';

@NgModule()
export class PostModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootPostsModule,
      providers: [PostService]
    };
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostEffects])
  ],
  declarations: []
})
export class RootPostsModule {}
