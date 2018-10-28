import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes:Observable<any>
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getNotes(localStorage.getItem('currentUser')).subscribe(res=>{
      this.notes = res;
    })
  }

  deleteNote(id:string){
    this.api.deleteNote(id).subscribe(result=>{
      this.api.getNotes(localStorage.getItem('currentUser')).subscribe(res=>{
        this.notes = res;
      })
    })
  }

}
