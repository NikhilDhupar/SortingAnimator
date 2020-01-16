import React, { Component } from 'react';
import './SortingAnimator.css';
import { randomIntFromInterval, mergesort, heapify, swap, quicksort, sortingCompleted } from './HelperFunctions';
import { Speed, maxHeight, arraySize } from './Constants';
/*import { render } from '@testing-library/react';*/
import Slider from '@material-ui/core/Slider';

export default class SortingAnimator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sorting_in_progress: false,
            SPEED_MS: 200- Speed,
            array_sorted: true,
            maxHeight: maxHeight,
            arraySize: arraySize,
        };
        this.complete = this.complete.bind(this);
        this.handleMaxHeight = this.handleMaxHeight.bind(this);
        this.handleSpeed = this.handleSpeed.bind(this);
    }

    componentDidMount() {
        this.reset();
    }

    handleMaxHeight(event, value) {
        this.setState({
            maxHeight: value,
        });
        this.reset();
    }

    handleSpeed(event, value) {
        this.setState({
            SPEED_MS: 200-value,
        });
        this.reset();
    }

    reset() {
        if (this.state.sorting_in_progress) {
            //alert("Sorting in Progress");
            return;
        }
        const array = [];
        const { maxHeight, arraySize } = this.state;
        for (let i = 0; i < arraySize; i++) {
            array.push(randomIntFromInterval(10, maxHeight));
        }
        this.setState({ array, array_sorted: false });
    }

    async complete() {
        const arrayBars = document.getElementsByClassName('array-bar');
        await sortingCompleted(arrayBars);
        this.setState({
            sorting_in_progress: false,
            array_sorted: true
        });
    }

    bubbleSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        let length = array.length;
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

        this.setState({ sorting_in_progress: true });
        animatebubblesort(i, j, length, arrayBars, this.complete);

    }

    insertionSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        function animateinsertionsort(i, j, key, arrayBars, callback) {
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

    selectionSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');

        function animateselectionsort(i, j, minindex, arrayBars, callback) {
            if (i >= arrayBars.length - 1) {
                callback();
                return;
            }
            else {
                if (j <= arrayBars.length - 1) {
                    arrayBars[j].style.backgroundColor = "red";
                    arrayBars[i].style.backgroundColor = "red";
                    if (array[j] < array[minindex])
                        minindex = j;
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = "blue";
                        arrayBars[i].style.backgroundColor = "blue";
                        animateselectionsort(i, j + 1, minindex, arrayBars, callback);
                    }, SPEED_MS);
                }
                else {
                    let temp = array[i];
                    array[i] = array[minindex];
                    array[minindex] = temp;
                    arrayBars[i].style.height = `${array[i]}px`;
                    arrayBars[minindex].style.height = `${array[minindex]}px`;
                    arrayBars[minindex].style.backgroundColor = "red";
                    arrayBars[i].style.backgroundColor = "red";
                    setTimeout(() => {
                        arrayBars[i].style.backgroundColor = "blue";
                        arrayBars[minindex].style.backgroundColor = "blue";
                        animateselectionsort(i + 1, i + 2, i + 1, arrayBars, callback);
                    }, SPEED_MS);
                }
            }
        }

        this.setState({ sorting_in_progress: true });
        animateselectionsort(0, 1, 0, arrayBars, this.complete);
    }

    mergeSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        let temp = [];
        let resultant_data = [];
        for (let x = 0; x < array.length; x++) {
            temp.push(array[x]);
        }
        this.setState({ sorting_in_progress: true });
        mergesort(0, array.length - 1, temp, arrayBars, this.complete, resultant_data, SPEED_MS);
    }

    async heapSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        this.setState({ sorting_in_progress: true });
        for (let i = array.length / 2; i >= 0; i--) {
            await heapify(array, i, array.length, arrayBars, SPEED_MS);
        }
        for (let i = array.length - 1; i >= 0; i--) {
            await swap(array, i, 0, arrayBars, SPEED_MS);
            await heapify(array, 0, i, arrayBars, SPEED_MS);
        }
        this.complete();

    }

    async quickSort() {
        if (this.state.sorting_in_progress) {
            alert("Sorting in progress");
            return;
        }
        else if (this.state.array_sorted) {
            alert("array already sorted !!!");
            return;
        }
        let { array, SPEED_MS } = this.state;
        const arrayBars = document.getElementsByClassName('array-bar');
        this.setState({ sorting_in_progress: true });
        await quicksort(array, 0, array.length - 1, arrayBars, SPEED_MS);
        this.complete();
    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                <div className="button-container">
                    <button className="header-button" onClick={() => this.reset()}>New Array</button>
                    <button className="header-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="header-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button className="header-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="header-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="header-button" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="header-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="header-button">
                        ArrayHeight:
                        <Slider valueLabelDisplay="auto" defaultValue={this.state.maxHeight} onChange={this.handleMaxHeight} aria-labelledby="continuous-slider" min={100}
                            max={600} />
                    </button>
                    <button className="header-button">
                        Speed(ms):
                        <Slider valueLabelDisplay="auto" defaultValue={this.state.SPEED_MS} onChange={this.handleSpeed} aria-labelledby="continuous-slider" min={1}
                            max={200} />
                    </button>
                </div>
                <div className="graph-container">
                    {array.map((value, index) => (
                        <div className="array-bar" key={index} style={{ height: `${value}px`, backgroundColor: 'blue' }}></div>
                    ))}
                </div>
            </div>

        );
    }
}
