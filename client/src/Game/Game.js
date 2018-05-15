import React, {Component} from "react";
import axios from "axios";

let gameAxios = axios.create()

gameAxios.interceptors.request.use((config) => {
    const token = localStorage.token
    config.headers.Authorization = `Bearer ${token}`
    return config
});

class Game extends Component {
    constructor() {
        super()
        this.state = {
            firstPlayerInitial: "P1",
            secondPlayerInitial: "P2",
            currentPlayerInitial: "P1",
            firstPlayerScore: 0,
            secondPlayerScore: 0,
            counter: 1
        }
        this.enter = this.enter.bind(this)
        this.clicked = this.clicked.bind(this)
        this.reset = this.reset.bind(this)
        this.saveGame = this.saveGame.bind(this)
    }

    componentDidMount() {
        var blackBorder = "5px solid black";
        /* when component loads, it'll grab everything from localStorage, which has key value pairs I will go into detail later */
        for (var i in window.localStorage) {
            if (document.querySelector(i) !== null) {

                var value = localStorage.getItem(i);
                var keyDiv = document.querySelector(i)
                if (value.includes("Top")) {
                    keyDiv.style.borderTop = blackBorder;
                }
                if (value.includes("Left")) {
                    keyDiv.style.borderLeft = blackBorder;
                }
                if (value.includes("Right")) {
                    keyDiv.style.borderRight = blackBorder;
                }
                if (value.includes("Bottom")) {
                    keyDiv.style.borderBottom = blackBorder;
                }
                if (value.includes("P1")) {
                    keyDiv.value = "P1";
                    keyDiv.style.backgroundColor = "Blue"
                    this.setState(prevstate => {
                        return {
                            firstPlayerScore: prevstate.firstPlayerScore + 1
                        }
                    })
                }
                if (value.includes("P2")) {
                    keyDiv.value = "P2";
                    keyDiv.style.backgroundColor = "Red"
                    this.setState(prevstate => {
                        return {
                            secondPlayerScore: prevstate.secondPlayerScore + 1
                        }
                    })
                }
            }
        }

    }



