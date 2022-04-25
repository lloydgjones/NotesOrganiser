import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note/note.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  isDoneLoading = false;
  isSortedByNameAsc = true;
  data: any;
  notes: any[];
  email: String;

  constructor(private _router: Router, private _user: UserService, private noteService: NoteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._user.getUser().subscribe(
      res=>this.getAccount(res),
      err=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.getData();
  }

  getData() {
    this.noteService.getDataByUser(this.email).subscribe(
      res => {
        this.notes = Object.keys(res).map(index => { let note = res[index]; return note; });
        this.sortByNameAsc();
        this.isDoneLoading = true;
      }
    );
  }

  sortByNameAsc() {
    this.notes.sort((a,b) => a.name.localeCompare(b.name));
    this.isSortedByNameAsc = true;
  }

  sortByNameDesc() {
    this.notes.sort((a,b) => b.name.localeCompare(a.name));
    this.isSortedByNameAsc = false;
  }

  deleteData(id) {
    if(confirm("Are you sure that you want to delete this note?")) {
      this.noteService.deleteData(id).subscribe(
        res => {
          this.data = res;
          this.toastr.success(this.data.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: "toast-bottom-right"
          });

          this.getData();
        }
      );
    }
  }
}
