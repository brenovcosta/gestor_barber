import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Servico} from "../model/servico.model";

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private resourceUrl = environment.serviceUrl + '/servico';

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.resourceUrl);
  }

  findById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.resourceUrl}/${id}`);
  }

  create(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.resourceUrl, servico)
  }

  delete(id: number){
    return this.http.delete<Servico>(`${this.resourceUrl}/${id}`);
  }

  update(servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(this.resourceUrl, servico)
  }

}
