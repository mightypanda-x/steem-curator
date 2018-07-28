import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {CommentCurationComponent} from './comment-curation/comment-curation.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UtopianPostsComponent} from './utopian-posts/utopian-posts.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'user/:userId', component: UserProfileComponent},
  {path: 'commentCuration', component: CommentCurationComponent},
  {path: 'utopian', component: UtopianPostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
