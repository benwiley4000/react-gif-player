(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["GifPlayer"] = factory(require("react"));
	else
		root["GifPlayer"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _GifPlayer = __webpack_require__(2);

	var _GifPlayer2 = _interopRequireDefault(_GifPlayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var preload = function preload(src, callback) {
	  var img = new Image();
	  if (typeof callback === 'function') {
	    img.onload = function () {
	      return callback(img);
	    };
	    img.setAttribute('crossOrigin', 'anonymous');
	  }
	  img.src = src;
	};

	var firstGifFrameUrl = function firstGifFrameUrl(img) {
	  var canvas = document.createElement('canvas');
	  if (typeof canvas.getContext !== 'function') {
	    return null;
	  }
	  canvas.width = img.width;
	  canvas.height = img.height;
	  var ctx = canvas.getContext('2d');
	  ctx.drawImage(img, 0, 0);
	  return canvas.toDataURL();
	};

	var GifPlayerContainer = function (_React$Component) {
	  _inherits(GifPlayerContainer, _React$Component);

	  function GifPlayerContainer(props) {
	    _classCallCheck(this, GifPlayerContainer);

	    var _this = _possibleConstructorReturn(this, (GifPlayerContainer.__proto__ || Object.getPrototypeOf(GifPlayerContainer)).call(this, props));

	    _this.state = {
	      playing: false,
	      gif: props.gif,
	      still: props.still
	    };
	    _this.updateId = -1;
	    return _this;
	  }

	  _createClass(GifPlayerContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateImages(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.updateImages(nextProps, this.props);
	    }
	  }, {
	    key: 'updateImages',
	    value: function updateImages(newProps) {
	      var _this2 = this;

	      var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var oldGif = oldProps.gif;
	      var newGif = newProps.gif;
	      var oldStill = oldProps.still;
	      var newStill = newProps.still;
	      if (oldGif === newGif && oldStill === newStill) {
	        return;
	      }

	      var updateId = ++this.updateId;
	      this.setState({
	        gif: newGif,
	        still: newStill
	      });

	      if (newGif && oldGif !== newGif) {
	        preload(newGif, function (img) {
	          if (!newStill && _this2.updateId === updateId) {
	            var still = firstGifFrameUrl(img);
	            if (still) {
	              _this2.setState({ still: still });
	            }
	          }
	        });
	      }
	      if (newStill && oldStill !== newStill) {
	        preload(newStill);
	      }
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.setState({
	        playing: !this.state.playing
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      return _react2.default.createElement(_GifPlayer2.default, _extends({}, this.props, this.state, {
	        toggle: function toggle() {
	          return _this3.toggle();
	        }
	      }));
	    }
	  }]);

	  return GifPlayerContainer;
	}(_react2.default.Component);

	GifPlayerContainer.propTypes = {
	  gif: _react2.default.PropTypes.string,
	  still: _react2.default.PropTypes.string
	};

	module.exports = GifPlayerContainer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var GifPlayer = function GifPlayer(_ref) {
	  var gif = _ref.gif,
	      still = _ref.still,
	      playing = _ref.playing,
	      toggle = _ref.toggle,
	      rest = _objectWithoutProperties(_ref, ['gif', 'still', 'playing', 'toggle']);

	  return _react2.default.createElement(
	    'div',
	    {
	      className: (0, _classnames2.default)('gif_player', { 'playing': playing }),
	      onClick: toggle
	    },
	    _react2.default.createElement('div', { className: 'play_button' }),
	    _react2.default.createElement('img', _extends({}, rest, { src: playing ? gif || still : still || gif }))
	  );
	};

	GifPlayer.propTypes = {
	  gif: _react2.default.PropTypes.string,
	  still: _react2.default.PropTypes.string,
	  playing: _react2.default.PropTypes.bool,
	  toggle: _react2.default.PropTypes.func
	};

	module.exports = GifPlayer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;