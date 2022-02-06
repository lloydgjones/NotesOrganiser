import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NoteService } from 'src/app/services/note/note.service';
import { ToastrService } from 'ngx-toastr';

// TODO: isLoading for All Components
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  data: any;
  email: String;
  notes: any[];
  constructor(private _router: Router, private _user: UserService, private noteService:NoteService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.getData();
  }

  // TODO: Pass In User ID
  getData() {
    this.noteService.getData().subscribe(
      res => {
        this.notes = Object.keys(res).map(index => { let note = res[index]; return note; }).filter(note => note.account == this.email);
      }
    );
  }
}
