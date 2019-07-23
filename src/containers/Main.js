import React, { Component, Fragment } from 'react';
import WordTable from '../components/WordTable'
import WordCloud from 'react-d3-cloud';
import './Main.css'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: [],
    }
    this.createCleanReviewsString = this.createCleanReviewsString.bind(this);
    this.createWords = this.createWords.bind(this);
    this.getUniqueWords = this.getUniqueWords.bind(this);
    this.createWordObjects = this.createWordObjects.bind(this);
    this.addFontSize = this.addFontSize.bind(this);
    this.findMaxWordCount = this.findMaxWordCount.bind(this);
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/Jordanddick/ef-coding-challenge/master/reviews.json")
    .then(res => res.json())
    .then((data) => {
      const reviewsString = this.createCleanReviewsString(data.reviews);
      const allWords = this.createWords(reviewsString);
      const uniqueWords = this.getUniqueWords(allWords);
      const wordsWithoutFontSize = this.createWordObjects(uniqueWords, allWords);
      const maxWordCount = this.findMaxWordCount(wordsWithoutFontSize);
      const words = this.addFontSize(wordsWithoutFontSize, 1, maxWordCount, 20, 80);
      this.setState({words: words})
    })
  }

  createCleanReviewsString(reviews){
    const reducer = (accumulator, currentValue) => accumulator + ' ' + currentValue;
    let reviewsString = reviews.reduce(reducer)
    const regex = /{|}|“|”|-|\.|,|[0-9]|!/g;
    return reviewsString
      .replace(regex, '')
      .replace(/  +/g, ' ')
      .toLowerCase()
  }

  createWords(string) {
    return string
      .split(' ')
      .map(word => {
      return word[0].toUpperCase() + word.slice(1)
    })
  }

  getUniqueWords(allWords) {
    return allWords.filter((word, index, array) => {
      return array.indexOf(word) === index
    })
  }

  createWordObjects(uniqueWords, allWords) {
    let wordCount = 0;
    const wordObjects = uniqueWords.map(uniqWord => {
      allWords.forEach(word => {
        if (uniqWord === word) {
          wordCount += 1;
        }
      })
      const newWordObject = {
        text: uniqWord,
        value: wordCount
      }
      wordCount = 0
      return newWordObject
    })
    return wordObjects
  }

  findMaxWordCount(words) {
    let max = 0
    words.forEach(word => {
      if (word.value > max) {
        max = word.value
      }
    })
    return max
  }

  addFontSize(words, minCount, maxCount, fontSizeMin, fontSizeMax) {
    return words.map(word => {
      let size = word.value === minCount ? fontSizeMin
        : (word.value / maxCount) * (fontSizeMax - fontSizeMin) + fontSizeMin
        word['fontSize'] = size
        return word
    })
  }

  render () {
    const fontSizeMapper = word => Math.log2(word.value) * 50;
    return (
      <Fragment>
        <WordTable words={this.state.words}/>
        <div className='word-cloud'>
          <WordCloud
            data={this.state.words}
            fontSizeMapper={fontSizeMapper}
            width={800}/>
        </div>
      </Fragment>
    )
  }
}

export default Main;
