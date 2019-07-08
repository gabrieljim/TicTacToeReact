import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return(
        <button id={props.id} className="square" onClick={props.onClick}>
            <span>{props.value}</span>
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return(
            <Square id={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
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
        this.state = {
            squares:Array(9).fill(null),
            xTurn: true,
            win: false,
            draw: false,
        }
    }

    handleClick(i) {
        if (this.state.squares[i] || this.state.win) {
            return;
        }
        let tempArray = this.state.squares.slice()
        tempArray[i] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            squares: tempArray,
            xTurn: !this.state.xTurn,
            win: this.anyWinYet(tempArray),
            draw: this.draw(tempArray)
        })
    }

    anyWinYet(squares){
        let positions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ] 

        for (let i = 0; i < positions.length; i++){
            const [a,b,c] = positions[i];
            document.getElementById(a).style.color='black';
            document.getElementById(b).style.color='black';
            document.getElementById(c).style.color='black';
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                document.getElementById(a).style.color='green';
                document.getElementById(b).style.color='green';
                document.getElementById(c).style.color='green';
                return ("El ganador es " + squares[a]);
            }
        }
    }

    draw(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.setState({
            squares:Array(9).fill(null),
            xTurn: true,
            win: false,
            draw:false,
        })
    }

    render() {
        let nextPlayer = this.state.xTurn ? 'X' : 'O';
        let message = ""
        if (this.state.win){
            message = this.state.win;
        }
        else if (this.state.draw) {
            message = "Es un empate";
        }
        else {
            message = "Siguiente en jugar: " + nextPlayer;
        }
        return(
            <div id="juego">
                <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)}/>
                <h1>{message}</h1>
                <button onClick={() => this.reset()}><h4>Volver a empezar</h4></button> 
            </div>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById("root"))
