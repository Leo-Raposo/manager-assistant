import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathGeneratorComponent } from './path-generator.component';

describe('PathGeneratorComponent', () => {
  let component: PathGeneratorComponent;
  let fixture: ComponentFixture<PathGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
