const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const result = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, ...list] = input;
  for (let i = 0; i < Number(N); i++) {
    const words = list[i];
    const stack = words.split(' ');
    const newWords = [];
    while (stack.length) {
      newWords.push(stack.pop());
    }

    result.push(`Case #${i + 1}: ` + newWords.join(' '));
  }

  console.log(result.join('\n'));
  process.exit();
});
