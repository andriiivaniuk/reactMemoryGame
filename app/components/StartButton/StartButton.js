import React, { Component } from 'react';
import "./StartButton.css"

export class StartButton extends Component{
    render(){
        return(
            <button className='start-button' onClick = {this.props.onClick}>
                Start game
            </button>
        )
    }
}