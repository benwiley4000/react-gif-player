# react-gif-player

Usage:

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var GifPlayer = require('react-gif-player');

// with JSX
ReactDOM.render(
  <GifPlayer gif="/img/cat.gif" still="/img/cat.jpg" />,
  document.getElementById('cat')
);

// without JSX
ReactDOM.render(
  React.createElement(GifPlayer, {
    gif: '/img/cat.gif',
    still: '/img/cat.jpg'
  }),
  document.getElementById('cat')
);
```
