import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NoteService } from 'src/app/services/note/note.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  data: any;
  addNoteForm: FormGroup;
  submitted=false;
  email: String;
  constructor(private _router: Router, private _user: UserService, private noteService: NoteService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  createForm() {
    this.addNoteForm = this.formBuilder.group({
      account: '',
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();

    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.addNoteForm.controls['account'].setValue(this.email);
  }

  get f() {
    return this.addNoteForm.controls;
  }
  insertData() {
    this.submitted=true;

    if(this.addNoteForm.invalid) {
        return;
      }

    this.noteService.insertData(this.addNoteForm.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
      this._router.navigateByUrl('/notes');
    });
  }
}
