import React, { Component } from 'react';
import "./Field.css";
import { Square } from '../Square/Square.js';
import { GameState } from '../../containers/App/contextCreator.js';

export class Field extends Component{


    squares = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    difficulty = 5;
    fieldMap = {};
    filledSquares = new Set();
    winCombo = [];
    wasShown = false;

    constructor(props){
        super(props);
        
        this.fillMap();
        
        this.state = {
            squaresHidden: false
        }
    }

    static contextType = GameState;

    fillMap = () => {
        while(this.filledSquares.size !== this.difficulty){
            this.filledSquares.add(Math.floor(Math.random() * 16) + 1);
        }

        this.filledSquares = Array.from(this.filledSquares).sort((a, b) => a > b ? 1 : -1);

        let valuesSet = new Set();
        while(valuesSet.size !== this.difficulty){
            valuesSet.add(Math.floor(Math.random() * this.difficulty) + 1);
        }
        const finalValues = Array.from(valuesSet);

        for(let i = 1, j = 0; i <= this.squares.length; i++){
            if(this.filledSquares[j] === i){
                this.fieldMap[i] = finalValues[j]; 
                j++;
            }
            else{
                this.fieldMap[i] = null;
            }
        }
        
        for(let i = 0; i < this.filledSquares.length; i++){
            this.winCombo.push({value: this.fieldMap[this.filledSquares[i]], square: this.filledSquares[i]});
        }

        this.winCombo.sort((a, b) => a.value > b.value ? 1: -1);
        this.winCombo = this.winCombo.map(x => x.square);

        console.log(this.winCombo);
        
    }

    hideSquares = () => {
        console.log("hiding squares");
        this.setState({
            squaresHidden: true
        })
    }

    showSquares = () => {
        if(this.context.gameState === "memo"){
            console.log("show squares");

            this.setState({
                squaresHidden: false
            });

            setTimeout(()=> {
                this.hideSquares();
            }, 4000)
        }
    }

    componentDidUpdate = () => {
        if (!this.wasShown && this.context.gameState === "memo" ){
            this.wasShown = true;
            this.showSquares();
        }
    }


    checkSquare = (butID, ifRightAnswer) => {

        if(this.context.gameState === "waiting" || this.context.gameState === "memo"){
            return;
        }


        if(butID === this.winCombo[0]){
            console.log("correct answer");
            ifRightAnswer(true);
            this.winCombo.shift();

            if(this.winCombo.length === 0){
                this.context.changeFunc(
                    this.context.lives,
                    "YOU WIN",
                    "YOU WIN",
                    this.context.changeFunc
                )
            }
        } else{

            ifRightAnswer(false);

            if(this.context.lives === 1){
                this.context.changeFunc(
                    0,
                    "game over",
                    "Game over",
                    this.context.changeFunc
                )
                return;
            }

            this.context.changeFunc(
                this.context.lives - 1,
                this.context.gameState,
                this.context.headerText,
                this.context.changeFunc
            )

        }

        console.log(butID);
    }
    
    render(){
        return(
            <div className='field'>
                {this.squares.map(x => <Square
                 isShown = {this.fieldMap[x]} key = {x} id = {x}
                 value = {this.fieldMap[x]}
                 washidden = {this.state.squaresHidden}
                 checkFunc = {this.checkSquare}
                 
                 />
                 )}
                 
            </div>
        )
    }
}