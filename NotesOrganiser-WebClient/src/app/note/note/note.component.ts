import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes:any;
  data:any;
  constructor(private noteService:NoteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getNoteData();
  }

  getNoteData() {
    this.noteService.getData().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }

  deleteData(id) {
    this.noteService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 1500,
        progressBar: true
      });
      this.getNoteData();
    });
  }
}
