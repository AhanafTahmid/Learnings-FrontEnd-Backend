# Tutorial Link
https://react.dev/learn/tutorial-tic-tac-toe

# Tutorial

✅ Always create a new array when updating state.
const nextSquares = squares.slice(); // or [...squares]
nextSquares[0] = 'X';
setSquares(nextSquares); // React sees a new array → triggers re-render