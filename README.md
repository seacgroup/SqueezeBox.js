SqueezeBox.js
=============

SqueezeBox.js is a javascript parser, tokenized, minimizer, compressor, beautifier, expander, mapper tool.  I created this to implant in my brain real javascript syntax rules rather than the common ones believed by most of the scripting / programming / developer community.  If you understand about newlines, semi-colons and auto-insertion, then you know what I am talking about.  

Basic Usage:

&lt;script type=&quot;text/javascript&quot; src=&quot;SqueezeBox.js&quot;&gt;&lt;/script&gt;

&lt;script type=&quot;text/javascript&quot;&gt;

( function ( ) {
    var url = 'SqueezeBox.js',
        xhr = new XMLHttpRequest,
        original, boxed, unboxed;
    
    xhr.open( 'get', url, true );
    xhr.addEventListener( 'load', function ( ) {
      console.log( original = xhr.responseText );
      console.log( boxed = Squeeze.box( original ) );
      console.log( unboxed = Squeeze.unbox( boxed ) );
    } );
} );

&lt;/script&gt;
