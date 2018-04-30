import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../services/alumnos/alumnos.service';
import { ParamMap, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mediciones-instructor',
  templateUrl: './mediciones-instructor.component.html',
  styleUrls: ['./mediciones-instructor.component.css'],
  providers: [AlumnosService]
})
export class MedicionesInstructorComponent implements OnInit {

  dates: any = [];
  id: any;
  _table: any;

  constructor(private userServ: AlumnosService, private route: ActivatedRoute) {
    this._table = {};
  }

  ngOnInit() {
    this.getId();
    this.getTabla();
   }

  getId() {
    this.route.paramMap.switchMap((params: ParamMap) =>
                                  params.get('id')).subscribe(
                                        res => {this.id = res; },
                                        error => {console.log(error); },
                                  );
  }

  getTabla() {
      this.userServ.getTabla(this.id).subscribe(
        table => {this._table = table; console.log(table);
        this.setDates(); },
        error => {console.log(error); }
      );
  }

  setDates() {
    if (this._table.measures.length > 0) {
      for (let i = 0 ; i < this._table.measures[0].measures.length; i++) {
        this.dates.push(new Date(this.formatDate(this._table.measures[0].measures[i].day))) ;

      }
    }
  }

  formatDate(date) {
    const newDate = date.split("-", 3);
    const day = newDate[0] ;
    const month = newDate[1] ;
    const year = newDate[2] ;
    return (year + "-" + month + "-" + day);
  }
}
