import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NoteService } from 'src/app/services/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes:any[];
  allNotes:any[];
  data:any;
  email: String;
  constructor(private _router: Router, private _user: UserService, private noteService:NoteService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );

    this.getData();
  }

  getAccount(data){
    this.email = data.email;
  }

  getData() {
    this.noteService.getData().subscribe(res => {
      this.allNotes = Object.keys(res).map(key => ({type: key, value: res[key]}));
      this.notes = this.allNotes.filter(note => note.account == this.email);
    });
  }
}
