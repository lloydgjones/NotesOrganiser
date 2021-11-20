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
    this.getData();
  }

  getData() {
    this.noteService.getData().subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }
}
