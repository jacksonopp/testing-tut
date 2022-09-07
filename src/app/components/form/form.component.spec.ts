import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let apiService: jasmine.SpyObj<ApiService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ FormComponent ],
      providers: [
        
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('succsefully submitting the form', () => {
    it('should put the first name on the screen', () => {
      const de = fixture.debugElement.query(By.css('[data-test="first"]'));
      expect(de).toBeTruthy();

      component.handleSubmit();
      fixture.detectChanges();

      expect((de.nativeElement as HTMLParagraphElement).innerText).toContain('test')
    })
  })

  function createSpies() {
    // Creating the spy
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['submitPerson'])
    // Creating mocks of methods
    apiService.submitPerson.and.returnValue(of({firstName: 'test', lastName: 'testLast', id: 1}))
  }
});
