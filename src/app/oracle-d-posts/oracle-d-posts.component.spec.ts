import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleDPostsComponent } from './oracle-d-posts.component';

describe('OracleDPostsComponent', () => {
  let component: OracleDPostsComponent;
  let fixture: ComponentFixture<OracleDPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OracleDPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OracleDPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
