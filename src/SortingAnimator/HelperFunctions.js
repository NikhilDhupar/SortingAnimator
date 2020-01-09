function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortingCompleted(length, arrayBars) {
    for (let x = 0; x < length; x++) {
        arrayBars[x].style.backgroundColor = 'purple';
    }
}

function animate_mergesort(res, arrayBars, callback, row, col) {
    if (row >= res.length) {
        callback();
        return;
    }
    if (row % 2 === 0) {
        //console.log("comparisons");
        if (col >= res[row].length) {
            animate_mergesort(res, arrayBars, callback, row + 1, 2);
            return;
        }
        //j=res[i].length;
        //for(let k=0;k<j;k++)
        //{
        const bar = arrayBars[res[row][col]];
        bar.style.backgroundColor = "red";
        setTimeout(() => {
            bar.style.backgroundColor = "blue";
            animate_mergesort(res, arrayBars, callback, row, col + 1);
            //console.log(arrayBars);
            //animate_merge_comparisons(current+1,comparisons,arrayBars,l,r,sortedresult);
        }, 50);
    }
    else {
        //console.log("merging");
        //j=res[i][0];
        if (col >= res[row].length) {
            animate_mergesort(res, arrayBars, callback, row + 1, 0);
            return;
        }
        //console.log(`i is ${i} x is ${x} value is ${res[i][x]}`);
        let j = res[row][0] + col - 2;
        const bar = arrayBars[j];
        bar.style.backgroundColor = "red";
        bar.style.height = `${res[row][col]}px`;
        setTimeout(() => {
            // bar.style.height = `${res[i][x]}px`;
            bar.style.backgroundColor = "blue";
            animate_mergesort(res, arrayBars, callback, row, col + 1);
            //animate_merge_merging(l+1,r,current+1,sortedresult,arrayBars);
        }, 50);
        //console.log(res[i]);
    }
}

function mergesort(l, r, array, arrayBars, callback, res) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergesort(l, m, array, arrayBars, callback, res);
        mergesort(m + 1, r, array, arrayBars, callback, res);
        merge(l, m, r, array, arrayBars, res);
        if (r - l === arrayBars.length - 1) {
            animate_mergesort(res, arrayBars, callback, 0, 0);
            return;
        }
    }
}

function merge(l, m, r, array, arrayBars, res) {
    let comparisons = [];
    let sortedresult = [];
    // sortedresult.push("S");
    // sortedresult.push(l);
    // sortedresult.push(r);
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

    //animate_merge_comparisons(0,comparisons,arrayBars,l,r,sortedresult);
    //animate_merge_merging(l,r,0,sortedresult,arrayBars);
}

export {
    randomIntFromInterval,
    sortingCompleted,
    mergesort,
    merge,
}