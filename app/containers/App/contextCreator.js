import React, { Component } from "react";

export const GameState = React.createContext( 

    {
        lives: 0,
        gameState: "def",
        headerText: "def",
        changeFunc: () => {}
    }
);

export const StateProvider = GameState.Provider;
export const StateConsumer = GameState.Consumer;