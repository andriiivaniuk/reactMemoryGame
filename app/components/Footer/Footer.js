import React, { Component } from 'react';
import "./Footer.css"
import { GameState } from '../../containers/App/contextCreator.js';

export class Footer extends Component {
    static contextType = GameState;

    render(){
        return(
            <footer className='footer'>
                <span>lives left: {this.context.lives}</span>
            </footer>
        )
    }
}