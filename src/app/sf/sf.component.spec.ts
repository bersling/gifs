import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfComponent } from './sf.component';

describe('SfComponent', () => {
  let component: SfComponent;
  let fixture: ComponentFixture<SfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
