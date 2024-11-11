type HeapNodeType = {
  score: number;
};

class HeapNode {
  node: HeapNodeType;
  isMax: boolean;

  constructor(node: HeapNodeType, isMax: boolean) {
    this.node = node;
    this.isMax = isMax;
  }

  get score() {
    return this.isMax ? this.node.score : -this.node.score;
  }
}

class Heap {
  private heap: [null, ...HeapNode[]];
  protected _size: number;
  protected isMax: boolean;

  constructor(isMax: boolean = true) {
    this.heap = [null];
    this._size = 0;
    this.isMax = isMax;
  }

  get size() {
    return this._size;
  }

  private heapUp() {
    let idx = this.size + 1;

    while (idx > 1) {
      const node = this.heap[idx]!;
      const fatherIdx = Math.floor(idx / 2);
      const father = this.heap[fatherIdx]!;

      if (node?.score <= father?.score) return;

      this.heap[idx] = father;
      this.heap[fatherIdx] = node;
      idx = fatherIdx;
    }
  }

  private getBetterChildIdx(idx: number) {
    const leftIdx = idx * 2;
    const rightIdx = idx * 2 + 1;

    const left = this.heap[leftIdx]!;
    const right = this.heap[rightIdx];
    if (!right) return leftIdx;

    return left?.score > right.score ? leftIdx : rightIdx;
  }

  private heapDown() {
    let idx = 1;
    while (idx * 2 <= this.size) {
      const node = this.heap[idx]!;

      // 자식이 있는지 검증
      const childIdx = this.getBetterChildIdx(idx);
      const childNode = this.heap[childIdx]!;

      if (node.score > childNode.score) return;

      // 내 자식이 나보다 점수가 높아
      this.heap[childIdx] = node;
      this.heap[idx] = childNode;

      idx = childIdx;
    }
  }

  insert(node: HeapNodeType) {
    const heapNode = new HeapNode(node, this.isMax);
    this.heap.push(heapNode);
    this._size++;
    this.heapUp();
  }

  takeout() {
    if (this.size === 0) return undefined;

    const head = this.heap[1];
    const node = this.heap.pop()!;
    this._size--;
    this.heap[1] = node;
    this.heapDown();

    return head;
  }
}

const list: any[] = [
  {
    name: 'a',
    score: 7,
  },
  {
    name: 'b',
    score: 9,
  },
  {
    name: 'c',
    score: 3,
  },
  {
    name: 'f',
    score: 2,
  },
  {
    name: 'd',
    score: 1,
  },
];
const heap = new Heap();
list.forEach((el) => heap.insert(el));
console.log(heap);

while (heap.size > 0) {
  console.log(heap.takeout());
}

/* --------------------------------------------------------------------------------------- */

// 힙구조는 최대 최소 값을 조회하는 케이스만을 위해 설계되어 있어 맥스힙 민힙 두가지만 고려하면 되며, 구조또한 둘이똑같다.
