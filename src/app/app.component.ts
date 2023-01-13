import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form-array';

  fg!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["cantDesde", "precio", "eliminar"]

  cantDesde = new FormControl('')
  precio = new FormControl('')

  constructor(private _fb: FormBuilder,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {

    this.fg = this._fb.group({
      cantDesde: this.cantDesde,
      precio: this.precio,
      promos: this._fb.array([])
    });

  };

  get promos() {
    return this.fg.controls["promos"] as FormArray;
  };

  addLesson(): void {

    const lessonForm = this._fb.group({
      cantDesde: [''],
      precio: ['']
    });


    this.promos.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);

    this.cd.detectChanges();

  };


  deleteLesson(lessonIndex: number): void {

    this.promos.removeAt(lessonIndex);
    this.dataSourcePacks = new MatTableDataSource(this.promos.controls);

  };


  onSubmit() {
    console.log(this.promos.value)
  }


}