    enter(e) {
        e.preventDefault()
        var div = document.querySelector(`div.${this.state.currentRow} input.${this.state.currentSquare}`)
        if (div !== null) {

            if (div.value === "P1" || div.value === "P2") {
                alert("Please select a non-completed square!");
                return;
            }

            var p1CurrentScore = this.state.firstPlayerScore;
            var p2CurrentScore = this.state.secondPlayerScore;
            var rowNumOriginal = this.state.currentRow.split('')[1];
            var colNumOriginal = this.state.currentSquare.split('')[5]
            var rowNumber = this.state.currentRow.split('')[1];
            var columnNumber = this.state.currentSquare.split('')[5]
            var divBottom = document.querySelector(`div.r${Number(rowNumber) + Number(1)} input.col.c${columnNumber}`)
            var divTop = document.querySelector(`div.r${Number(rowNumber) - Number(1)} input.col.c${columnNumber}`)
            var divLeft = document.querySelector(`div.r${rowNumber} input.col.c${Number(columnNumber) - Number(1)}`)
            var divRight = document.querySelector(`div.r${rowNumber} input.col.c${Number(columnNumber) + Number(1)}`)
            var scoreBonusChecker = 0;
            const blackBorder = "5px solid black";
            const blueBorder = "5px solid blue";
            const redBorder = "5px solid red";

            if (div.style.borderTop === blueBorder || div.style.borderTop === redBorder) {
                div.style.borderTop = blackBorder;
                localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Top"
                if (rowNumber > 1) {
                    rowNumber--;
                    document.querySelector(`div.r${rowNumber} input.col.c${columnNumber}`).style.borderBottom = blackBorder;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Bottom"

                }
            }

            if (div.style.borderLeft === blueBorder || div.style.borderLeft === redBorder) {
                div.style.borderLeft = blackBorder;
                localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Left"
                if (columnNumber > 1) {
                    columnNumber--;
                    document.querySelector(`div.r${rowNumber} input.col.c${columnNumber}`).style.borderRight = blackBorder;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Right"
                }
            }

            if (div.style.borderRight === blueBorder || div.style.borderRight === redBorder) {
                div.style.borderRight = blackBorder;
                localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Right"
                if (columnNumber < 5) {
                    columnNumber++;
                    document.querySelector(`div.r${rowNumber} input.col.c${columnNumber}`).style.borderLeft = blackBorder;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Left"
                }
            }

            if (div.style.borderBottom === blueBorder || div.style.borderBottom === redBorder) {
                div.style.borderBottom = blackBorder;
                localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Bottom"
                if (rowNumber < 5) {
                    rowNumber++;
                    document.querySelector(`div.r${rowNumber} input.col.c${columnNumber}`).style.borderTop = blackBorder;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += "Top"
                }
            }

            if ((div.style.borderRight === blackBorder && div.style.borderBottom === blackBorder && div.style.borderLeft === blackBorder && div.style.borderTop === blackBorder) || div.style.border === blackBorder) {
                div.value = this.state.currentPlayerInitial;
                scoreBonusChecker = scoreBonusChecker + 1;
                localStorage[`div.r${rowNumOriginal} input.col.c${colNumOriginal}`] += this.state.currentPlayerInitial;
                if (this.state.currentPlayerInitial === "P1") {
                    div.style.backgroundColor = "Blue"
                } else {
                    div.style.backgroundColor = "Red"
                }

            }

            if (divTop !== null) {
                if (((divTop.style.borderRight === blackBorder && divTop.style.borderBottom === blackBorder && divTop.style.borderLeft === blackBorder && divTop.style.borderTop === blackBorder) || divTop.style.border === blackBorder) && divTop.value !== "P1" && divTop.value !== "P2") {
                    divTop.value = this.state.currentPlayerInitial;
                    scoreBonusChecker = scoreBonusChecker + 1;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += this.state.currentPlayerInitial;
                    if (this.state.currentPlayerInitial === "P1") {
                        divTop.style.backgroundColor = "Blue"
                    } else {
                        divTop.style.backgroundColor = "Red"
                    }

                }
            }

            if (divBottom !== null) {
                if (((divBottom.style.borderRight === blackBorder && divBottom.style.borderBottom === blackBorder && divBottom.style.borderLeft === blackBorder && divBottom.style.borderTop === blackBorder) || divBottom.style.Border === blackBorder) && divBottom.value !== "P1" && divBottom.value !== "P2") {
                    divBottom.value = this.state.currentPlayerInitial;
                    scoreBonusChecker = scoreBonusChecker + 1;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += this.state.currentPlayerInitial;
                    if (this.state.currentPlayerInitial === "P1") {
                        divBottom.style.backgroundColor = "Blue"
                    } else {
                        divBottom.style.backgroundColor = "Red"
                    }
                }
            }

            if (divLeft !== null) {
                if (((divLeft.style.borderRight === blackBorder && divLeft.style.borderBottom === blackBorder && divLeft.style.borderLeft === blackBorder && divLeft.style.borderTop === blackBorder) || divLeft.style.border === blackBorder) && divLeft.value !== "P1" && divLeft.value !== "P2") {
                    divLeft.value = this.state.currentPlayerInitial;
                    scoreBonusChecker = scoreBonusChecker + 1;
                    localStorage[`div.r${rowNumber} input.col.c${columnNumber}`] += this.state.currentPlayerInitial;
                    if (this.state.currentPlayerInitial === "P1") {
                        divLeft.style.backgroundColor = "Blue"
                    } else {
                        divLeft.style.backgroundColor = "Red"
                    }
                }
            }

            if (divRight !== null) {
                if (((divRight.style.borderRight === blackBorder && divRight.style.borderBottom === blackBorder && divRight.style.borderLeft === blackBorder && divRight.style.borderTop === blackBorder) || divRight.style.border === blackBorder) && divRight.value !== "P1" && divRight.value !== "P2") {
                    divRight.value = this.state.currentPlayerInitial;
                    scoreBonusChecker = scoreBonusChecker + 1;
                    if (this.state.currentPlayerInitial === "P1") {
                        divRight.style.backgroundColor = "Blue"
                    } else {
                        divRight.style.backgroundColor = "Red"
                    }

                }
            }

            if (this.state.currentPlayerInitial === "P1" && scoreBonusChecker > 0) {
                this.setState(prevstate => {
                    return {
                        firstPlayerScore: prevstate.firstPlayerScore + 1
                    }
                })
                p1CurrentScore = p1CurrentScore + scoreBonusChecker
            }
            if (this.state.currentPlayerInitial === "P2" && scoreBonusChecker > 0) {
                this.setState(prevstate => {
                    return {
                        secondPlayerScore: prevstate.secondPlayerScore + 1
                    }
                })
                p2CurrentScore = p2CurrentScore + scoreBonusChecker;
            }

            if (scoreBonusChecker < 1) {
                if (this.state.currentPlayerInitial === "P1") {
                    this.setState(prevstate => {
                        return {currentTurn: "Player 2's Turn", currentPlayerInitial: "P2"}
                    })
                }
                if (this.state.currentPlayerInitial === "P2") {
                    this.setState(prevstate => {
                        return {currentTurn: "Player 1's Turn", currentPlayerInitial: "P1"}
                    })
                }
            }

        } else {
            alert("You must select a Square!");
        }

        if (p1CurrentScore + p2CurrentScore >= 25) {
            if (p1CurrentScore > p2CurrentScore) {
                alert("Player 1 Wins!");
                localStorage.winner = "Player 1"
            } else {
                alert("Player 2 Wins!");
                localStorage.winner = "Player 2"
            }
        }

        scoreBonusChecker = 0;
        let allBoxes = document.querySelectorAll(`.col`)
        for (let i = 0; i < allBoxes.length; i++) {

            if ((allBoxes[i].style.borderLeft === "5px solid blue" || allBoxes[i].style.borderTop === "5px solid blue" || allBoxes[i].style.borderRight === "5px solid blue" || allBoxes[i].style.borderBottom === "5px solid blue") || (allBoxes[i].style.borderLeft === "5px solid red" || allBoxes[i].style.borderTop === "5px solid red" || allBoxes[i].style.borderRight === "5px solid red" || allBoxes[i].style.borderBottom === "5px solid red")) {

                if (allBoxes[i].style.borderTop !== "5px solid black") {
                    allBoxes[i].style.borderTop = "4px solid white"
                }
                if (allBoxes[i].style.borderLeft !== "5px solid black") {
                    allBoxes[i].style.borderLeft = "4px solid white"
                }
                if (allBoxes[i].style.borderBottom !== "5px solid black") {
                    allBoxes[i].style.borderBottom = "4px solid white"
                }
                if (allBoxes[i].style.borderRight !== "5px solid black") {
                    allBoxes[i].style.borderRight = "4px solid white"
                }

            }
        }
    }



