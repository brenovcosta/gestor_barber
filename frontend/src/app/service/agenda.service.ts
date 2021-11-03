import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Agenda} from "../model/agenda.model";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private resourceUrl = environment.serviceUrl + '/agenda';

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.resourceUrl);
  }

  findById(id: number): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.resourceUrl}/${id}`);
  }

  create(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(this.resourceUrl, agenda)
  }

  delete(id: number){
    return this.http.delete<Agenda>(`${this.resourceUrl}/${id}`);
  }

  update(agenda: Agenda): Observable<Agenda> {
    return this.http.put<Agenda>(this.resourceUrl, agenda)
  }

}
