import React, { Component } from 'react';
import "./Square.css";
import { GameState } from '../../containers/App/contextCreator.js';

export class Square extends Component {
    constructor(props){
        super(props);

        this.state = {
            classString: "square",
            id: this.props.id,
            realValue: this.props.value,
            shownValue: "?",
            isShown: this.props.isShown,
            washidden: false,
            wasGuessed: false,
        }
        
    }

    static contextType = GameState;

    componentDidUpdate = () => {
        if(!this.state.washidden && this.props.washidden){

            this.setState({
                classString: this.state.classString + " hidden",
                id: this.props.id,
                realValue: this.props.value,
                shownValue: "?",
                isShown: this.props.isShown,
                washidden: true,
                wasGuessed: false,
            })
        }
    }

    onClickFunc = () => {
        if(this.context.gameState === "game over" || this.context.gameState === "YOU WIN"){
            return;
        }
        if(this.state.wasGuessed === true){
            return;
        }
        this.props.checkFunc(this.state.id, this.addGuessingStyle);
        
    }

    addGuessingStyle = (isRight) => {
        if(isRight){

            
            this.setState({
                classString: "square right-answer",
                id: this.props.id,
                realValue: this.props.value,
                shownValue: "?",
                isShown: true,
                washidden: true,
                wasGuessed: true,
            })
        }

        else{
            this.setState({
                classString: "square wrong-answer",
                id: this.props.id,
                realValue: this.props.value,
                shownValue: "?",
                isShown: false,
                washidden: true,
                wasGuessed: false,
            })

            setTimeout( ()=> {
                this.setState({
                    classString: "square hidden",
                    id: this.props.id,
                    realValue: this.props.value,
                    shownValue: "?",
                    isShown: false,
                    washidden: true
                })
            }, 500);
        }
    }

    render(){
        return(
            <div className={this.state.classString} onClick = { ()=> {this.onClickFunc() }}>
                <span>{this.context.gameState === "game over" ? this.state.realValue : false}</span>
                <span>{this.context.gameState === "recall" || this.context.gameState === "YOU WIN" && this.state.isShown ? this.state.realValue : false}</span>
                <span>{this.context.gameState === "waiting" ?  this.state.shownValue : false} </span>
                <span>{this.context.gameState === "memo" &&  this.state.realValue ? `${this.state.realValue}` : false} </span>
            </div>
        )
    }
}