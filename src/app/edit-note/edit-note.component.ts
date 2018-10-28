import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators }  from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {


    noteForm: FormGroup;
    currentUser:string;
        loading = false;
        submitted = false;
        currentId:string;
        currentText:string;

    constructor(private formBuilder: FormBuilder,
          private router: Router,private api: ApiService,private route: ActivatedRoute
          ) { }

    ngOnInit() {
      this.currentId = this.route.snapshot.params.id;
      this.currentUser = localStorage.getItem('currentUser');
      this.api.getNotes(this.currentUser).subscribe(res=>{
        for (let item of res){
          if (item._id==this.currentId) {
            this.currentText = item.text;
            this.noteForm.patchValue({text:this.currentText});
          }
        }
        //this.currentText = res
      })

      this.noteForm = this.formBuilder.group({
              text: [this.currentText, Validators.required],
              userid: [this.currentUser],
              noteid: [this.currentId],
          });

    }
    get f() { return this.noteForm.controls; }

      onSubmit(form:NgForm) {
        console.log(form)
        // stop here if form is invalid
        this.submitted=true;
        if (this.noteForm.invalid) {
            return;
        }
        this.api.updateNote(this.currentId,form)
       .subscribe(res => {
                 this.submitted = true;
           this.router.navigate(['/']);
         }, (err) => {
           console.log(err);
         });




          this.loading = true;

      }

}
