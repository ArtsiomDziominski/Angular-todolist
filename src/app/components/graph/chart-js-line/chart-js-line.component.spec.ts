import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJsLineComponent } from './chart-js-line.component';

describe('ChartJsLineComponent', () => {
  let component: ChartJsLineComponent;
  let fixture: ComponentFixture<ChartJsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartJsLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
