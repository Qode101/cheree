import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoodiesComponent } from './hoodies.component';

describe('HoodiesComponent', () => {
  let component: HoodiesComponent;
  let fixture: ComponentFixture<HoodiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoodiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
