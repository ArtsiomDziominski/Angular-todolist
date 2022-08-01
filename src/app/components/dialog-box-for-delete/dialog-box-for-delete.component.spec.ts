import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxForDeleteComponent } from './dialog-box-for-delete.component';

describe('DialogBoxForDeleteComponent', () => {
  let component: DialogBoxForDeleteComponent;
  let fixture: ComponentFixture<DialogBoxForDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxForDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBoxForDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
