import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinfunComponent } from './linfun.component';

describe('LinfunComponent', () => {
  let component: LinfunComponent;
  let fixture: ComponentFixture<LinfunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinfunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinfunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
