import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pessoa} from "../model/pessoa.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private resourceUrl = environment.serviceUrl + '/pessoa';

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.resourceUrl);
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.resourceUrl}/${id}`);
  }


  create(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.resourceUrl, pessoa)
  }

  delete(id: number){
    return this.http.delete<Pessoa>(`${this.resourceUrl}/${id}`);
  }

  update(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.resourceUrl, pessoa)
  }

}