    saveGame(e) {
        e.preventDefault()
        let winner = {
            gameNumber: 2,
            moves: [],
            winner: localStorage.winner
        }
        gameAxios.post('/api/games', winner).then(response => {
        console.log(response)
    })
    // axios.post("localhost:9000/api/games" {headers: {"Authorization": `Bearer ${tokenID}`})

}

reset(e) {
    e.preventDefault();
    this.setState({
        firstPlayerInitial: "P1",
        secondPlayerInitial: "P2",
        currentPlayerInitial: "P1",
        currentTurn: "Player 1's Turn",
        firstPlayerScore: 0,
        secondPlayerScore: 0,
        counter: 1
    })
    let allBoxes = document.querySelectorAll(`.col`)
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.border = "4px solid white"
        allBoxes[i].style.backgroundColor = 'rgba(205, 68, 100, .3)';
        allBoxes[i].value = "";
    }
    for (var key in localStorage) {
        if (key.includes("div")) {
            localStorage.removeItem(key)
        }
    }
}

clicked(e) {
    const blackBorder = "5px solid black"
    const blueBorder = "5px solid blue"
    const redBorder = "5px solid red"
    e.preventDefault()
    if (this.state.counter === 1) {
        if (e.target.style.borderTop !== blackBorder) {
            if (e.target.style.borderLeft !== blackBorder) {
                e.target.style.borderLeft = ""
            }
            if (e.target.style.borderRight !== blackBorder) {
                e.target.style.borderRight = ""
            }
            if (e.target.style.borderBottom !== blackBorder) {
                e.target.style.borderBottom = ""
            }

            if (this.state.currentPlayerInitial === "P1") {
                e.target.style.borderTop = blueBorder
            } else {
                e.target.style.borderTop = redBorder
            }
        }

    }
    if (this.state.counter === 2) {
        if (e.target.style.borderRight !== blackBorder) {
            if (e.target.style.borderLeft !== blackBorder) {
                e.target.style.borderLeft = ""
            }
            if (e.target.style.borderTop !== blackBorder) {
                e.target.style.borderTop = ""
            }
            if (e.target.style.borderBottom !== blackBorder) {
                e.target.style.borderBottom = ""
            }
            if (this.state.currentPlayerInitial === "P1") {
                e.target.style.borderRight = blueBorder
            } else {
                e.target.style.borderRight = redBorder
            }
        }
    }
    if (this.state.counter === 3) {
        if (e.target.style.borderBottom !== blackBorder) {
            if (e.target.style.borderLeft !== blackBorder) {
                e.target.style.borderLeft = ""
            }
            if (e.target.style.borderRight !== blackBorder) {
                e.target.style.borderRight = ""
            }
            if (e.target.style.borderTop !== blackBorder) {
                e.target.style.borderTop = ""
            }
            if (this.state.currentPlayerInitial === "P1") {
                e.target.style.borderBottom = blueBorder
            } else {
                e.target.style.borderBottom = redBorder
            }
        }
    }
    if (this.state.counter === 4) {
        if (e.target.style.borderLeft !== blackBorder) {
            if (e.target.style.borderTop !== blackBorder) {
                e.target.style.borderTop = "";
            }
            if (e.target.style.borderRight !== blackBorder) {
                e.target.style.borderRight = "";
            }
            if (e.target.style.borderBottom !== blackBorder) {
                e.target.style.borderBottom = "";
            }
            if (this.state.currentPlayerInitial === "P1") {
                e.target.style.borderLeft = blueBorder
            } else {
                e.target.style.borderLeft = redBorder
            }
        }
    }
    if (this.state.counter > 4) {
        this.setState({counter: 0})

        if (e.target.style.borderLeft !== blackBorder) {
            e.target.style.borderLeft = "";
        }
        if (e.target.style.borderRight !== blackBorder) {
            e.target.style.borderRight = "";
        }
        if (e.target.style.borderBottom !== blackBorder) {
            e.target.style.borderBottom = "";
        }
        if (e.target.style.borderTop !== blackBorder) {
            e.target.style.borderTop = "";
        }
    }
    this.setState(prevstate => {
        return {
            counter: prevstate.counter + 1
        }
    })

    var modClassName = e.target.className;
    modClassName = modClassName.replace(' ', '.')
    this.setState({currentSquare: modClassName, currentRow: e.target.name})
}

