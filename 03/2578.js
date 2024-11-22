const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
/**
문제
25칸 빙고 1부터 25까지 자연수
다음은 사회자가 부르는 수를 차례로 지워나간다.
가로줄, 세로줄, 대각선 5개의 모든 수가 지워지는 경우
이러한 선이 세 개 이상 그어지는 순간 "빙고"라고 외치는데

입력
첫째 줄부터 다섯째 줄까지 빙고판에 쓰여진 수가 가장 위 가로줄부터 차례대로 한 줄에 다섯 개씩 빈 칸을 사이에 두고 주어진다.
여섯째 줄부터 열째 줄까지 사회자가 부르는 수가 차례대로 한 줄에 다섯 개씩 빈 칸을 사이에 두고 주어진다. 빙고판에 쓰여진 수와 사회자가 부르는 수는 각각 1부터 25까지의 수가 한 번씩 사용된다.

출력
첫째 줄에 사회자가 몇 번째 수를 부른 후 철수가 "빙고"를 외치게 되는지 출력한다.

시간 제한	메모리 제한
1 초 => 시간이 촉박하다	128 MB => 적다
 */
const board = [];
const input = [];
rl.on('line', (line) => {
  if (board.length < 5) {
    board.push(line.split(' ').map(Number));
    return;
  }
  input.push(...line.split(' ').map(Number));
  //
}).on('close', () => {
  let bingo = 0;
  const location = {};
  const yCount = [0, 0, 0, 0, 0];
  const xCount = [0, 0, 0, 0, 0];
  let sumCount = 0;
  let sameCount = 0;

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      location[board[y][x]] = [y, x];
    }
  }



  for (let i = 0; i < input.length; i++) {
    const cur = input[i];
    const [y, x] = location[cur];
    yCount[y]++;
    xCount[x]++;

    if (x + y === 4) {
      sumCount++;
      if (sumCount === 5) {
        bingo++;
      }
    }

    if (x === y) {
      sameCount++;
      if (sameCount === 5) {
        bingo++;
      }
    }

    if (yCount[y] === 5) {
      bingo++;
    }
    if (xCount[x] === 5) {
      bingo++;
    }

    if (3 <= bingo) {
      console.log(i + 1);
      break;
    }
  }

  process.exit(0);
});
