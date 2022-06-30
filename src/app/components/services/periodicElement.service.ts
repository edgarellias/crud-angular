import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PeriodicElement } from "../models/PeriodicElement";

@Injectable()
export class PeriodicElementService{
  elementApiUrl = 'https://crudcrud.com/api/27bed53e90cb4b56b4342ec75e33ce57/usuarios'
  constructor(private http: HttpClient){}

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiUrl)
  }
  createElements(element: PeriodicElement): Observable<PeriodicElement>{
    return this.http.post<PeriodicElement>(this.elementApiUrl, element);
  }
  editElement(element: PeriodicElement): Observable<void> {
    const body = {
      name: element.name,
      weight: element.weight,
      age: element.age,
    };
    return this.http.put<void>(`${this.elementApiUrl}/${element._id}`, body);
    }
  deleteElement(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${_id}`)
  }
}


// ${this.elementApiUrl}/${element._id}
//
