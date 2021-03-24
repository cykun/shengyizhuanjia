import { TestBed } from '@angular/core/testing';

import { AliyunSmsService } from './aliyun-sms.service';

describe('AliyunSmsService', () => {
  let service: AliyunSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliyunSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
