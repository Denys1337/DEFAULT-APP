// noinspection NpmUsedModulesInstalled
const Handlebars = require( 'handlebars' );

module.exports = function( price, currency ) {
  currency = typeof currency === 'string' ? currency : '&#36;';
  price = isNaN( price ) ? '0.00' : parseFloat( price ).toFixed( 2 );

  return new Handlebars.SafeString( '<span class="woocommerce-Price-currencySymbol">' + currency + '</span>' + price );
};
