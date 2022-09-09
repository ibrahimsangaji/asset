import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupstoComponent } from './setupsto.component';

describe('SetupstoComponent', () => {
  let component: SetupstoComponent;
  let fixture: ComponentFixture<SetupstoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupstoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupstoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
