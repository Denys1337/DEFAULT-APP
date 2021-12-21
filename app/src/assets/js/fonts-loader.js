/* global theme */

export class FontLoader {
  /**
   * @param {string} fontID - unique font ID.
   * @param {string} fontUrl - font url.
   * @param {boolean} (forceUpdate) - fonts are loaded if they are not already in the local storage, if you specify true,
   *                                  they will be overwritten in any case, default false.
   */
  constructor( fontID, fontUrl, forceUpdate = false ) {
    this._ID = this._toCamelCase( fontID );
    this._url = fontUrl;
    this._keyCss = 'fontLoaderCss' + this._ID;
    this._keyUrl = 'fontLoaderUrl' + this._ID;

    if ( forceUpdate || this._needUpdate() ) {
      this._update();
    }
  }

  _needUpdate() {
    return this._url !== localStorage.getItem( this._keyUrl ) || ! localStorage.getItem( this._keyCss );
  }

  _update() {
    localStorage.setItem( this._keyUrl, this._url );
    localStorage.setItem( this._keyCss, '' );

    if ( this._url.startsWith( 'http' ) ) {
      fetch( this._url )
        .then( response => response.text() )
        .then( css => this.css = css )
        .then( () => {
          const promises = this.css.match( /(url\(['"]?)(https:\/\/)?[^)"']+/g ).map( this._replace.bind( this ) );

          return Promise.all( promises ).then( () => {
            this._insert();
            localStorage.setItem( this._keyCss, this.css );
          } );
        } );
    } else {
      const link = document.createElement( 'link' );
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this._url;

      document.head.appendChild( link );
    }
  }

  _replace( url ) {
    const replaceUrl = url.replace( /^url\(['"]?/, '' );

    url = replaceUrl.startsWith( 'http' ) ? replaceUrl : theme.url + 'fonts/' + replaceUrl;


    return new Promise( ( resolve, reject ) => {
      fetch( url )
        .then( response => response.blob() )
        .then( blob => {
          const self = this;
          const reader = new FileReader();

          reader.addEventListener( 'load', function() {
            self.css = self.css.replace( replaceUrl, this.result.toString() );
            resolve();
          } );

          reader.readAsDataURL( blob );
        } )
        .catch( reject )
    } );
  }

  _insert() {
    const style = document.createElement( 'style' );
    style.rel = 'stylesheet';
    document.head.appendChild( style );
    style.textContent = this.css;
  }

  _toCamelCase( str ) {
    return ( ' ' + str ).toLowerCase().replace( /[^a-zA-Z0-9]+(.)/g, ( m, chr ) => chr.toUpperCase() );
  }
}

/**
 * @param {string} fontID - unique font ID.
 * @param {string} fontUrl - font url.
 * @param {boolean} [forceUpdate=false] - fonts are loaded if they are not already in the local storage, if you specify
 *                                        true, they will be overwritten in any case, default false.
 */
export default function( fontID, fontUrl, forceUpdate = false ) {
  new FontLoader( fontID, fontUrl, forceUpdate );
}
