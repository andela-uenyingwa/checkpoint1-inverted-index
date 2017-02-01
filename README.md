# checkpoint1-inverted-index
[![Build Status](https://travis-ci.org/andela-uenyingwa/checkpoint1-inverted-index.svg?branch=master)](https://travis-ci.org/andela-uenyingwa/checkpoint1-inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-uenyingwa/checkpoint1-inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-uenyingwa/checkpoint1-inverted-index?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-uenyingwa/checkpoint1-inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-uenyingwa/checkpoint1-inverted-index)

# Inverted-Index
An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

Inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Usage
* Clone the repository `git clone https://github.com/andela-uenyingwa/checkpoint1-inverted-index.git`
* Run `npm install` to install all dependencies.
* To run test, run `npm test`
* To use inverted index, run `gulp` and go to `localhost://3030`
* Upload your file(s).
* Select a file from the uploaded files and click on *create index* to get an index of the selected file.
* To search the created index of a file, select file and enter the word(s) you want to search in the search box.
* Click on *search* to see your result, the result table does not display if the searched word(s) is not in the index created.


## Technologies and Services
Written in Javascript es6 syntax and nodejs on the backend, with the followinng:
* Jasmine (Test runner)
* Gulp (Task runner)
* Karma (Generate tests and coverage)
* Anjular js (Frontend views)
* Travic CI (Continous Integration)
* Coveralls (Test coverage percentage)
* Hound CI (Check for style violations)
* HTML/CSS (Frontend)

## Contributions
* Clone the repository.
* Create a new branch for included feature(s).
* Raise a pull request.
