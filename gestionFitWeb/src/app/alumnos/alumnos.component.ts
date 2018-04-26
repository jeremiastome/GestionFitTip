import { Component, OnInit } from '@angular/core';
import { AlumnosService } from './../services/alumnos/alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public alumnos:any;
  //id para pasar a child

  constructor(private userService: AlumnosService,private routerServ: Router) {
    this.alumnos = [];
   }

  ngOnInit() {
    this.getAlumnos();
  }

  infoAlumno(idAl){
    this.routerServ.navigate(['/alumno/info', idAl]);
  }

  rutinasAlumno(idAl){
    console.log(idAl);
    this.routerServ.navigate(['/alumno/rutinas/',idAl]);
  }

  medicionesAlumno(idAl){
    this.routerServ.navigate(['/alumno/mediciones',idAl]);
  }


  getAlumnos(){
  	this.userService.getUsersStudents().subscribe(
  		res => {this.alumnos = res;console.log(res)},
  		error => {console.log(error)}
  		);
  }

}
