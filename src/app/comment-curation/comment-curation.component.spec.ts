import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCurationComponent } from './comment-curation.component';

describe('CommentCurationComponent', () => {
  let component: CommentCurationComponent;
  let fixture: ComponentFixture<CommentCurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
