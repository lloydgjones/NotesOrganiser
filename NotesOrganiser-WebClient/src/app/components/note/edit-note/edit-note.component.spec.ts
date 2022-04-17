import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNoteComponent } from './edit-note.component';

import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditNoteComponent', () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToastrModule.forRoot(), RouterTestingModule, HttpClientTestingModule ],
      declarations: [ EditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
