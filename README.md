# Sprint Deps Graph Trello

![Sprint Dependencies Graph - Trello](https://lh3.googleusercontent.com/-kX5QpXh0DQw/XBrSQ7k5cRI/AAAAAAAACmQ/KQdtfQkN18UX9GryBazaRJT90HprgAZawCLcBGAs/h1600/Sprint%2BDependencies%2BGraph%2BTrello.png "Sprint Dependencies Graph - Trello")

If you plan your development sprints on [Trello](https://trello.com/), **Sprint Deps Graph Trello** allows you to build a dependency graph for your sprint cards on Trello:
  - Tag your sprint cards (that you want to have in your dependency graph) with a specific `label`
  - Go to [Sprint Deps Graph Trello](https://sprint-deps-graph-trello.herokuapp.com/)
  - Grant **Sprint Deps Graph Trello** a `one day` `read only` access to your boards
  - Select your sprint's `board` then `label`
  - Generate dependencies via the form at the top (you can select multiple card identifiers)
  - Screen-shot your final dependency graph, upload it to your `sprint goal` card
 
 ## Tips to manipulate the board
 Once your cards appear on the board, you can:
   - Re-organize cards
   - Use the `Fit to page` button, so that the cards will fill the width of the board
   - Use keyboard shortcuts (`ctrl-c`: copy, `ctrl-x`: cut, `ctrl-v`: paste, `ctrl-z`: undo, `ctrl-y`: redo) on cards and links
   - Select multiple cards and links (hold `ctrl` before clicking on the next element)

---
 
 **PS 1:** Some adjustments were made on the code in this repository before deploying to [Heroku](https://www.heroku.com/)

 **PS 2:** This project was made as a test of React Hooks
