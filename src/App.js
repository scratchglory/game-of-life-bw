import React from "react";
import ReactPlayer from "react-player";
import "./App.css";
// import ColorApp from "./ColorApp.js";

import { Button, Dropdown, DropdownButton } from "react-bootstrap";

// Step 3: Create Box
class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        // not this.props.selectBox because it is created above
        // helper function
        onClick={this.selectBox}
      />
    );
  }
}

// step 2: Create Grid
class Grid extends React.Component {
  state = {
    background: "#4518c0",
  };

  render() {
    // add to the rowsArr to show on page
    var rowsArr = [];

    //  create/add to the array
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        // create id to go with each box
        let boxId = `${i}-${j}`;

        // checking if the box is true or false
        boxClass = this.props.gridState[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return <div className="grid">{rowsArr}</div>;
  }
}

// Step 6: Buttons
class GridButton extends React.Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  };

  render() {
    return (
      <div className="buttons">
        <Button className="button" onClick={this.props.play}>
          Play
        </Button>
        <Button className="button" onClick={this.props.pause}>
          Pause
        </Button>
        <Button className="button" onClick={this.props.clear}>
          Clear
        </Button>
        <Button className="button" onClick={this.props.slow}>
          Slow
        </Button>
        <Button className="button" onClick={this.props.fast}>
          Fast
        </Button>
        <Button
          className="button"
          onClick={() => {
            this.props.mixIt();
            this.props.play();
          }}
        >
          Mix It UP
        </Button>
        <DropdownButton
          title="Grid Size"
          id="menu-size"
          onSelect={this.handleSelect}
        >
          <Dropdown.Item id="menu-item" eventKey="1">
            SMALL
          </Dropdown.Item>
          <Dropdown.Item id="menu-item" eventKey="3">
            ORIGINAL
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

// Step 1: Create App
class App extends React.Component {
  constructor() {
    super();
    this.speed_counter = 1;
    this.speed = 250;
    // can't have in state because they will be referenced when the state is created
    this.rows = 20;
    this.cols = 20;
    this.state = {
      generation: 0,

      // Step 2
      gridState: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  // Step 4: Method Creation
  // Make a copy of array with bottom function
  // if the box is selected change it to true, update the array
  selectBox = (row, col) => {
    // REMEMBER: make a copy, don't change the array directly
    let gridCopy = arrayCopy(this.state.gridState);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridState: gridCopy,
    });
  };

  // step 4 Creating cells/methods
  // starting with random cells
  mixIt = () => {
    console.log("MIXED");
    let gridCopy = arrayCopy(this.state.gridState);

    this.clear();

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // randomly choose; expected outcome 0,1,2
        if (Math.floor(Math.random() * Math.floor(3)) === 1) {
          gridCopy[i][j] = true;
        }

        // update state
        this.setState({
          gridState: gridCopy,
        });
      }
    }
  };

  // step 5: Play and game logic
  play = () => {
    console.log("PLAY BUTTON");
    // clearInterval is a JS method; used to stop the interval/timer set with the setInterval() method
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.logic, this.speed);
  };

  // Step 5
  pause = () => {
    clearInterval(this.intervalId);
    console.log(`This IntervalId: ${this.intervalId}`);
  };

  clear = () => {
    console.log("BREAK");
    console.log("CLEAR");
    var grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    // pause generations
    this.pause();

    this.setState({
      gridState: grid,
      generation: 0,
    });
  };

  // Step 7: Slow and Fast
  fast = () => {
    console.log("Fast", this.speed);
    console.log("Fast Counter", this.speed_counter);

    this.speed -= 100;
    this.speed_counter += 1;
    this.play();
  };

  slow = () => {
    console.log("Slow", this.speed);
    console.log("Fast Counter", this.speed_counter);

    this.speed += 100;
    this.speed_counter -= 1;
    this.play();
  };

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;

      default:
        this.cols = 20;
        this.rows = 20;
    }
    this.clear();
  };

  // Step 5
  // intervals, comparing the original grid to the copy and justify state.
  logic = () => {
    // check the current grid, then change square on clone and set new state
    let grid1 = this.state.gridState;
    let grid2 = arrayCopy(this.state.gridState);

    // change the square; the RULES
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // how many neighbors it has
        let count = 0;
        // checking all 8 neighbors; live or die
        if (i > 0) if (grid1[i - 1][j]) count++;
        if (i > 0 && j > 0) if (grid1[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (grid1[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (grid1[i][j + 1]) count++;
        if (j > 0) if (grid1[i][j - 1]) count++;
        if (i < this.rows - 1) if (grid1[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (grid1[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (grid1[i + 1][j + 1]) count++;
        // less than 2 or more than 3, its DEAD
        if (grid1[i][j] && (count < 2 || count > 3)) grid2[i][j] = false;
        // if dead and have 3 neighbors, becomes live cell
        if (!grid1[i][j] && count === 3) grid2[i][j] = true;
      }
    }
    this.setState({
      gridState: grid2,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.mixIt();
    this.play();
  }

  render() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>

        {/* Step 2 */}
        <Grid
          gridState={this.state.gridState}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />

        <h2 id="generation">Generations: {this.state.generation}</h2>
        <h4 id="speed">Speed: {this.speed_counter}</h4>
        {/* Step 6: Buttons */}

        <GridButton
          play={this.play}
          pause={this.pause}
          clear={this.clear}
          mixIt={this.mixIt}
          slow={this.slow}
          fast={this.fast}
          gridSize={this.gridSize}
        />
        <div className="rules">
          <h2>RULES of LIFE:</h2>
          <ul>
            <li>
              1. Any live cell with fewer than two live neighbours dies, as if
              by underpopulation.
            </li>
            <li>
              2. Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              3. Any live cell with more than three live neighbours dies, as if
              by overpopulation.
            </li>
            <li>
              4. Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
        </div>

        <div className="about">
          <ReactPlayer id="video" url="https://youtu.be/R9Plq-D1gEk" />
          <div className="about-paragraph">
            <h2>About John Conway and "The Game of Life"</h2>
            <p>
              This zero-player game was created in 1970 by John Horton Conway, a
              British mathematician. Also known as Life, based on John von
              Neumann defining life as a creation which can reproduce itself and
              simulate a Turing machine. By creating an initial configuration,
              and following the rules, a user can observe the way it evolves.
              The evolution relies on the neighbors of the cell, whether it is
              either 1 or 0 (alive or dead).
            </p>
          </div>
        </div>
        <div id="references">
          <h4>
            <strong>REFERENCES</strong>
          </h4>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Conway's Game of Life Wiki
          </a>
        </div>
      </div>
    );
  }
}

// make a copy of the array; do not change the array directly
// deep clone because array slice doesn't work
function arrayCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default App;
