import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Agenda} from "../model/agenda.model";
import {SituacoesUtil} from "../util/situacoes.util";

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

  buscaReservados(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.resourceUrl}/reservado/${SituacoesUtil.RESERVADO.descricao}`);
  }

  buscaConcluidos(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.resourceUrl}/reservado/${SituacoesUtil.CONCLUIDO.descricao}`);
  }

  buscaDisponiveis(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.resourceUrl}/disponivel/${SituacoesUtil.DISPONIVEL.descricao}`);
  }

  agendar(agenda: Agenda): Observable<Agenda> {
    return this.http.put<Agenda>(`${this.resourceUrl}/agendar`, agenda)
  }

}
