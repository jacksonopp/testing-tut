import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    createSpies();
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ FormComponent ],
      providers: [
        {
          provide: ApiService,
          useValue: apiService
        }
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

  it('should put the person on the screen', () => {
    component.form.setValue({
      firstName: 'first',
      lastName: 'last'
    })

    component.handleSubmit();
    expect(component.newPerson?.id).toBe(1)

    fixture.detectChanges();
    const firstName = fixture.debugElement.query(By.css('[data-test="person-first-name"]'))
    expect(firstName).toBeTruthy();
    expect((firstName.nativeElement as HTMLParagraphElement).innerText).toContain('first')


    const lastName = fixture.debugElement.query(By.css('[data-test="person-last-name"]'))
    expect(lastName).toBeTruthy();
    expect((lastName.nativeElement as HTMLParagraphElement).innerText).toContain('last')

    const id = fixture.debugElement.query(By.css('[data-test="person-id"]'))
    expect(id).toBeTruthy();
    expect((id.nativeElement as HTMLParagraphElement).innerText).toContain('1')
  });

  function createSpies() {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['submitPerson']);
    apiService.submitPerson.and.returnValue(of({firstName: 'first', lastName: 'last', id: 1}))
  }
});
