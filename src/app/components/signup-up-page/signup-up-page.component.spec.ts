import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUpPageComponent } from './signup-up-page.component';

describe('SignupUpPageComponent', () => {
  let component: SignupUpPageComponent;
  let fixture: ComponentFixture<SignupUpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupUpPageComponent]
    });
    fixture = TestBed.createComponent(SignupUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
