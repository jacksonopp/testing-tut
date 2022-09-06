import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService, Person } from 'src/app/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public newPerson?: Person;

  public form = this._fb.group({
    firstName: [''],
    lastName: ['']
  })

  constructor(private _fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.apiService.submitPerson(this.form.value.firstName, this.form.value.lastName).subscribe({
      next: (newPerson) => {
        this.newPerson = newPerson;
        console.log(newPerson)
      }
    })
  }
}
