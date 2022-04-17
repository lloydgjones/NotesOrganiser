import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
