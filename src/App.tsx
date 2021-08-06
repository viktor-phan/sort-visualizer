import React, { FormEvent, useEffect } from "react";
import "./App.css";
import { getMergeSortAnimation } from "./MergeSortAnimation";
import { getBubbleSortAnimation } from "./BubbleSortAnimations";

const BAR_NUMBER = 30;
const SPEED = 1;
const FIRST_COLOR = "#2E2FE3";
const SECOND_COLOR = "#FDED2A";

const MAXBAR = 420;
class App extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      array: [],
      barNum: 40,
      barWidth: 25,
    };
  }
  resetArray(newInput: number) {
    const array = [];
    for (let i = 0; i < newInput; i++) {
      array.push(randomIntFromInterval(5, 690));
    }

    this.setState({ array });
  }
  componentDidMount() {
    this.resetArray(this.state.barNum);
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newInput = parseInt(e.currentTarget.value);
    console.log(newInput);
    if (newInput > MAXBAR) {
      this.setState({ barNum: MAXBAR });
      // this.resetArray();
      console.log(this.state.barNum);
    } else {
      this.setState({
        barNum: newInput,
      });
    }
    this.resetArray(newInput);
  };
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (this.state.barNum > 340) {
      this.setState({ barWidth: 2 });
    } else if (this.state.barNum > 240) {
      this.setState({ barWidth: 3 });
    } else if (this.state.barNum > 180) {
      this.setState({ barWidth: 5 });
    } else if (this.state.barNum > 140) {
      this.setState({ barWidth: 7 });
    } else if (this.state.barNum > 100) {
      this.setState({ barWidth: 10 });
    } else if (this.state.barNum > 60) {
      this.setState({ barWidth: 15 });
    }
    //Ask Phuc why cannot I set the maximum
    if (this.state.barNum > 420) {
      this.setState({ barNum: MAXBAR });
      this.componentDidMount();
    } else {
      this.setState({
        barNum: this.state.barNum,
      });
    }
    e.preventDefault();
    this.resetArray(parseInt(this.state.barNum));
  };
  mergeSortAnimation = () => {
    const animations = getMergeSortAnimation(this.state.array);
    //animations length  = 3x array length, 0 change color, 1 change color back, 2 swap value;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const colorChangeState = i % 3 !== 2;
      if (colorChangeState) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? FIRST_COLOR : SECOND_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          const [barIndex, newVal] = animations[i];
          const barStyle = arrayBars[barIndex].style;
          barStyle.height = `${newVal}px`;
        }, i * SPEED);
      }
    }
  };
  bubbleSortAnimation = () => {
    const animations = getBubbleSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const colorChangeState = i % 4;

      if (colorChangeState < 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? FIRST_COLOR : SECOND_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else if (i % 4 === 2) {
        setTimeout(() => {
          const [barOneIdx, newVal1] = animations[i];

          const barOneStyle = arrayBars[barOneIdx].style;

          barOneStyle.height = `${newVal1}px`;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          const [BarTwoIdx, newVal2] = animations[i];
          const barTwoStyle = arrayBars[BarTwoIdx].style;
          barTwoStyle.height = `${newVal2}px`;
        }, i * SPEED);
      }
    }
  };

  render() {
    const { array, barNum } = this.state;

    return (
      <div className="App">
        <div className="options">
          <button onClick={() => this.resetArray(barNum)}>Reset Chart</button>
          <button onClick={() => this.mergeSortAnimation()}>Merge sort</button>
          <button onClick={() => this.bubbleSortAnimation()}>
            Bubble sort
          </button>
          <div className="forms">
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                name="barNumber"
                onChange={this.handleChange}
                value={this.state.barNum}
              />
              <button type="submit">Bars</button>
            </form>
          </div>
        </div>
        <div className="array-box">
          {barNum > 0 &&
            array.map((value: number, idx: number) => (
              <div
                className="bar"
                key={idx}
                style={{
                  height: `${value}px`,
                  width: `${this.state.barWidth}px`,
                }}
              ></div>
            ))}
        </div>
      </div>
    );
  }
}
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1 + min));
};
export default App;
