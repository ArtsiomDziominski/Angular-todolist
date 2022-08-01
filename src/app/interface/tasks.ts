
export interface ITask {
  id: number;
  name: string;
  status: Status;
  date: Date;
}

export enum Status {
  ToDo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
}
