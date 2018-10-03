import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtopianCommentsComponent } from './utopian-comments.component';

describe('UtopianCommentsComponent', () => {
  let component: UtopianCommentsComponent;
  let fixture: ComponentFixture<UtopianCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtopianCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtopianCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
