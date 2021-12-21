/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "\\js\\";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (fontID, fontUrl) {
  var forceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  new FontLoader(fontID, fontUrl, forceUpdate);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global theme */

var FontLoader = exports.FontLoader = function () {
  /**
   * @param {string} fontID - unique font ID.
   * @param {string} fontUrl - font url.
   * @param {boolean} (forceUpdate) - fonts are loaded if they are not already in the local storage, if you specify true,
   *                                  they will be overwritten in any case, default false.
   */
  function FontLoader(fontID, fontUrl) {
    var forceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, FontLoader);

    this._ID = this._toCamelCase(fontID);
    this._url = fontUrl;
    this._keyCss = 'fontLoaderCss' + this._ID;
    this._keyUrl = 'fontLoaderUrl' + this._ID;

    if (forceUpdate || this._needUpdate()) {
      this._update();
    }
  }

  _createClass(FontLoader, [{
    key: '_needUpdate',
    value: function _needUpdate() {
      return this._url !== localStorage.getItem(this._keyUrl) || !localStorage.getItem(this._keyCss);
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this = this;

      localStorage.setItem(this._keyUrl, this._url);
      localStorage.setItem(this._keyCss, '');

      if (this._url.startsWith('http')) {
        fetch(this._url).then(function (response) {
          return response.text();
        }).then(function (css) {
          return _this.css = css;
        }).then(function () {
          var promises = _this.css.match(/(url\(['"]?)(https:\/\/)?[^)"']+/g).map(_this._replace.bind(_this));

          return Promise.all(promises).then(function () {
            _this._insert();
            localStorage.setItem(_this._keyCss, _this.css);
          });
        });
      } else {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = this._url;

        document.head.appendChild(link);
      }
    }
  }, {
    key: '_replace',
    value: function _replace(url) {
      var _this2 = this;

      var replaceUrl = url.replace(/^url\(['"]?/, '');

      url = replaceUrl.startsWith('http') ? replaceUrl : theme.url + 'fonts/' + replaceUrl;

      return new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          return response.blob();
        }).then(function (blob) {
          var self = _this2;
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            self.css = self.css.replace(replaceUrl, this.result.toString());
            resolve();
          });

          reader.readAsDataURL(blob);
        }).catch(reject);
      });
    }
  }, {
    key: '_insert',
    value: function _insert() {
      var style = document.createElement('style');
      style.rel = 'stylesheet';
      document.head.appendChild(style);
      style.textContent = this.css;
    }
  }, {
    key: '_toCamelCase',
    value: function _toCamelCase(str) {
      return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, chr) {
        return chr.toUpperCase();
      });
    }
  }]);

  return FontLoader;
}();

/**
 * @param {string} fontID - unique font ID.
 * @param {string} fontUrl - font url.
 * @param {boolean} [forceUpdate=false] - fonts are loaded if they are not already in the local storage, if you specify
 *                                        true, they will be overwritten in any case, default false.
 */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
(function ($) {
  $.fn.wldBlock = function () {
    if (this && this.length) {
      this.each(function () {
        var $element = $(this),
            oldPosition = $element.css('position'),
            $div = $('<div>', {
          css: {
            cursor: 'wait',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 100,
            background: '#fff',
            opacity: '0.5'
          }
        });

        if ('relative' !== oldPosition && 'absolute' !== oldPosition) {
          $element.css('position', 'relative');
          $element.data('block-old-position', oldPosition);
        }

        $element.data('block-div', $div).append($div);
      });
    }

    return this;
  };

  $.fn.wldUnblock = function () {
    if (this && this.length) {
      this.each(function () {
        var $element = $(this),
            oldPosition = $element.data('block-old-position'),
            $div = $element.data('block-div');

        if (oldPosition) {
          $element.css('position', oldPosition);
        }

        if ($div) {
          $div && $div.remove();
        }
      });
    }

    return this;
  };
})(jQuery);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _googleFontsLoader = __webpack_require__(4);

var _googleFontsLoader2 = _interopRequireDefault(_googleFontsLoader);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import './block';
(0, _googleFontsLoader2.default)(["Raleway:200,300,400,600,700,800"]);
//import './light-tabs';
/* eslint-disable no-var */

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleFontsLoader = undefined;
exports.getGoogleFontsUrlByFonts = getGoogleFontsUrlByFonts;

exports.default = function (fonts) {
  new GoogleFontsLoader(fonts);
};

