export interface ITodo {
  id: string;
  title: string;
  description: string;
}

export class TodoRepository {
  private static todos: Array<ITodo> = [];

  static find = async (id?: string) => {
    if (id) {
      return this.todos.filter((todo) => todo.id === id);
    }
    return this.todos;
  };

  static create = async (todo: ITodo) => {
    this.todos.push(todo);
    console.log("TODO ??? ", this.todos);
    return todo;
  };

  static reset = () => {
    this.todos.length = 0;
  };
}
