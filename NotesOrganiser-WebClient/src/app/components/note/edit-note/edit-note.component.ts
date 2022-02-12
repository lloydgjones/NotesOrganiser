import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note/note.service';
import { Note } from 'src/app/models/note/note.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  note = new Note();
  id:any;
  data:any;
  constructor(private _router: Router, private noteService: NoteService, private route: ActivatedRoute, private toastr: ToastrService) { }

  editNoteForm = new FormGroup({
    name: new FormControl(''),
    content: new FormControl(''),
    time: new FormControl(''),
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getNoteData();
  }

  getNoteData(){
    this.noteService.getDataById(this.id).subscribe(
      res => {
        this.data = res;
        this.note = this.data;
        this.editNoteForm = new FormGroup({
          name: new FormControl(this.note.name),
          content: new FormControl(this.note.content),
          time: new FormControl(this.note.time)
        }
      );
    })
  }

  editData() {
    this.noteService.editData(this.id, this.editNoteForm.value).subscribe(
      res => {
        this.data = res;
        this.toastr.success(JSON.stringify(this.data.message), "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });
      }
    );
  }

  deleteData(id) {
    this.noteService.deleteData(id).subscribe(
      res => {
        this.data = res;
        this.toastr.error(JSON.stringify(this.data.message), "", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });

        this._router.navigateByUrl('/notes');
      }
    );
  }
}
