
# Sarah's Mole Click Game

## Getting Started

 - Clone repo locally
 - Get into root of folder
 - Run `npm install`
 - Run `npm run start`
 - Navigate to localhost:3000 in a browser window

## Game Play

Note: Gameboard is not responsive. Browser should be on desktop with minimum height 900px.

On the screen, you should see title, Score, Time, and a game board of 24 light blue circles.

Click "Start" button at bottom of screen.

You have 60 seconds to click on brown moles that appear in blue circles.

Every second, 1 - 5 moles appear randomly.

If you click a mole, you will see white mole silhouette momentarily and the score will increase by 1.

If you refresh the page your score and mole placement will remain. At this point you must press "Start" for time to begin again and game play to resume.

If you ever want to pause the game just refresh.

At the end of 60 seconds, the game is over and you cannot interact with the board.

A button appears that says "Reset Game" to restart the game. The "Start" button must be pressed again.

## Implementation

This app is written in React and Typescript.

There are no css preprocessors.

The game logic is all in src/components/App.tsx.

It has one test. 