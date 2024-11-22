const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * M×N 크기의 보드를 찾았다. 
 * 검은색으로 칠해져 있고, 나머지는 흰색으로 칠해져 있다. 
 * 지민이는 이 보드를 잘라서 8×8 크기의 체스판으로 만들려고 한다.
 * 
 * 체스판은 검은색과 흰색이 번갈아서 칠해져 있어야 한다. 
 * 구체적으로, 각 칸이 검은색과 흰색 중 하나로 색칠되어 있고, 
 * 변을 공유하는 두 개의 사각형은 다른 색으로 칠해져 있어야 한다. 
 * 
 * 따라서 이 정의를 따르면 체스판을 색칠하는 경우는 두 가지뿐이다.
 * 하나는 맨 왼쪽 위 칸이 흰색인 경우, 하나는 검은색인 경우이다.
 * 
 * 보드가 체스판처럼 칠해져 있다는 보장이 없어서, 지민이는 8×8 크기의 체스판으로 잘라낸 후에 몇 개의 정사각형을 다시 칠해야겠다고 생각했다. 
 * 당연히 8*8 크기는 아무데서나 골라도 된다. 
 * 다시 칠해야 하는 정사각형의 "최소 개수"를 구해라
 * 
 * 8 <= N, M <= 50
 * 
 */

const input = [];
rl.on('line', (line) => {
  input.push(line)


}).on('close', () => {
  const [info, ...board] = input;
  const [Y, X] = info.split(" ").map(Number);

  let min = 64;
  const color = ["W", "B"];

  /* 첫 색 */
  for (let c = 0; c < 2; c++) {
    for (let y = 0; y <= Y - 8; y++) {
      for (let x = 0; x <= X - 8; x++) {
        let count = 0;
        let ySum = 0;
        /* 검사 */
        for (let i = y; i < y + 8; i++) {
          let xSum = 0;
          for (let j = x; j < x + 8; j++) {
            const cur = color[(c + ySum + xSum) % 2];

            if (board[i][j] !== cur) {
              count++;
            }
            xSum++;
          }
          ySum++;
        }

        if (count < min) {
          min = count;
        }
        if (min === 0) {
          console.log(0);
          process.exit();
        }

      }
    }
  }

  console.log(min);
  process.exit();
})