import { Component, OnInit } from '@angular/core';
import { Exercise, Exercise_Type } from './../model/exercise';
import { RoutineService } from './../services/routine/routine.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup,FormBuilder,FormControl, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nuevo-ejercicio',
  templateUrl: './nuevo-ejercicio.component.html',
  styleUrls: ['./nuevo-ejercicio.component.css']
})
export class NuevoEjercicioComponent implements OnInit {

  form:FormGroup = this.formBuilder.group({
    name: new FormControl('', Validators.compose([
      Validators.minLength(4),
      Validators.required
    ])),
    type: new FormControl('', Validators.compose([
      Validators.required
    ])),
    description: new FormControl('', Validators.compose([
      Validators.minLength(1),
      Validators.required
    ]))
  })

  exercisesType=[];
  newExercise;
  isAsignar = false;
  isEdit = false;
  isNew = true;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private routineServ: RoutineService, private router: Router, private spinner: NgxSpinnerService) {
    this.newExercise = {name:"", description:"", type:"",isTemplate : true};
  }

  ngOnInit() {

    this.traerTiposEjercicio();
  }

  traerTiposEjercicio(){
    this.spinner.show();
    this.routineServ.exerciseTypes().subscribe(
      result => {console.log(result);this.exercisesType= result;this.spinner.hide();},
      error => {console.log(error);this.spinner.hide();}
    )
  }

  volverAtras(){
    this.router.navigate(['/ejercicios']);
  }

  validForm(){
    this.newExercise.type = this.form.controls.type.value;
    this.newExercise.name = this.form.controls.name.value;
    this.newExercise.description = this.form.controls.description.value;
  }

  guardarEjercicio(){
    this.spinner.show();
    this.validForm();
  	let type = Exercise_Type[this.newExercise.type];
    this.newExercise.type = type;
    console.log(this.newExercise);
    this.routineServ.saveExercise(this.newExercise).subscribe(
  			res => {console.log(res);this.volverAtras();this.spinner.hide();},
  			error => {console.log(error);this.spinner.hide();}
  			)
  	
  }

  actualizarEjercicio(){
    
  }

}
