import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCrear, UsuarioRespuesta } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly urlBase = 'api/usuarios';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<UsuarioRespuesta[]> {
    return this.http.get<UsuarioRespuesta[]>(this.urlBase);
  }

  obtenerPorId(id: number): Observable<UsuarioRespuesta> {
    return this.http.get<UsuarioRespuesta>(`${this.urlBase}/${id}`);
  }

  crear(dto: UsuarioCrear): Observable<UsuarioRespuesta> {
    return this.http.post<UsuarioRespuesta>(this.urlBase, dto);
  }

  actualizar(id: number, dto: UsuarioCrear): Observable<UsuarioRespuesta> {
    return this.http.put<UsuarioRespuesta>(`${this.urlBase}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