var _fontsLoader = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Array of strings that enumerate fonts, format of string "font name:weight(separated by commas)"
 * @typedef {string[]} googleFonts
 */

/**
 * @param {googleFonts} fonts
 */
function getGoogleFontsUrlByFonts(fonts) {
  var format_fonts = [];
  var url = 'https://fonts.googleapis.com/css';
  var text = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789,.!?&%$#@;:/|\\\'"`^{}[]()<>+=*~';

  fonts.forEach(function (font) {
    var parts = font.split(':');
    parts[0] = parts[0].replace(/ /g, '+');
    format_fonts.push(parts.join(parts.length === 2 && parts[1] !== '' ? ':' : ''));
  });

  return url + '?family=' + format_fonts.join('%7C') + '&text=' + encodeURIComponent(text);
}

var GoogleFontsLoader = exports.GoogleFontsLoader = function (_FontLoader) {
  _inherits(GoogleFontsLoader, _FontLoader);

  /**
   * @param {googleFonts} fonts
   */
  function GoogleFontsLoader(fonts) {
    _classCallCheck(this, GoogleFontsLoader);

    return _possibleConstructorReturn(this, (GoogleFontsLoader.__proto__ || Object.getPrototypeOf(GoogleFontsLoader)).call(this, 'google', getGoogleFontsUrlByFonts(fonts)));
  }

  return GoogleFontsLoader;
}(_fontsLoader.FontLoader);

/**
 * @param {googleFonts} fonts
 */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


