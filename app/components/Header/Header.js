import React, { Component } from 'react';
import "./Header.css"

export class Header extends Component{

    constructor(props){
        super(props);
    }

    render(){
        
        return( 
            
            <header className='header'>
                {this.props.headerText}
            </header>  
            
        )
        
    }
}

 
