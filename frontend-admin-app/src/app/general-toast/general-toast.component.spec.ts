import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralToastComponent } from './general-toast.component';

describe('GeneralToastComponent', () => {
  let component: GeneralToastComponent;
  let fixture: ComponentFixture<GeneralToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
