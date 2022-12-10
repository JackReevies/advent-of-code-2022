## Advent of Code 2022

![](https://img.shields.io/badge/Language-JS-778528?style=for-the-badge) &nbsp; &nbsp; ![](https://img.shields.io/badge/📅%20Day%20-10-118499?style=for-the-badge) &nbsp; &nbsp;  ![](https://img.shields.io/badge/⭐%20Stars%20-20-b5792a?style=for-the-badge)

My solutions to the [advent of code 2022](https://adventofcode.com/2022/)

## Results

Day | Task 1 | ᴍs | Task 2 | ᴍs | Total Execution Time (ᴍs)
-|-|-|-|-|-
1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|69289&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.05&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|205615&nbsp;&nbsp;&nbsp;&nbsp;|0.11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|309.4851
2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|14297&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|10498&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.27&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.5213
3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|7763&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.34&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2569&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.33&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2.4877
4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|588&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.42&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|911&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.39&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.0948
5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|FZCMJCRHZ&nbsp;|1.35&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|JSDHQMZGF&nbsp;|0.85&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|3.2693
6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1816&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.32&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2625&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.52&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1.1397
7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1206825&nbsp;&nbsp;&nbsp;|4.17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9608311&nbsp;&nbsp;&nbsp;|3.89&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|8.642
8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|1829&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6.64&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|291840&nbsp;&nbsp;&nbsp;&nbsp;|6.09&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|13.8857
9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|6098&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|9.88&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|2597&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|261.66&nbsp;&nbsp;&nbsp;&nbsp;|271.8899
10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|14820&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.04&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.21&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|0.5083

<br />

## How to Run

The goal is to not use any external modules, only those built in to the [node runtime](https://nodejs.org/en/) (this means no package.json). Node v12 and above should work for the puzzles (`node index`), but v18 is required for `node index download day` for the newly supported fetch API

`index.js` in the root directory contains a basic test runner to run each day's tasks and compare answers. This file will be updated with new days as they come.

* `node index` to run the benchmark.
* `node index download day` to setup a day's files

### Example

```
node index
```

Returns output in the format of

```
Day X
------
Task A is Correct (ANSWER) (took Zms)
Task B is Wrong (expected EXPECTED but got ACTUAL) (took Zms)
```

## How the Test Runner works

Each day will output an array of objects ([{ms: number, ans: object}]) representing the result of each task within that day.

The test runner knows what the answers *should* be, these are stored in an array of arrays with each array representing the answers for each day.

For example 

```
[[DAY 1 TASK 1 ANSWER, DAY 1 TASK 2 ANSWER], [DAY 2 TASK 1 ANSWER], ...]
```

We iterate through all the days we have loaded and compare their answers. We ouput whether the answer was right or wrong (and what we got if it was wrong). `console.log` is used for correct answers and `console.error` is used for wrong answers to give colour (if using a command line environment that allows for colour)