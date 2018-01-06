function Square(props){
  return (
    <button className = "square" onClick = {() => props.onClick()}>
      {props.value}
      </button>
    );
  }

  /*
  props is a parameter that stores argument passed   to the component. The return functions returns thee description of what needs to be rendered. React takes that description and renders it.
  */

  /*
  => : new functionality in JS
  */

  /* after on click the square member is updated to new value which can be retrieved by calling value on props */

class Board extends React.Component {
  /* It is almost like creating a user defined html tag. It can be useful to avoid code repetition and can be used at multiple place in html. */
  constructor(){
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  /* slice to copy the array */
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  /* passing two props vaalue and function */
  renderSquare(i) {
    return <Square value = {this.state.squares[i]} onClick = {() => this.handleClick(i)} />;
  }
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(){
    super();
    this.state = {
      /* TODO */
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
