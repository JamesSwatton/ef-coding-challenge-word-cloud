import React from 'react';
import WordTableRow from './WordTableRow'
import './WordTable.css'

const WordTable = ({words}) => {
  const wordNodes = words.map(word => {
    return <WordTableRow text={word.text} value={word.value} fontSize={word.fontSize} key={words.indexOf(word)}/>
  })
  console.log(words)
  return(
    <div className="word-table">
    <table>
      <thead>
        <tr>
          <th>Word</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {wordNodes}
      </tbody>
    </table>
    </div>
  )
}

export default WordTable;
