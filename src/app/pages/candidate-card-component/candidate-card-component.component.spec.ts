import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCardComponentComponent } from './candidate-card-component.component';

describe('CandidateCardComponentComponent', () => {
  let component: CandidateCardComponentComponent;
  let fixture: ComponentFixture<CandidateCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
