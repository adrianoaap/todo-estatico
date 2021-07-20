import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './Todo'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiTodo: string = 'http://localhost:8080/api/todo'

  constructor(private http: HttpClient) { }

  salvar(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiTodo, todo)
  }

  listar(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiTodo);
  }

  deletar(id: number): Observable<void> {
    const url = `${this.apiTodo}/${id}`
    return this.http.delete<void>(url);
  }

  marcarConcluido(id: number): Observable<Todo> {
    const url = `${this.apiTodo}/${id}/feito`
    return this.http.patch<Todo>(url, {})
  }

}
