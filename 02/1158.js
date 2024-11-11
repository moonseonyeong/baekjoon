const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다.
 * 이제 순서대로 K번째 사람을 제거한다. 
 * 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 
 * 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 
 * 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.
 * [1,2,3,4,5,6,7]
 * N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.
 */

class Queue {
  list;
  capacity;
  size;
  front;
  rear;

  constructor(capacity) {
    this.list = [];
    this.capacity = capacity;
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }
  push(value) {
    this.list[this.rear % this.capacity] = value;
    this.rear++;
    this.size++;
  }

  pop() {
    if (!this.size) return undefined;

    const node = this.list[this.front % this.capacity];
    this.list[this.front % this.capacity] = null;
    this.size--;
    this.front++;

    return node;
  }

}

let N, K;
const result = [];

rl.on('line', (line) => {
  [N, K] = line.split(' ').map(Number);
}).on('close', () => {
  const queue = new Queue(N);

  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  let i = 1;
  while (queue.size) {
    const cur = queue.pop();
    if (i === K) {
      i = 0;
      result.push(cur);
    } else {
      queue.push(cur);
    }
    i++;
  };

  console.log(`<${result.join(', ')}>`);
  process.exit();
});
