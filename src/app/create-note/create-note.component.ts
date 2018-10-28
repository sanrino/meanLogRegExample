import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators }  from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  noteForm: FormGroup;
  currentUser:string;
      loading = false;
      submitted = false;

  constructor(private formBuilder: FormBuilder,
        private router: Router,private api: ApiService
        ) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
    this.noteForm = this.formBuilder.group({
            text: ['', Validators.required],
            userid: [this.currentUser],
        });
  }
  get f() { return this.noteForm.controls; }

    onSubmit(form:NgForm) {
      // stop here if form is invalid
      this.submitted=true;
      if (this.noteForm.invalid) {
          return;
      }
      this.api.postNote(form)
     .subscribe(res => {
               this.submitted = true;
         this.router.navigate(['/']);
       }, (err) => {
         console.log(err);
       });




        this.loading = true;

    }

}
