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


class LiveDom {
  constructor( selector ) {
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
      hide: null,
    };
    this.__callbacks = {
      init: null,
      firstShow: null,
      show: null,
      firstAllways: null,
      allways: null,
      firstHide: null,
      hide: null,
    };

    return this;
  }

  /**
   * Sets the callback for the element initialized event. This event fires once time an element initialized.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  init( callback ) {
    this._callbacks.init = callback;
    return this;
  }

  /**
   * Sets the callback for the element show event. This event fires once time an element shown.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  firstShow( callback ) {
    this._callbacks.firstShow = callback;
    return this;
  }

  /**
   * Sets the callback for the element show event. This event fires every time an element shown.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  show( callback ) {
    this._callbacks.show = callback;
    return this;
  }

  /**
   * Sets the callback for the element hide event. This event fires once time an element hiding.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  firstHide( callback ) {
    this._callbacks.firstHide = callback;
    return this;
  }

  /**
   * Sets the callback for the element hide event. This event fires every time an element hiding.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  hide( callback ) {
    this._callbacks.hide = callback;
    return this;
  }

  /**
   * Sets the callback for the element appearance event. This event fires once time an element shown or hiding.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  firstAllways( callback ) {
    this._callbacks.firstAllways = callback;
    return this;
  }

  /**
   * Sets the callback for the element appearance event. This event fires every time an element shown or hiding.
   *
   * @param {eventCallback} callback
   * @return {LiveDom}
   */
  allways( callback ) {
    this._callbacks.allways = callback;
    return this;
  }

  /**
   * todo
   *
   * @param {dependencyFunction} dependencyFunction
   * @return {LiveDom}
   */
  dependency( dependencyFunction ) {
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
  setMargin( top = 250, bottom = 250 ) {
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
  addElement( element ) {
    if ( typeof element.liveBlock === 'undefined' ) {
      element.liveBlock = {};
    }

    if ( typeof element.liveBlock[this._selector] !== 'undefined' ) {
      return this;
    }

    element.liveBlock[this._selector] = {
      doneFirstAllways: false,
      doneFirstShow: false,
      doneFirstHide: false,
    };

    const error = ( e ) => {
      element.sectionLoaderObserver.unobserve( element );
      if ( e ) {
        console.info( e );
      }
    }

    const run = ( element, entry, type ) => {
      if ( 'ready' === this._dependencyStatus ) {
        const Type = type.charAt( 0 ).toUpperCase() + type.slice( 1 );

        if ( false === element.liveBlock[this._selector]['doneFirst' + Type] ) {
          if ( this.__callbacks['first' + Type] ) {
            element.liveBlock[this._selector]['doneFirst' + Type] = true;
            this.__callbacks['first' + Type].bind( element )();
          }
          if ( this._callbacks['first' + Type] ) {
            element.liveBlock[this._selector]['doneFirst' + Type] = true;
            this._callbacks['first' + Type].bind( element )();
          }
        }

        if ( this.__callbacks[type] ) {
          this.__callbacks[type].bind( element )();
        }
        if ( this._callbacks[type] ) {
          this._callbacks[type].bind( element )();
        }
      } else if ( 'not_ready' === this._dependencyStatus ) {
        const done = () => {
          this._dependencyStatus = 'ready';
          run( element, entry, type );
        }

        this._dependencyStatus = 'process'
        this._dependencyFunction( done, error );
      } else if ( 'process' === this._dependencyStatus ) {
        this._dependencyMissedCallbacks.push( { entry, type } );
      }
    }

    const initElement = ( element ) => {
      if ( this._callbacks.init || this.__callbacks.init ) {
        const done = () => {
          this._dependencyStatus = 'ready';
          initElement( element );
        }

        if ( 'ready' === this._dependencyStatus ) {
          if ( this.__callbacks.init ) {
            this.__callbacks.init.bind( element )();
          }
          if ( this._callbacks.init ) {
            this._callbacks.init.bind( element )();
          }
          this._dependencyMissedCallbacks.forEach( ( callback ) => {
            run( element, callback.entry, callback.type );
          } );
        } else if ( 'not_ready' === this._dependencyStatus ) {
          this._dependencyStatus = 'process'
          this._dependencyFunction( done, error );
        }
      }
    }

    const goodBrowsers = ( element ) => {
      let intersectionObserverInit = false;

      element.sectionLoaderObserver = new IntersectionObserver(
        ( [entry] ) => {
          if ( intersectionObserverInit || entry.intersectionRatio > 0 ) {
            intersectionObserverInit = true;
            if ( entry.isIntersecting ) {
              run( element, entry, 'show' );
            } else if ( false === entry.isIntersecting ) {
              run( element, entry, 'hide' );
            }
            run( element, entry, 'allways' );
          } else {
            intersectionObserverInit = true;
          }
        },
        {
          rootMargin: this._margin.bottom + 'px 0px ' + this._margin.top + 'px 0px',
          threshold: [0.01]
        }
      );

      element.sectionLoaderObserver.observe( element );
    }

    const badBrowsers = ( element ) => {
      const done = () => {
        this._dependencyStatus = 'ready'
        badBrowsers( element );
      }

      if ( 'ready' === this._dependencyStatus ) {
        Object.keys( this._callbacks ).forEach( ( callback ) => {
          if ( this.__callbacks[callback] ) {
            this._callbacks[callback].bind( element )();
          }
          if ( this._callbacks[callback] ) {
            this._callbacks[callback].bind( element )();
          }
        } );
      } else if ( 'not_ready' === this._dependencyStatus ) {
        this._dependencyStatus = 'process'
        this._dependencyFunction( done, error );
      }
    }

    initElement( element );

    if ( typeof IntersectionObserver === 'undefined' ) {
      badBrowsers( element );
    } else {
      goodBrowsers( element );
    }

    return this;
  }

  /**
   * todo
   *
   * @return {LiveDom}
   */
  start() {
    const mutationObserver = new MutationObserver( ( mutationsList ) => {
      mutationsList.forEach( ( mutation ) => {
        if ( 'childList' === mutation.type && mutation.addedNodes.length ) {
          mutation.addedNodes.forEach( ( element ) => {
            if ( element instanceof HTMLElement ) {
              if ( element.matches( this._selector ) ) {
                this.addElement( element );
              }

              element.querySelectorAll( this._selector ).forEach( ( element ) => this.addElement( element ) );
            }
          } );
        }
      } );
    } );

    const bodyInit = () => {
      if ( document.body ) {
        mutationObserver.observe( document.body, { subtree: true, childList: true } );
        document.querySelectorAll( this._selector ).forEach( ( element ) => this.addElement( element ) );
      } else {
        window.setTimeout( bodyInit, 50 );
      }
    }

    bodyInit();

    return this;
  }
}

export {LiveDom};

/**
 * @param {string} selector
 * @return {LiveDom}
 */
export default function( selector ) {
  return new LiveDom( selector );
}
