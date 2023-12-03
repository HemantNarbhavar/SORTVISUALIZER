let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn_selection = document.getElementById("sort_btn_selection");
let sort_btn_bubble = document.getElementById("sort_btn_bubble");
let sort_btn_insertion = document.getElementById("sort_btn_insertion");
let bars_container = document.getElementById("bars_container");
let speedFactor = 500;
let minRange = 1;
let maxRange = 100;
let numOfBars = 10;
let heightFactor = 5;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray()
{
    for(let i=0; i<numOfBars; i++)
    {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array)
{
    for(let i=0; i<array.length; i++)
    {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);


    }
}

randomize_array.addEventListener("click", function()
{
    createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
    let bars = document.getElementsByClassName("bar");
    for(let i=0; i<numOfBars; i++)
    {
        bars[i].innerText = unsorted_array[i];
    }
});

function sleep(ms)
{
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// function swap(i,j,array)
// {
//     let temp;
//     temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
// }

// 1) Selection Sort Function

async function selectionSort(array)
{
    let bars = document.getElementsByClassName("bar");
    let min;
    let temp;
    for(let i=0; i<array.length; i++)
    {
        min = i;
        for(let j=i+1; j<array.length; j++)
        {
            for(let k=0; k<bars.length; k++)
            {
                if(k != i && k !=j)
                {
                    bars[k].style.backgroundColor = "yellowgreen";
                }
            }
            if(array[j] < array[min])
            {
                min = j;
            }
            temp = array[i];
            array[i] = array[min];
            array[min] = temp;
            bars[min].style.height = array[min] * heightFactor + "px";
            bars[min].style.backgroundColor = "white";
            await sleep(speedFactor);
        }
        bars[i].style.height = array[i] * heightFactor + "px";
        bars[i].style.backgroundColor = "white";
        await sleep(speedFactor);
    }
    return array;
}

// 2) Bubble Sort Function
async function bubbleSort(array)
{
    let bars = document.getElementsByClassName("bar");
    for(let i=0; i<array.length; i++)
    {
        for(let j=0; j<array.length - i - 1; j++)
        {
            if(array[j] > array[j+1])
            {
                for(let k=0; k<bars.length; k++)
                {
                    if(k !== j && k !== j+1)
                    {
                        bars[k].style.backgroundColor = "aqua";
                    }
                }
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "white";
                bars[j].innerText = array[j];
                bars[j+1].style.height = array[j+1] * heightFactor + "px";
                bars[j+1].style.backgroundColor = "white";
                bars[j+1].innerText = array[j+1];
                await sleep(speedFactor);
            }
        }
        // bars[i].innerText = array[i];
        await sleep(speedFactor);
    }
    return array;
}

async function insertionSort(array)
{
    let bars = document.getElementsByClassName("bar");
    for(let i=1; i<array.length; i++)
    {
        let temp = array[i];
        let j = i-1;
        while(j>=0 && array[j] > temp)
        {
            array[j+1] = array[j];
            bars[j+1].style.height = array[j+1] * heightFactor + "px";
            bars[j+1].style.backgroundColor = "white";
            await sleep(speedFactor);
            for(let k=0; k<bars.length; k++)
                {
                    if(k != j+1)
                    {
                        bars[k].style.backgroundColor = "pink";
                    }
                }
                bars[j].innerText = array[j];
                bars[j+1].innerText = array[j+1];
            j = j -1;
        }
        array[j+1] = temp;
        bars[j+1].style.height = array[j+1] * heightFactor + "px";
        bars[j+1].style.backgroundColor = "white";
        await sleep(speedFactor);
    }
    for(let k=0; k<bars.length; k++)
    {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}



sort_btn_bubble.addEventListener("click", function()
{
    let sorted_array = bubbleSort(unsorted_array);
    console.log(sorted_array);
});

sort_btn_insertion.addEventListener("click", function()
{
    let sorted_array = insertionSort(unsorted_array);
    console.log(sorted_array);
});

sort_btn_selection.addEventListener("click", function()
{
    let sorted_array = selectionSort(unsorted_array);
    console.log(sorted_array);
});
