import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Agenda} from "../model/agenda.model";
import {SituacoesUtil} from "../util/situacoes.util";
import {Table} from "primeng/table";
import {RequestUtil} from "../util/RequestUtil";

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

  buscaReservados(agenda: Agenda, table: Table | undefined): Observable<any> {
    const params: HttpParams = RequestUtil.getRequestParams(table);
    return this.http.post(`${this.resourceUrl}/reservado`, agenda , {params: params});
  }

  filtrar(agenda: Agenda): Observable<any> {
    return this.http.post(`${this.resourceUrl}/filtrar`, agenda);
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

  gerarRelatorioPdf(agendaList: Agenda[]): Observable<any> {
    return this.http.post(`${this.resourceUrl}/exportar-pdf`, agendaList, {
      observe: "response",
      responseType: "arraybuffer"
    });
  }

}
