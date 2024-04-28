import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpersonagemComponent } from './newpersonagem.component';

describe('NewpersonagemComponent', () => {
  let component: NewpersonagemComponent;
  let fixture: ComponentFixture<NewpersonagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewpersonagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewpersonagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
