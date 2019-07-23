import React from 'react';

const WordTableRow = (props) => {
    const rowTextStyle = {
    fontSize: props.fontSize + 'px'
  }
    return (
        <tr>
          <td style={rowTextStyle}>{props.text}</td>
          <td>{props.value}</td>
        </tr>
    )
  }

export default WordTableRow;
