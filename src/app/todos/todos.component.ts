import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([])

  ngOnInit(): void {
      this.todoService.getTodosFromApi().pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((todos)=>{
        this.todoItems.set(todos)
      })
  }

  updataTodoItem (todoItems: Todo){
    this.todoItems.update((todo)=>{
      return todo.map(todo => {
        if (todo.id == todoItems.id){
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }

}
