import React from "react";
import "./App.css";
import { getMergeSortAnimation } from "./MergeSortAnimation";
import { getBubbleSortAnimation } from "./BubbleSortAnimations";

const BAR_NUMBER = 100;
const SPEED = 1;
const FIRST_COLOR = '#2E2FE3'
const SECOND_COLOR = '#FDED2A'
class App extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      array: [],
    };
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < BAR_NUMBER; i++) {
      array.push(randomIntFromInterval(5, 700));
    }

    this.setState({ array });
  }
  componentDidMount() {
    this.resetArray();
  }
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
    const { array } = this.state;
    console.log(array);
    return (
      <div className="App">
        <div className="options">
          <button onClick={() => this.resetArray()}>Reset Chart</button>
          <button onClick={() => this.mergeSortAnimation()}>Merge sort</button>
          <button onClick={() => this.bubbleSortAnimation()}>
            Bubble sort
          </button>
        </div>
        <div className="array-box">
          {array.map((value: number, idx: number) => (
            <div
              className="bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1 + min));
}
export default App;
