const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue {
  list;
  capacity;
  size;
  front;
  rear;

  constructor(capacity) {
    this.list = [];
    this.capacity = capacity
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }

  push(value) {
    this.list[this.rear % this.capacity] = value;
    this.size++;
    this.rear++;
  }

  pop() {
    if (!this.size) return undefined;
    const node = this.list[this.front % this.capacity];
    this.list[this.front % this.capacity] = null;
    this.front++;
    this.size--;

    // if (this.size !== 1) {
    //   this.front++;
    // }
    // this.size--;

    return node;
  }
}


const result = [];
let N

rl.on('line', (line) => {
  N = Number(line);

}).on('close', () => {
  const queue = new Queue(N);

  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  while (queue.size) {
    result.push(queue.pop());

    if (queue.size === 0) break;
    queue.push(queue.pop());
  }

  console.log(result.join(" "));
  process.exit();
});