jQuery(document).ready(function ($) {
  //Script for archive list in blog. If there isn't blog on the site it should remove
  $('.archive-title:contains("Archive")').parent().addClass('archive-widget');
  $('.archive-widget li').each(function (i, item) {
    var text = $(item).find('a').text();
    var year = text.slice(text.indexOf(' ') + 1);
    $(item).find('a').text($(item).find('a').text().slice(0, text.indexOf(' ') + 1));

    if ($('.archive-widget').find('.' + year).length) {
      $(item).detach().appendTo('.' + year + ' .year-group');
    } else {
      $('.archive-widget > ul').append('<li class="' + year + '">' + year + '<ul class="year-group"></ul></li>');
      $(item).detach().appendTo('.' + year + ' .year-group');
    }
  });
  $('.archive-widget > ul > li').on('click', function () {
    $(this).find('.year-group').slideToggle();
  });
  $('.archive-widget > ul > li a').on('click', function (e) {
    e.stopPropagation();
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global jQuery, theme, grecaptcha */

var $ = jQuery;
var gravityFormsReloadStorage = {};
var gravityFormsCheckPopupIntervalsStorage = {};

window.wldReCaptchaInit = function () {
  var $reCaptchaFields = $(theme.reCaptchaInvisibleHolderClassName);

  $reCaptchaFields.each(function () {
    var $form = $(this).closest('form');

    reCaptchaInit($form, getGravityFormID($form));
  });
};

$(function () {
  var $reCaptchaFields = $(theme.reCaptchaInvisibleHolderClassName);
  if ($reCaptchaFields.length) {
    $reCaptchaFields.closest('form').one('focus', ':input', function () {
      $('head').append($('<script/>').attr('src', 'https://www.google.com/recaptcha/api.js?onload=wldReCaptchaInit&render=explicit'));
    });
  }

  var $gravityFormsWrappers = $('.gform_wrapper');
  if ($gravityFormsWrappers.length) {
    $gravityFormsWrappers.each(function () {
      var $gravityForm = $(this);
      var gravityFormId = getGravityFormID($gravityForm);

      gravityFormsReloadStorage[gravityFormId] = new GravityFormsReload($gravityForm, gravityFormId);
    });
  }
});

$(document).on('gform_confirmation_loaded', function (event, gravityFormId) {
  if (typeof gravityFormsReloadStorage[gravityFormId] !== 'undefined') {
    gravityFormsReloadStorage[gravityFormId].reloadForm();
  }
}).on('gform_post_render', function (event, gravityFormId, currentPage) {
  if (currentPage) {
    reCaptchaInit($('#gform_' + gravityFormId), gravityFormId);
  }
});

var GravityFormsReload = function () {
  function GravityFormsReload($gform, gFormId) {
    _classCallCheck(this, GravityFormsReload);

    this.$parent = $gform.parent();
    this.html = this.$parent.html();
    this.gFormId = gFormId;
  }

  _createClass(GravityFormsReload, [{
    key: 'reloadForm',
    value: function reloadForm() {
      var $message = this.$parent.find('#gform_confirmation_wrapper_' + this.gFormId);
      if ($message.length) {
        this.$parent.html(this.html).append($message);

        $(document).trigger('gform_post_render', [this.gFormId, 1]);
      }
    }
  }]);

  return GravityFormsReload;
}();

function getGravityFormID($form) {
  if ($form.is('[id^="gform_"]')) {
    return parseInt($form.attr('id').match(/\d+$/)[0], 10);
  }

  return 0;
}

function reCaptchaInit($form) {
  var gFormId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var $holder = $form.find(theme.reCaptchaInvisibleHolderClassName);

  if (typeof grecaptcha !== 'undefined' && typeof grecaptcha.render !== 'undefined' && typeof theme !== 'undefined' && $holder.is(':empty')) {
    var holderId = grecaptcha.render($holder.get(0), {
      'sitekey': theme.reCaptchaInvisibleSiteKey,
      'size': 'invisible',
      'badge': theme.reCaptchaInvisibleBadgePosition,
      'callback': function callback() {
        $form.trigger('submit', [true, true]);
      },
      'expired-callback': function expiredCallback() {
        grecaptcha.reset(holderId);
      }
    });

    $form.on('submit', function (e, i, executedRecaptcha) {
      if (!executedRecaptcha) {
        e.preventDefault();
        grecaptcha.execute(holderId);

        if (gFormId) {
          $('#gform_confirmation_message_' + gFormId).remove();

          setTimeout(function () {
            if (!gravityFormsCheckPopupIntervalsStorage[gFormId]) {
              gravityFormsCheckPopupIntervalsStorage[gFormId] = setInterval(function () {
                var $iframe = $('iframe[src*="recaptcha/api2/bframe"]');

                // Exit if has open recaptcha
                if ($iframe.length) {
                  for (var _i = 0; _i < $iframe.length; _i++) {
                    if ('visible' === $iframe.eq(_i).parent().parent().css('visibility')) {
                      return;
                    }
                  }
                }

                $('#gform_ajax_spinner_' + gFormId + ':not(.verification-passed)').hide();
                clearInterval(gravityFormsCheckPopupIntervalsStorage[gFormId]);
                gravityFormsCheckPopupIntervalsStorage[gFormId] = false;
              }, 1000);
            }
          }, 500);
        }
      } else {
        if (gFormId) {
          $('#gform_ajax_spinner_' + gFormId).addClass('verification-passed').show();
        }
      }
    });
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


jQuery(function ($) {
  //Mobile menu open/close
  var openBtn = document.getElementById('open-button');
  var isOpen = false;

  function toggleMenu() {
    if (isOpen) {
      $('body').removeClass('show-menu');
    } else {
      $('body').addClass('show-menu');
    }
    isOpen = !isOpen;
  }

  $('#open-button').on('click', toggleMenu);
  $('#close-button').on('click', toggleMenu);
  $('.btn-close').on('click', function (_ref) {
    var target = _ref.target;

    if (isOpen && target !== openBtn) {
      toggleMenu();
    }
  });

  // mobile menu expand/minimize
  var $hasChildrenItem = $('.menu-wrap .menu-item-has-children');
  $hasChildrenItem.prepend('<div class="expand-btn"></div>');
  $('.expand-btn').on('click', function (event) {
    var $menuItem = $(event.currentTarget).parent();
    var $parentItem = $(event.currentTarget).parent().parent();

    if ($menuItem.hasClass('open')) {
      $parentItem.find('.menu-item-has-children').removeClass('open');
    } else {
      $parentItem.find('.menu-item-has-children').removeClass('open');
      $menuItem.addClass('open');
    }
  });

  //sticky header
  var $sticky = $('#sticky-header');
  if ($sticky.length) {
    var stickyHeaderTop = $sticky.get(0).clientHeight;
    $(document).on('scroll', function () {
      if ($(window).scrollTop() > stickyHeaderTop) {
        $sticky.addClass('fixed').removeClass('unfixed');
      } else {
        $sticky.removeClass('fixed').addClass('unfixed');
      }
    });
  }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/* global jQuery, google */
var $maps = jQuery('.map-canvas');

if ($maps.length && theme.googleMapsApiKey) {
    setTimeout(function () {
        var script = document.createElement('script');
        var src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + theme.googleMapsApiKey;

        script.setAttribute('src', src);
        script.async = true;
        document.body.appendChild(script);
    }, 2000);

    global.initMap = function () {
        $maps.each(function (index, element) {
            var $map = jQuery(element);

            var markerIcon = $map.data('icon');
            var mapZoom = $map.data('zoom');
            var map = new google.maps.Map(element, {
                zoom: mapZoom || 17,
                center: { lat: -34.397, lng: 150.644 },
                disableDefaultUI: true
            });

            new google.maps.Marker({
                position: position,
                map: map,
                icon: markerIcon || ''
            });
        });
    };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
jQuery(function ($) {
  var $inks = $('.selector');

  if ($inks.length) {
    __webpack_require__.e/* require.ensure */(2).then((function (require) {
      __webpack_require__(24);
      __webpack_require__(25);

      $inks.magnificPopup({});
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
  }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var elements = document.querySelectorAll('[data-1x]'),
      size = is2x() ? '2x' : '1x',
      l = elements.length;

  for (var i = 0; i < l; i++) {
    setBackgroundImage(elements[i]);
  }

  function setBackgroundImage(element) {
    var url = element.getAttribute('data-' + size);

    if (!url) {
      url = element.getAttribute('data-1x');
    }

    element.style.backgroundImage = 'url(' + url + ')';
  }

  function is2x() {
    return window.devicePixelRatio && window.devicePixelRatio >= 2;
  }
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
jQuery(function ($) {
    var $slider = $('.selector');

    if ($slider.length) {
        __webpack_require__.e/* require.ensure */(1).then((function (require) {
            __webpack_require__(26);
            __webpack_require__(27);

            $slider.slick({ autoplay: true });
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


jQuery(function ($) {
  var $header = $('#sticky-header'),
      fix = 18;

  $(window).on('load', function () {
    setTimeout(function () {
      if (location.hash) {
        window.scrollTo(0, 0);
        maybeScrollTo(location.hash);
      }
    }, 1);
  });

  $(document).on('click', 'a[href*="#"]:not([href="#"]):not([href*="popup"]):not(.popup-link)', function (e, runMaybeNeedClick) {
    if ($(this).parent().hasClass('popup-link')) {
      return;
    }

    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      if (e) {
        e.preventDefault();
      }

      maybeScrollTo(this.hash, e, runMaybeNeedClick);
    }
  });

  function maybeNeedClick(id, link) {
    var $links = $('[href="#' + id + '"]');
    if (link) {
      $links = $links.not(link);
    }

    if ($links.length) {
      $links.eq(0).trigger('click', [true]);

      return true;
    }

    return false;
  }

  function maybeScrollTo(hashOrIdOrName, event, runMaybeNeedClick) {
    if (hashOrIdOrName.startsWith('#')) {
      hashOrIdOrName = hashOrIdOrName.slice(1);
    }

    if (true !== runMaybeNeedClick && maybeNeedClick(hashOrIdOrName, event && event.currentTarget)) {
      return;
    }

    var $target = $('#' + hashOrIdOrName);
    if (0 === $target.length) {
      $target = $('[name=' + hashOrIdOrName + ']');
    }

    scrollTo($target);
  }

  function scrollTo($target) {
    if ($target.length) {
      var offset = $target.offset().top - fix;
      var top = offset - $header.outerHeight();

      $('html,body').animate({ scrollTop: top }, 1000, function () {
        $('html,body').animate({ scrollTop: offset - $header.outerHeight() }, 100);
      });
    }
  }

  $.fn.wldScrollTo = function () {
    if (this && this.length) {
      scrollTo($(this).eq(0));
    }

    return this;
  };
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


jQuery(function ($) {
  //opening external and files links in new tab, exclude #, tel: and mailto:
  $('a:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([href^="javascript:void(0)"]):not(.target-self)').filter(function () {
    var isExternal = this.hostname !== window.location.hostname,
        isFile = ~this.pathname.indexOf('.') && -1 === this.pathname.indexOf('.php');
    return isExternal || isFile;
  }).attr({
    'target': '_blank',
    'rel': 'noopener'
  });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fontsLoader = __webpack_require__(0);

var _fontsLoader2 = _interopRequireDefault(_fontsLoader);

var _liveDom = __webpack_require__(16);

var _liveDom2 = _interopRequireDefault(_liveDom);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jQuery */

(0, _fontsLoader2.default)('woo', theme.url + 'fonts/woo-fonts.css');

(0, _liveDom2.default)('form.cart').init(function () {
  jQuery(this).wldAddToCart();
}).start();

jQuery('.section-auth').lightTabs();
jQuery('.menu-item.cart').wldMenuCart();
jQuery('.checkout .block').wldCheckoutBlocks();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (selector) {
  return new LiveDom(selector);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Callback for element add/show/hide events
 *
 * @callback eventCallback
 * @this HTMLElement
 */

/**
 * todo
 *
 * @callback dependencyFunction
 * @param {function} done
 * @param {function} [error]
 */

var LiveDom = function () {
  function LiveDom(selector) {
    _classCallCheck(this, LiveDom);

    this._selector = selector;
    this._margin = { top: 250, bottom: 250 };
    this._dependencyFunction = null;
    this._dependencyStatus = 'ready';
    this._dependencyMissedCallbacks = [];
    this._callbacks = {
      init: null,
      firstShow: null,
      show: null,
      firstAllways: null,
      allways: null,
      firstHide: null,
      hide: null
    };
    this.__callbacks = {
      init: null,
      firstShow: null,
      show: null,
      firstAllways: null,
      allways: null,
      firstHide: null,
      hide: null
    };

    return this;
  }

  /**
   * Sets the callback for the element initialized event. This event fires once time an element initialized.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */


  _createClass(LiveDom, [{
    key: 'init',
    value: function init(callback) {
      this._callbacks.init = callback;
      return this;
    }

    /**
     * Sets the callback for the element show event. This event fires once time an element shown.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'firstShow',
    value: function firstShow(callback) {
      this._callbacks.firstShow = callback;
      return this;
    }

    /**
     * Sets the callback for the element show event. This event fires every time an element shown.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'show',
    value: function show(callback) {
      this._callbacks.show = callback;
      return this;
    }

    /**
     * Sets the callback for the element hide event. This event fires once time an element hiding.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'firstHide',
    value: function firstHide(callback) {
      this._callbacks.firstHide = callback;
      return this;
    }

    /**
     * Sets the callback for the element hide event. This event fires every time an element hiding.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'hide',
    value: function hide(callback) {
      this._callbacks.hide = callback;
      return this;
    }

    /**
     * Sets the callback for the element appearance event. This event fires once time an element shown or hiding.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'firstAllways',
    value: function firstAllways(callback) {
      this._callbacks.firstAllways = callback;
      return this;
    }

    /**
     * Sets the callback for the element appearance event. This event fires every time an element shown or hiding.
     *
     * @param {eventCallback} callback
     * @return {LiveDom}
     */

  }, {
    key: 'allways',
    value: function allways(callback) {
      this._callbacks.allways = callback;
      return this;
    }

    /**
     * todo
     *
     * @param {dependencyFunction} dependencyFunction
     * @return {LiveDom}
     */

  }, {
    key: 'dependency',
    value: function dependency(dependencyFunction) {
      this._dependencyFunction = dependencyFunction;
      this._dependencyStatus = 'not_ready';
      return this;
    }

    /**
     * todo
     *
     * @param {number} [top]
     * @param {number} [bottom]
     * @return {LiveDom}
     */

  }, {
    key: 'setMargin',
    value: function setMargin() {
      var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
      var bottom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

      this._margin.top = top;
      this._margin.bottom = bottom;
      return this;
    }

    /**
     * todo
     *
     * @param {HTMLElement} element
     * @return {LiveDom}
     */

  }, {
    key: 'addElement',
    value: function addElement(element) {
      var _this = this;

      if (typeof element.liveBlock === 'undefined') {
        element.liveBlock = {};
      }

      if (typeof element.liveBlock[this._selector] !== 'undefined') {
        return this;
      }

      element.liveBlock[this._selector] = {
        doneFirstAllways: false,
        doneFirstShow: false,
        doneFirstHide: false
      };

      var error = function error(e) {
        element.sectionLoaderObserver.unobserve(element);
        if (e) {
          console.info(e);
        }
      };

      var run = function run(element, entry, type) {
        if ('ready' === _this._dependencyStatus) {
          var Type = type.charAt(0).toUpperCase() + type.slice(1);

          if (false === element.liveBlock[_this._selector]['doneFirst' + Type]) {
            if (_this.__callbacks['first' + Type]) {
              element.liveBlock[_this._selector]['doneFirst' + Type] = true;
              _this.__callbacks['first' + Type].bind(element)();
            }
            if (_this._callbacks['first' + Type]) {
              element.liveBlock[_this._selector]['doneFirst' + Type] = true;
              _this._callbacks['first' + Type].bind(element)();
            }
          }

          if (_this.__callbacks[type]) {
            _this.__callbacks[type].bind(element)();
          }
          if (_this._callbacks[type]) {
            _this._callbacks[type].bind(element)();
          }
        } else if ('not_ready' === _this._dependencyStatus) {
          var done = function done() {
            _this._dependencyStatus = 'ready';
            run(element, entry, type);
          };

          _this._dependencyStatus = 'process';
          _this._dependencyFunction(done, error);
        } else if ('process' === _this._dependencyStatus) {
          _this._dependencyMissedCallbacks.push({ entry: entry, type: type });
        }
      };

      var initElement = function initElement(element) {
        if (_this._callbacks.init || _this.__callbacks.init) {
          var done = function done() {
            _this._dependencyStatus = 'ready';
            initElement(element);
          };

          if ('ready' === _this._dependencyStatus) {
            if (_this.__callbacks.init) {
              _this.__callbacks.init.bind(element)();
            }
            if (_this._callbacks.init) {
              _this._callbacks.init.bind(element)();
            }
            _this._dependencyMissedCallbacks.forEach(function (callback) {
              run(element, callback.entry, callback.type);
            });
          } else if ('not_ready' === _this._dependencyStatus) {
            _this._dependencyStatus = 'process';
            _this._dependencyFunction(done, error);
          }
        }
      };

      var goodBrowsers = function goodBrowsers(element) {
        var intersectionObserverInit = false;

        element.sectionLoaderObserver = new IntersectionObserver(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              entry = _ref2[0];

          if (intersectionObserverInit || entry.intersectionRatio > 0) {
            intersectionObserverInit = true;
            if (entry.isIntersecting) {
              run(element, entry, 'show');
            } else if (false === entry.isIntersecting) {
              run(element, entry, 'hide');
            }
            run(element, entry, 'allways');
          } else {
            intersectionObserverInit = true;
          }
        }, {
          rootMargin: _this._margin.bottom + 'px 0px ' + _this._margin.top + 'px 0px',
          threshold: [0.01]
        });

        element.sectionLoaderObserver.observe(element);
      };

      var badBrowsers = function badBrowsers(element) {
        var done = function done() {
          _this._dependencyStatus = 'ready';
          badBrowsers(element);
        };

        if ('ready' === _this._dependencyStatus) {
          Object.keys(_this._callbacks).forEach(function (callback) {
            if (_this.__callbacks[callback]) {
              _this._callbacks[callback].bind(element)();
            }
            if (_this._callbacks[callback]) {
              _this._callbacks[callback].bind(element)();
            }
          });
        } else if ('not_ready' === _this._dependencyStatus) {
          _this._dependencyStatus = 'process';
          _this._dependencyFunction(done, error);
        }
      };

      initElement(element);

      if (typeof IntersectionObserver === 'undefined') {
        badBrowsers(element);
      } else {
        goodBrowsers(element);
      }

      return this;
    }

    /**
     * todo
     *
     * @return {LiveDom}
     */

  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      var mutationObserver = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
          if ('childList' === mutation.type && mutation.addedNodes.length) {
            mutation.addedNodes.forEach(function (element) {
              if (element instanceof HTMLElement) {
                if (element.matches(_this2._selector)) {
                  _this2.addElement(element);
                }

                element.querySelectorAll(_this2._selector).forEach(function (element) {
                  return _this2.addElement(element);
                });
              }
            });
          }
        });
      });

      var bodyInit = function bodyInit() {
        if (document.body) {
          mutationObserver.observe(document.body, { subtree: true, childList: true });
          document.querySelectorAll(_this2._selector).forEach(function (element) {
            return _this2.addElement(element);
          });
        } else {
          window.setTimeout(bodyInit, 50);
        }
      };

      bodyInit();

      return this;
    }
  }]);

  return LiveDom;
}();

exports.LiveDom = LiveDom;

/**
 * @param {string} selector
 * @return {LiveDom}
 */

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {
  jQuery.fn.lightTabs = function (options) {
    var createTabs = function createTabs() {
      var tabs = this;
      var showPage = function showPage(i) {
        $(tabs).find('.tab').hide().eq(i).show();
        $(tabs).find('.tabs-nav').each(function (index, element) {
          $(element).find('li').removeClass('active').eq(i).addClass('active');
        });
      };

      // Initialize tabs and show first tab content
      showPage(0);

      // Add data attributes with tab-content index
      $(tabs).find('.tabs-nav').each(function (index, element) {
        $(element).find('li').each(function (index, element) {
          $(element).attr('data-page', index);
        });
      });

      // Add event listener on each tab
      $(tabs).find('.tabs-nav li').on('click', function () {
        showPage(parseInt($(this).attr('data-page')));
      });

      //select tab by hash
      var hash = window.location.hash;
      if (hash && $('.tabs-nav li[data-hash="' + hash + '"]').length) {
        $('.tabs-nav li[data-hash="' + hash + '"]').trigger('click');
      }
      ;
    };

    return this.each(createTabs);
  };
})(jQuery);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
var $ = jQuery;

$.fn.wldAddToCart = function () {
  var $form = this,
      $btn = $form.find('[type="submit"]'),
      $qty = $form.find('[name="quantity"]'),
      $sku = $form.find('.sku'),
      $variation = $form.find('[name="variation_id"]');

  $btn.attr('data-quantity', $qty.length ? $qty.val() : 1).attr('data-product_id', $variation.length ? $variation.val() : $btn.val()).attr('data-product_sku', $sku.length ? $sku.text() : '').addClass('ajax_add_to_cart add_to_cart_button').on('click', function (e) {
    if ($btn.hasClass('disabled')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  $qty.on('change', function () {
    return $btn.attr('data-quantity', $qty.val());
  });
  $variation.on('change', function () {
    return $btn.attr('data-product_id', $variation.val());
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var $ = jQuery; /* global jQuery */


$.fn.wldCheckoutBlocks = function () {
  var $allBlocks = this;

  if ($allBlocks && $allBlocks.length) {
    var save = function save($block) {
      $block.wldBlock();

      var fields = {};
      $.each($block.find(':input').serializeArray(), function () {
        fields[this.name] = this.value;
      });

      $.post({
        dataType: 'json',
        url: theme.ajaxUrl,
        data: {
          nonce: theme.ajaxNonce,
          action: 'get_block_format_content',
          type: $block.data('block-type'),
          fields: fields
        },
        success: function success(response) {
          $('.woocommerce-input-wrapper .error').remove();
          if (response.success) {
            var i = $block.blockIndex + 1,
                $newBlock = $(response.data.content);

            $block.attr('class', $newBlock.attr('class')).find('.block-format-content').replaceWith($newBlock.find('.block-format-content'));

            next($allBlocks.eq(i), i, true);
          } else {
            response.data.map(function (item) {
              $('#' + item.id).closest('.woocommerce-input-wrapper').append('<span class="error">' + item.message + '</span>').end().closest('.form-row').addClass('woocommerce-invalid');
            });
          }

          $block.wldUnblock();
        },
        error: function error() {
          $block.wldUnblock();
          alert('error');
        }
      });
    };

    var edit = function edit($block) {
      $block.addClass('block-edited');
    };

    var next = function next($next, i, scroll) {
      if ($next.length) {
        if ($next.hasClass('block-done')) {
          next($allBlocks.eq(i++), i, scroll);
          return;
        }

        $next.addClass('block-edited');

        var $blocks = $next.closest('.blocks');
        if ($blocks.length) {
          var allDone = 0 === $blocks.find('.block:not(.block-done)').length;

          if (allDone) {
            $blocks.addClass('block-done');
          } else {
            $blocks.addClass('block-edited');
          }
        }

        if ($next.hasClass('block-static')) {
          $next.addClass('block-done');
          next($allBlocks.eq(i++), i);
        }

        if (true === scroll) {
          $('html, body').animate({
            scrollTop: $next.offset().top - 140
          }, 1000);
        }
      }
    };

    this.each(function (i) {
      var $block = $(this);

      $block.blockIndex = i;

      if ($block.hasClass('block-static')) {
        return this;
      }

      $block.on('click', '.btn-edit', function () {
        return edit($block);
      }).on('click', '.btn-save', function () {
        return save($block);
      }).on('click', function () {
        if ($block.hasClass('block-empty') && $block.not('.block-edited') && (0 === $block.prev().length || $block.prev().hasClass('block-done') && $block.prev().not('.block-edited'))) {
          edit($block);
        }
      });
    });
  }

  return this;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
var $ = jQuery;
var $header = $('header.header');

if ($header.length) {
  var init = function init() {
    if (typeof $.scroll_to_notices === 'function') {
      $.scroll_to_notices = function ($scrollElement) {
        if ($scrollElement.length) {
          $('html, body').animate({
            scrollTop: $scrollElement.offset().top - (100 + $header.height())
          }, 1000);
        }
      };
    } else {
      setTimeout(init, 500);
    }
  };

  init();
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var $ = jQuery; /* global jQuery, wc_add_to_cart_params */

var $body = $(document.body);

$.fn.wldMenuCart = function () {
  if (this && this.length) {
    this.each(function () {
      var $menu_item = $(this),
          $link = $menu_item.children('a');

      var $cart = void 0,
          $items = void 0,
          scrollTop = 0;

      $menu_item.on('click', '[data-close]', function (e) {
        e.preventDefault();
        $menu_item.removeClass('open-cart');
      });

      $body.on('wc_fragments_refreshed wc_fragments_loaded', function () {
        $cart = $menu_item.children('.menu-cart');
        $items = $cart.find('.woocommerce-mini-cart');
        $items.scrollTop(scrollTop).on('scroll', function () {
          return scrollTop = $items.scrollTop();
        });

        if ($.fn.mCustomScrollbar) {
          setTimeout(function () {
            $items.mCustomScrollbar({ 'mouseWheel': true });
          });
        }
      }).on('added_to_cart', function () {
        return toggle(true);
      });

      $link.on('click', function (e) {
        e.preventDefault();
        toggle();
      });

      function toggle(state) {
        $menu_item.toggleClass('open-cart', state);

        loadScrollBar();
      }

      function scrollToggle() {
        var $items = $menu_item.children('.menu-cart').find('.woocommerce-mini-cart');

        if ($menu_item.hasClass('open-cart')) {
          setTimeout(function () {
            $items.mCustomScrollbar({ 'mouseWheel': true });
          });
        } else {
          setTimeout(function () {
            $items.mCustomScrollbar('destroy');
          });
        }
      }

      function loadScrollBar() {
        var $items = $menu_item.children('.menu-cart').find('.woocommerce-mini-cart');

        if (!$.fn.mCustomScrollbar) {
          $items.wldBlock();
          __webpack_require__.e/* require.ensure */(0).then((function (require) {
            __webpack_require__(28);
            __webpack_require__(29);

            scrollToggle();

            $items.wldUnblock();
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        } else {
          scrollToggle();
        }
      }
    });
  }

  return this;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery */
var $ = jQuery;

var updateTimeout = false;

$(document.body).on('click', '.quantity .qty-btn:not([disabled])', update).on('input', '.quantity .qty', change);

function update() {
  if (updateTimeout !== false) {
    clearTimeout(updateTimeout);
  }

  var $btn = $(this),
      $qty = $btn.closest('.quantity').find('.qty'),
      value = parseInt($qty.val()),
      min = $qty.attr('min') ? parseInt($qty.attr('min')) : 1,
      max = $qty.attr('max') ? parseInt($qty.attr('max')) : 999;

  if ($btn.hasClass('minus')) {
    if (value > min && value > 1) {
      $qty.val(value - 1);
    } else {
      $btn.attr('disabled', true);
    }
    $btn.closest('.quantity').find('.plus').attr('disabled', false);
  } else {
    if (value < max) {
      $qty.val(value + 1);
    } else {
      $btn.attr('disabled', true);
    }
    $btn.closest('.quantity').find('.minus').attr('disabled', false);
  }

  updateTimeout = setTimeout(trigger, 1000, $qty);
}

function change() {
  var $qty = $(this),
      max = $qty.attr('max') ? $qty.attr('max') : '999';

  if (parseInt($qty.val()) === 0) {
    $qty.val(1);
  }

  if ($qty.val().length > max.length) {
    $qty.val($qty.val().slice(0, max.length));
  } else {
    if (parseInt($qty.val()) > parseInt(max)) {
      $qty.val(max);
    }
  }
}

function trigger($qty) {
  $qty.trigger('change');
  updateTimeout = false;
  $('[name="update_cart"]').trigger('click');
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);
//# sourceMappingURL=init.js.map