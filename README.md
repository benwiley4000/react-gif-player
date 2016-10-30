# react-gif-player

Similar to Facebook's GIF toggle UI, this React component displays a still image preview by default, and swaps in an animated GIF when clicked. The images are preloaded as soon as the component mounts, or whenever a new source is passed.

*Note:* Unlike Facebook's UI, which uses an HTML video element to preserve playback progress, this component uses the actual GIF and will be reset on each click.

## demo

See react-gif-player [live demo here](https://benwiley4000.github.io/react-gif-player/).

![react-gif-player Gif Demo](https://cloud.githubusercontent.com/assets/1556583/19837009/8be5ce9a-9e8f-11e6-83a8-712d9b93de28.gif)

## install

```
npm install react-gif-player react react-dom
```

If you're unable to use npm and need production-ready scripts, check out [the releases](https://github.com/benwiley4000/react-gif-player/releases).

## usage

### quick start

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- gifplayer.css v0.1.0 -->
    <link rel="stylesheet" href="https://cdn.rawgit.com/benwiley4000/react-gif-player/080edebfb7556fbe741f1b03467d53c18916acac/gifplayer.css">
  </head>
  <body>
    <div id="cat"></div>
    <!-- react/react-dom served over CDN -->
    <script src="https://unpkg.com/react@15/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
    <!-- gifplayer.js v0.1.0 -->
    <script src="https://cdn.rawgit.com/benwiley4000/react-gif-player/080edebfb7556fbe741f1b03467d53c18916acac/gifplayer.js"></script>
    <script>
      ReactDOM.render(
        React.createElement(GifPlayer, {
          gif: '/img/cat.gif',
          still: '/img/cat.jpg'
        }),
        document.getElementById('cat')
      );
    </script>
  </body>
</html>

```

### with a module bundler

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var GifPlayer = require('react-gif-player');

// with JSX
ReactDOM.render(
  <GifPlayer gif="/img/cat.gif" still="/img/cat.jpg" />,
  document.getElementById('cat')
);
```

### options

Options can be passed to the `GifPlayer` element as props.

* `gif`: a *string* address to an animated GIF image.

* `still`: a *string* address to a still preview of the GIF (e.g. JPG, PNG, etc.)

* Any other attribute available on the HTML `img` tag can be passed as well (excluding `src`, which would be overwritten), though keep in mind React's version of that attribute [may be different than you expect](https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes).

`GifPlayer` expects one or both of the `gif` and `still` props. If one is left out, the other will be used as a fallback.

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
