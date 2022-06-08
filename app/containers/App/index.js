import React, { Component } from 'react';
import {Field} from "../../components/Field/Field.js"
import {StartButton} from "../../components/StartButton/StartButton.js"
import { Header } from "../../components/Header/Header.js"
import { StateProvider} from "./contextCreator.js"
import { Footer } from '../../components/Footer/Footer.js';

export default class App extends Component {

  constructor(){
    super();
    this.state = {
        lives: 3,
        gameState: "waiting",
        headerText: "Waiting to start game",
        changeFunc: this.changeStateViaContext
    };
  }

  startGame = () => {
    console.log("start game");
    this.setState({
      lives: 3,
      gameState: "memo",
      headerText: "Remember all the digits!",
      changeFunc: this.changeStateViaContext
    });

    setTimeout(()=>{
      this.setState({
        lives: 3,
        gameState: "recall",
        headerText: "Recall all the digits!",
        changeFunc: this.changeStateViaContext
      });
      
    }, 4000)
  }

  changeStateViaContext = (newLives, newGameState, newHeaderText) => {
    this.setState({
      lives: newLives,
      gameState: newGameState,
      headerText: newHeaderText,
      changeFunc: this.changeStateViaContext
    })
  }


  render(){
    return (
       
      <StateProvider value = {
        {
          lives: this.state.lives,
          gameState: this.state.gameState,
          headerText: this.state.headerText,
          changeFunc: this.state.changeFunc
        }
      }>
        <div className='App'>
          
          <Header headerText = {this.state.headerText}/>

          <Field />
          <Footer/>
          
          <StartButton onClick = {this.startGame}/>
          
        </div>
        </StateProvider>

    );
  }
}
