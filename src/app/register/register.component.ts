import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators }  from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
      loading = false;
      submitted = false;

  constructor(private formBuilder: FormBuilder,
        private router: Router,private api: ApiService
        ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
  }
  get f() { return this.registerForm.controls; }

    onSubmit(form:NgForm) {
      this.api.postUser(form)
     .subscribe(res => {
               this.submitted = true;
         this.router.navigate(['/']);
       }, (err) => {
         console.log(err);
       });


        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

    }

}
