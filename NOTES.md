NEEDS:

- grids to display cells
- Each cell should have:
  - current state(alive, dead), (black, white)
  - Clickable/Tappable:
    - can be clicked to allow user to setup initial cell info
    - Should NOT be clickable while running
  - Behaviors
    - Toggle state funcitonaility: switch between alive and dead
- An appropriate data structre to hold a grid of cells min 25x25
- Text to display current generation
- Button(s) that start and stop anime, clear the grid

# Write an algorithm that:

    - implements the following steps:
        - for each cell int the current generation's grid:
            - examine state of all eight neighbors
            - Apply rules of life to determine the cell
            - When main loop completes:
                - Swap current and next grids
                - Repeat until simulation stopped
    - Breaks down above steps into appropriate sub-tasks implemented with helper functions to improve readability
    - Uses double buffering to update grid with next generation
    - Does something well-documented withthe edge of the grid

# Steps

1. Main Component & CSS
2. Create Grid Component
3. Create Box
4. Create methods:
   - making a copy of an aray because in React the array should not be altered directly
   - Seeding
5. Logic and Algorithms
6. Buttons
7. Adding slow and fast

# NPM Packages:

react-bootstrap: npm install react-bootstrap bootstrap
raect-player: npm install react-player
