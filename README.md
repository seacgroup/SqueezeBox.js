SqueezeBox.js
=============

SqueezeBox.js is a javascript parser, tokenized, minimizer, compressor, beautifier, expander, mapper tool.  I created this to implant in my brain real javascript syntax rules rather than the common ones believed by most of the scripting / programming / developer community.  If you understand about newlines, semi-colons and auto-insertion, then you know what I am talking about.  

Basic Usage: 

  * boxed = Squeeze.box( content )      - tokenize, clean and encode content
  * unboxed = Squeeze.unbox( boxed )    - decode, and expand boxed content

Several other features included, some more hooked, in progress and planned.

This library is pre-alpha, but the basic features are stable (at least for initial version).  I will post confirmed bugs and gotchas as they appear or are reported.  Feel free to contribute improvements and / or suggestions.  Please be clear and specific, examples or test cases are the best way for me to quickly understand what you are taking about.

Please don't flame or send abuse, this is a pre-alpha product, but with great potential.  And on the otherhand if you are looking for a turn-key solution, go give your money to someone.  Yeah, if you give me USD one million, I will listen to any amount of non-sense and abuse from you.  Now that I have sufficiently insulted any you snot nosed brats out there ( thats right, check your nose ) maybe you will go elsewhere.  I am 54 years old, so I am allowed to be a cranky old fart.  I have been part of the technology that has brought us to where we are today.  If you have complaints about todays technology it is probably my fault.  

For the rest of you, thanks for your interest and really I do welcome suggests, fixes and criticism, just make a small effort to be coherent.

I will end this README with an simple usage example.

Example using ajax load SqueezeBox.js boxes itself.:

&lt;script type=&quot;text/javascript&quot; src=&quot;js/Squeeze.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
( function ( ) {
    var url = 'js/Squeeze.js',
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


This repo dedicated to The Who, Sheryl Crow and others who sang this song before you were born.
  http://youtu.be/49H0IfoILwQ
  http://youtu.be/XG3Re60iWUY

