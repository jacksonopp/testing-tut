import { TestBed } from '@angular/core/testing';
import { ApiService, Person } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('ApiService', () => {
  let service: ApiService;
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    backend = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('succesfull call to endpoint', () => {
    it('should return data', () => {
      const expectedPerson: Person = {
        firstName: 'first name',
        lastName: 'last name',
        id: 1
      };

      service.submitPerson('first name', 'last name').subscribe({
        next: (data: Person) => {
          expect(data).toEqual(expectedPerson);
        }
      })

      const res = backend.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(res.request.body).toEqual({firstName: 'first name', lastName: 'last name'})

      res.flush(expectedPerson)
    })
  })
});
