# react-gif-player

Similar to Facebook's GIF toggle UI, this React component displays a still image preview by default, and swaps in an animated GIF when clicked.

*Note:* Unlike Facebook's UI, which uses an HTML video element to preserve playback progress, this component uses the actual GIF and will be reset on each click.

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

## styles

**Important:** In order for the default styles to be used, **dist/gifplayer.css** must be included in your HTML.

CSS styles can be overridden easily. To add a border around the image, try including this CSS **after** including the default styles:

```css
.gif_player img {
  border: 3px solid cornflowerblue;
}
```

## usage with sass

If you preprocess your styles with Sass, you can have more powerful control via Sass variables. The following are included in **src/GifPlayer.scss**:

```scss
$gif_btn_bg_color: #000 !default;
$gif_btn_box_shadow_color: #000 !default;
$gif_btn_text_color: #fff !default;
$gif_btn_border_color: $gif_btn_text_color !default;
$gif_btn_font_family: 'Helvetica Neue', Helvetica, Arial, sans-serif !default;
```
The `!default` flag means that declaring alternatives **before** including the default styles will override them.

```scss
// Include var overrides before default styles import
$gif_btn_bg_color: gold;
$gif_btn_text_color: cornflowerblue;
$gif_btn_font_family: serif;

// Using webpack css/sass module import syntax
@import '~react-gif-player/src/GifPlayer';

// include other overrides afterward
.gif_player {
  margin: 1rem;

  img {
    border: 2px solid #222;
  }
}
```

## development

For building and testing instructions, see [CONTRIBUTING.md](CONTRIBUTING.md).
