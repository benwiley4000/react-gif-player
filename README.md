# react-gif-player

## install

```
npm install react-gif-player react react-dom
```

## usage

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

## development

For building and testing instructions, see [CONTRIBUTING.md](CONTRIBUTING.md).
