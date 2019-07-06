import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return(
        <button className="square">
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return(
            <Square id={i} value={this.props.squares[i]} onClick={(i) => this.props.onClick(i)}/>
        )
    }

    render() {
        return(
            <div>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        let testArray=Array(9).fill(null);
        testArray[4]="X";
        this.state = {
            squares: testArray,
            xTurn: true,
        }
    }

    handleClick(i) {
        return;
    }

    render() {
        return(
            <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById("root"))
