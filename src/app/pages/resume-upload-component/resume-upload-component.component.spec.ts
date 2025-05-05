import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeUploadComponentComponent } from './resume-upload-component.component';

describe('ResumeUploadComponentComponent', () => {
  let component: ResumeUploadComponentComponent;
  let fixture: ComponentFixture<ResumeUploadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeUploadComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeUploadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
