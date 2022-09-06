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
  })
});