render() {

    return (<div className="gameBody">
        <form className="row-container" onSubmit={this.enter}>
            <div id="r1" className="row r1">
                <input className="col c1" type="button" name="r1" onClick={this.clicked}></input>
                <input className="col c2" type="button" name="r1" onClick={this.clicked}></input>
                <input className="col c3" type="button" name="r1" onClick={this.clicked}></input>
                <input className="col c4" type="button" name="r1" onClick={this.clicked}></input>
                <input className="col c5" type="button" name="r1" onClick={this.clicked}></input>
            </div>
            <div className="row r2">
                <input className="col c1" type="button" name="r2" onClick={this.clicked}></input>
                <input className="col c2" type="button" name="r2" onClick={this.clicked}></input>
                <input className="col c3" type="button" name="r2" onClick={this.clicked}></input>
                <input className="col c4" type="button" name="r2" onClick={this.clicked}></input>
                <input className="col c5" type="button" name="r2" onClick={this.clicked}></input>
            </div>
            <div className="row r3">
                <input className="col c1" type="button" name="r3" onClick={this.clicked}></input>
                <input className="col c2" type="button" name="r3" onClick={this.clicked}></input>
                <input className="col c3" type="button" name="r3" onClick={this.clicked}></input>
                <input className="col c4" type="button" name="r3" onClick={this.clicked}></input>
                <input className="col c5" type="button" name="r3" onClick={this.clicked}></input>
            </div>
            <div className="row r4">
                <input className="col c1" type="button" name="r4" onClick={this.clicked}></input>
                <input className="col c2" type="button" name="r4" onClick={this.clicked}></input>
                <input className="col c3" type="button" name="r4" onClick={this.clicked}></input>
                <input className="col c4" type="button" name="r4" onClick={this.clicked}></input>
                <input className="col c5" type="button" name="r4" onClick={this.clicked}></input>
            </div>
            <div className="row r5">
                <input className="col c1" type="button" name="r5" onClick={this.clicked}></input>
                <input className="col c2" type="button" name="r5" onClick={this.clicked}></input>
                <input className="col c3" type="button" name="r5" onClick={this.clicked}></input>
                <input className="col c4" type="button" name="r5" onClick={this.clicked}></input>
                <input className="col c5" type="button" name="r5" onClick={this.clicked}></input>
            </div>
            </form>
            <br/>
            <h2 className="currentTurnMarker"> It is currently {this.state.currentPlayerInitial}s turn.</h2>
           
             <div className="scoreAndButton">
                <h3 className="score1">
                    {this.state.firstPlayerScore}
                </h3>
                <div className="buttonDiv">
                         <button className="button" onClick={this.saveGame}>
                            Save
                        </button>
                        <button className="submitButton" onClick={this.enter}>
                            Submit Line
                        </button>
                        <button className="button" onClick={this.reset}>
                            Reset
                        </button>
                </div>
                <h3 className="score2" >
                    {this.state.secondPlayerScore}
                </h3>

            </div>

    </div>)
}
}

export default Game;
