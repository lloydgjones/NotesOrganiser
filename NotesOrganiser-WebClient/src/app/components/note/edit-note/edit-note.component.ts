import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note/note.model';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  isDoneLoading: boolean = false;
  note = new Note();
  id: any;
  data: any;
  submitted=false;
  normalisedTime: any;
  editNoteForm: FormGroup;

  constructor(private _router: Router, private noteService: NoteService, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getNoteData();
  }

  getNoteData(){
    this.noteService.getDataById(this.id).subscribe(
      res => {
        this.data = res;
        this.note = this.data;
        if(this.note.time != null) { this.normalisedTime = this.note.time.toLocaleString().replace('Z', '') }
        this.editNoteForm = this.formBuilder.group({
          name: [this.note.name, Validators.required],
          content: [this.note.content, Validators.required],
          time: [this.normalisedTime],
          tags: [this.note.tags]
        });
        this.isDoneLoading = true;
      }
    );
  }

  get f() {
    return this.editNoteForm.controls;
  }
  editData() {
    this.submitted=true;

    if(this.editNoteForm.invalid) { return; }

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
    if(confirm("Are you sure that you want to delete this note?")) {
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
}
