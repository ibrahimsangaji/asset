import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmaintainComponent } from './assetmaintain.component';

describe('AssetmaintainComponent', () => {
  let component: AssetmaintainComponent;
  let fixture: ComponentFixture<AssetmaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetmaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetmaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
