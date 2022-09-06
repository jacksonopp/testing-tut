import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService, Person } from 'src/app/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = this._fb.group({
    firstName: [''],
    lastName: ['']
  })

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  handleSubmit() {

  }
}
