const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  //my test
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo item', () => {
    expect(list.first()).toBe(todo1);
  });

  test('calling last resturns the last todo item', () => {
    expect(list.last()).toBe(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    let todo = list.shift();
    expect(todo).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last item in the list', () => {
    let todo = list.pop();
    expect(todo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone test if all the item on the list has been done', () => {
    expect(list.isDone()).toBe(false);
  });

  test("add throws error when non todo item is added", () => {
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add(new TodoList('essay'))).toThrow(); //??
  });

  test('itemAt returns the item at given index', () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect((() => list.itemAt(5))).toThrow(ReferenceError);
  });

  test('markDoneAt marks done in the correct item', () => {
    expect(() => list.markDoneAt(6)).toThrow(ReferenceError);

    list.markDoneAt(1);

    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt marks undone in the correct item', () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('mark all items done', () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('check remove at', () => {
    expect((() => list.removeAt(7))).toThrow(ReferenceError);

    list.removeAt(0);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;
  
    list.markDoneAt(1);
  
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for all done todos', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
  
    list.markAllDone();
  
    expect(list.toString()).toBe(string);
  });

  test('verify forEach iterates over the elements', () => {
    let result = [];
    list.forEach(elm => result.push(elm));

    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});