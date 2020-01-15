var Speed = 50;
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let sortingCompleted = async (arrayBars) => {
    let length = arrayBars.length;
    for (let x = 0; x < length; x++) {
        arrayBars[x].style.backgroundColor = 'green';
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let x = 0; x < length; x++) {
                arrayBars[x].style.backgroundColor = 'blue';
            }
            resolve();
        }, 1000);
    })
}

function animate_mergesort(res, arrayBars, callback, row, col, SPEED_MS) {
    if (row >= res.length) {
        callback();
        return;
    }
    if (row % 2 === 0) {
        //comparisons

        if (col >= res[row].length) {
            animate_mergesort(res, arrayBars, callback, row + 1, 2, SPEED_MS);
            return;
        }
        const bar = arrayBars[res[row][col]];
        bar.style.backgroundColor = "red";
        setTimeout(() => {
            bar.style.backgroundColor = "blue";
            animate_mergesort(res, arrayBars, callback, row, col + 1, SPEED_MS);
        }, SPEED_MS);
    }
    else {
        if (col >= res[row].length) {
            animate_mergesort(res, arrayBars, callback, row + 1, 0, SPEED_MS);
            return;
        }
        let j = res[row][0] + col - 2;
        const bar = arrayBars[j];
        bar.style.backgroundColor = "red";
        bar.style.height = `${res[row][col]}px`;
        setTimeout(() => {
            bar.style.backgroundColor = "blue";
            animate_mergesort(res, arrayBars, callback, row, col + 1, SPEED_MS);
        }, SPEED_MS);
    }
}

function mergesort(l, r, array, arrayBars, callback, res, SPEED_MS) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergesort(l, m, array, arrayBars, callback, res);
        mergesort(m + 1, r, array, arrayBars, callback, res);
        merge(l, m, r, array, arrayBars, res);
        if (r - l === arrayBars.length - 1) {
            animate_mergesort(res, arrayBars, callback, 0, 0, SPEED_MS);
            return;
        }
    }
}

function merge(l, m, r, array, arrayBars, res) {
    let comparisons = [];
    let sortedresult = [];
    let i, j;
    i = l;
    j = m + 1;
    for (let x = l; x <= r; x++) {
        if (i <= m && j <= r) {
            if (array[i] < array[j]) {
                comparisons.push(i);
                sortedresult.push(array[i]);
                i++;
            }
            else {
                comparisons.push(j);
                sortedresult.push(array[j]);
                j++;
            }
        }
        else if (i > m && j <= r) {
            comparisons.push(j);
            sortedresult.push(array[j]);
            j++;
        }
        else if (i <= m && j > r) {
            comparisons.push(i);
            sortedresult.push(array[i]);
            i++;
        }
    }
    i = l;
    for (let x = 0; x < sortedresult.length && i <= r; x++) {
        array[i] = sortedresult[x];
        i++;
    }
    sortedresult.unshift(r);
    sortedresult.unshift(l);

    res.push(comparisons);
    res.push(sortedresult);

}

let heapify = (array, curr_index, l, arrayBars, SPEED_MS) => {
    return new Promise(async (resolve, reject) => {
        let left = (2 * curr_index) + 1;
        let right = (2 * curr_index) + 2;
        if (l <= 0)
            resolve();
        let largest = curr_index;
        if ((l > left) && (array[left] > array[largest])) {
            largest = left;
        }
        if ((l > right) && (array[right] > array[largest])) {
            largest = right;
        }
        if (largest !== curr_index && largest < l) {
            await swap(array, largest, curr_index, arrayBars, SPEED_MS);
            await heapify(array, largest, l, arrayBars, SPEED_MS);
        }
        resolve("done");
    });
}

let quicksort = (array, low, high, arrayBars, SPEED_MS) => {
    return new Promise(async (resolve, reject) => {
        if (low < high) {
            await partition(array, low, high, arrayBars, SPEED_MS)
                .then(async (p) => {
                    await quicksort(array, low, p - 1, arrayBars, SPEED_MS);
                    await quicksort(array, p + 1, high, arrayBars, SPEED_MS);
                })
        }
        resolve();
    });
}

let partition = async (array, low, high, arrayBars, SPEED_MS) => {
    return new Promise(async (resolve, reject) => {
        let pivot = array[high];
        let i = (low - 1)
        for (let j = low; j <= high - 1; j++) {
            if (array[j] < pivot) {
                i++;
                await swap(array, i, j, arrayBars, SPEED_MS);
            }
        }
        await swap(array, i + 1, high, arrayBars, SPEED_MS);
        resolve(i + 1);
    });
}

let swap = (array, left, right, arrayBars, SPEED_MS) => {
    return new Promise((resolve, reject) => {
        arrayBars[left].style.backgroundColor = "red";
        arrayBars[right].style.backgroundColor = "red";
        let temp = array[left];
        array[left] = array[right];
        array[right] = temp;
        arrayBars[left].style.height = `${array[left]}px`;
        arrayBars[right].style.height = `${array[right]}px`;
        setTimeout(() => {
            arrayBars[left].style.backgroundColor = "blue";
            arrayBars[right].style.backgroundColor = "blue";
            resolve("swapping complete");
        }, SPEED_MS);
    })
}

export {
    randomIntFromInterval,
    sortingCompleted,
    mergesort,
    merge,
    Speed,
    heapify,
    swap,
    quicksort,
}