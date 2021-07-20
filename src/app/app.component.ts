import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TodoService } from './todo.service'
import { Todo } from './Todo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  todos: Todo[] = [];
  form: FormGroup = new FormGroup({
    descricao: new FormControl('', Validators.required)
  })

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.listarTodos() 
  }

  listarTodos() {
    this.todoService.listar()
      .subscribe(lista => this.todos = lista)
  }

  submit() {
    console.log(this.form.value);
    const todo: Todo = { ...this.form.value }
    this.todoService
      .salvar(todo)
      .subscribe(saveTodo => {
        this.todos.push(saveTodo);
        this.form.reset();
      });
  }

  delete(todo: Todo) {
    this.todoService
      .deletar(todo.id!)
      .subscribe({
        next: () => this.listarTodos()
      })
  }

  feito(todo: Todo){
    this.todoService.marcarConcluido(todo.id!)
    .subscribe({
      next: (todoAtualizado) => {
        todo.feito = todoAtualizado.feito
        todo.dataConclucao = todoAtualizado.dataConclucao
      }
    })
  }


}
