export class ITodo {
  id: number;
  name: string;
  memo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: Pick<ITodo, "memo" | "name"> & Partial<ITodo>) {
    this.id = params.id ?? Date.now();
    this.name = params.name;
    this.memo = params.memo;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = new Date();
  }
}

export class CreateTodoDTO {
  constructor(public name: string, public memo: string) {}

  toEntity(): ITodo {
    return new ITodo({ name: this.name, memo: this.memo });
  }
}

export class UpdateTodoDTO {
  constructor(public name: string, public memo: string) {}
}

export interface Data {
  todos: ITodo[];
}
