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
            SPEED_MS: 10,
        };
        this.complete = this.complete.bind(this);
    }

    componentDidMount() {
        this.reset();
    }

    reset() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in Progress");
            return;
        }
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(10, 500));
        }
        this.setState({ array });
    }

    complete() {
        this.setState({ sorting_in_progress: false });
    }

    bubbleSort() {
        let { array } = this.state;
        let length = array.length;
        let { SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        var i = 0, j = 0;
        function animatebubblesort(i, j, length, arrayBars, callback) {
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
                        animatebubblesort(i, j + 1, length, arrayBars, callback);
                    }, SPEED_MS);
                }
                else
                    animatebubblesort(i, j + 1, length, arrayBars, callback);
            }
            else if (j === length - i - 1 && i < length - 1) {
                j = 0; i++;
                animatebubblesort(i, j, length, arrayBars, callback);
            }
            else {
                callback();
            }
        }

        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
        }
        else {
            this.setState({ sorting_in_progress: true });
            animatebubblesort(i, j, length, arrayBars, this.complete);
        }
    }

    insertionSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        let { SPEED_MS, array } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        /*
        sorting algorithm in c
        for (i = 1; i < length; i++) {
            key = array[i];
            j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }*/
        function animateinsertionsort(i, j, key, arrayBars, callback) {
            // console.log(`j is ${j} and i is ${i} - ` + array[j] + " " + array[j+1]);
            if (i >= arrayBars.length) {
                callback();
                return;
            }
            else {
                if (j >= 0 && array[j] > key) {
                    array[j + 1] = array[j];
                    arrayBars[j + 1].style.height = arrayBars[j].style.height;
                    arrayBars[j].style.backgroundColor = "red";
                    arrayBars[j + 1].style.backgroundColor = "red";
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = "blue";
                        arrayBars[j + 1].style.backgroundColor = "blue";
                        animateinsertionsort(i, j - 1, key, arrayBars, callback);
                    }, SPEED_MS);
                }
                else {
                    array[j + 1] = key;
                    arrayBars[j + 1].style.height = `${key}px`;
                    arrayBars[j + 1].style.backgroundColor = "red";
                    setTimeout(() => {
                        arrayBars[j + 1].style.backgroundColor = "blue";
                        animateinsertionsort(i + 1, i, array[i + 1], arrayBars, callback);
                    }, SPEED_MS);
                }
            }
        }

        this.setState({ sorting_in_progress: true });
        
        animateinsertionsort(1, 0, array[1], arrayBars, this.complete);
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
                <button className="header-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
            </div>

        );
    }
}
