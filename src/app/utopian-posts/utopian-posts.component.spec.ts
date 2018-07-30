import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtopianPostsComponent } from './utopian-posts.component';

describe('UtopianPostsComponent', () => {
  let component: UtopianPostsComponent;
  let fixture: ComponentFixture<UtopianPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtopianPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtopianPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
