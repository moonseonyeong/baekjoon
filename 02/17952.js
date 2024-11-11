const readline = require('readline');
const { resourceLimits } = require('worker_threads');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


class Stack {
  list;
  capacity;
  rear;

  constructor(capacity) {
    this.list = [];
    this.capacity = capacity;
    this.rear = 0;
  }
  push(value) {
    this.list[this.rear % this.capacity] = value;
    this.rear++;
  }

  pop() {
    if (!this.list.length) return undefined;
    this.rear--;

    const node = this.list[this.rear % this.capacity];
    this.list[this.rear % this.capacity] = null;

    return node;
  }

}


/**
 * 과제는 가장 최근에 나온 순서대로 한다. 
 * 과제를 받으면 바로 시작한다.
 * 과제를 하던 도중 새로운 과제가 나온다면, 새로운 과제를 진행한다.
 * 새로운 과제가 끝났다면, 이전에 하던 과제를 이전에 하던 부분부터 이어서 한다. 
 * [
 * [Time],
 * [1,50,20],
 * [0]
 * ]
 */


let result = 0;
const input = [];

rl.on('line', (line) => {
  input.push(line.split(" ").map(Number));
}).on('close', () => {
  const [[N], ...list] = input;
  const stack = new Stack(N);

  for (let i = 0; i < list.length; i++) {
    const [hasWork, score, time] = list[i];

    if (hasWork) {
      stack.push([score, time]);
    }

    const work = stack.pop();
    if (!work) continue;

    work[1]--;
    if (!work[1]) {
      result += work[0];
    } else {
      stack.push(work)
    }
  }

  console.log(result);
  process.exit();
});
