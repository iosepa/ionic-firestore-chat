import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartChatPage } from './start-chat.page';

describe('StartChatPage', () => {
  let component: StartChatPage;
  let fixture: ComponentFixture<StartChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
