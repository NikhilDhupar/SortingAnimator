function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortingCompleted(length, arrayBars) {
    for (let x = 0; x < length; x++) {
        arrayBars[x].style.backgroundColor = 'purple';
    }
}

export {
    randomIntFromInterval,
    sortingCompleted,
}