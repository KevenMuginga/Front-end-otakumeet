import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtakuMeetComponent } from './otaku-meet.component';

describe('OtakuMeetComponent', () => {
  let component: OtakuMeetComponent;
  let fixture: ComponentFixture<OtakuMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtakuMeetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtakuMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
