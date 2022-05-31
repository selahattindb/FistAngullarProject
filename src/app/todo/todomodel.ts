import { TodoItem } from "./todoitem";

export class Model {
    items: TodoItem[]=[];

    constructor() {
        this.items = [];
    }
}