import React, { Component } from 'react';
import './SortingAnimator.css';
import { randomIntFromInterval } from './HelperFunctions';
/*import { render } from '@testing-library/react';*/

export default class SortingAnimator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sorting_in_progress: false,
        };
        this.complete = this.complete.bind(this);
    }

    componentDidMount() {
        this.reset();
    }

    reset() {
        if(this.state.sorting_in_progress)
        {
            alert("Sorting in Progress");
            return;
        }
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(10, 500));
        }
        this.setState({ array });
    }

    complete()
    {
        this.setState({sorting_in_progress: false});
    }

    bubbleSort() {
        let { array } = this.state;
        let length = array.length;
        var SPEED_MS = 5;
        const arrayBars = document.getElementsByClassName('array-bar');
        var i = 0, j = 0;
        function animatebubblesort(i, j, length, arrayBars,callback) {
            if (j < length - i - 1 && i < length - 1) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    let bar1 = arrayBars[j].style;
                    let bar2 = arrayBars[j + 1].style;
                    bar1.backgroundColor = "red";
                    bar2.backgroundColor = "red";
                    bar1.height = `${array[j]}px`;
                    bar2.height = `${array[j + 1]}px`;
                    setTimeout(() => {
                        bar1.backgroundColor = "blue";
                        bar2.backgroundColor = "blue";
                        animatebubblesort(i, j + 1, length, arrayBars,callback);
                    }, SPEED_MS);
                }
                else
                    animatebubblesort(i, j + 1, length, arrayBars,callback);
            }
            else if (j === length - i - 1 && i < length - 1) {
                j = 0; i++;
                animatebubblesort(i, j, length, arrayBars, callback);
            }
            else  {
              callback();
            }
        }
        
        if( this.state.sorting_in_progress )
        {
            alert("Sorting in progress");
        }
        else
        {
            this.setState({ sorting_in_progress: true });
            animatebubblesort(i, j, length, arrayBars, this.complete);
        }
    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">

                {array.map((value, index) => (
                    <div className="array-bar" key={index} style={{ height: `${value}px`, backgroundColor: 'blue' }}></div>
                ))}
                <button className="header-button" onClick={() => this.reset()}>New Array</button>
                <button className="header-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>

        );
    }
}
