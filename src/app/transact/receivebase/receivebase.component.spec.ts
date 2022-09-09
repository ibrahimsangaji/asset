import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivebaseComponent } from './receivebase.component';

describe('ReceivebaseComponent', () => {
  let component: ReceivebaseComponent;
  let fixture: ComponentFixture<ReceivebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
