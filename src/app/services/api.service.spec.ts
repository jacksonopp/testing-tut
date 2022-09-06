import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ApiService, Person } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let mockBackend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    mockBackend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockBackend.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('post user', () => {
    it('should submit the person', () => {
      const expectedResponse = {
        id: 1,
        firstName: 'first',
        lastName: 'last'
      };
      service.submitPerson('first', 'last').subscribe({
        next: (p) => {
          expect(p).toEqual(expectedResponse)
        }
      })

      const req = mockBackend.expectOne('https://jsonplaceholder.typicode.com/users')
      expect(req.request.body).toEqual({firstName: 'first', lastName: 'last'})
      req.flush(expectedResponse)
    })

    it('should throw an error if no first name provided', () => {
      service.submitPerson(null, 'last').subscribe({
        error: (err: Error) => {
          expect(err.message).toContain('first name')
        }
      })

      mockBackend.expectNone('https://jsonplaceholder.typicode.com/users')
    })

    it('should throw an error if no last name provided', () => {
      service.submitPerson('first', null).subscribe({
        error: (err: Error) => {
          expect(err.message).toContain('last name')
        }
      })

      mockBackend.expectNone('https://jsonplaceholder.typicode.com/users')
    })
  })
});
