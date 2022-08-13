import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJsPieComponent } from './chart-js-pie.component';

describe('ChartJsPieComponent', () => {
  let component: ChartJsPieComponent;
  let fixture: ComponentFixture<ChartJsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartJsPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
