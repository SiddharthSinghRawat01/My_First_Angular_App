import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: Todo[], searchTerms: string): Todo[] { // tranform  is the function that i need to use to make pipe work
    if(!searchTerms){
      return todos;
    }
    const text = searchTerms.toLowerCase();
    return todos.filter(todo => {
      return todo.title.toLowerCase().includes(text);
        
    })
  }

}
