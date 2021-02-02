import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectorComponent } from './main-sector.component';

describe('MainSectorComponent', () => {
  let component: MainSectorComponent;
  let fixture: ComponentFixture<MainSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
