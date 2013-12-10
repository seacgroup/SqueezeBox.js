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


Some links about technology pioneers:
  http://www.digitaltrends.com/home-theater/audio-innovator-and-technology-pioneer-ray-dolby-dies-at-age-80/
  http://www.examiner.com/article/steve-jobs-1955-2011-technology-pioneer-worked-the-early-days-of-atari
  http://www.geekwire.com/2013/tech-pioneer-bill-gates-lugs-giant-bag-paper-books/
  http://www.urbancowboy.ca/2011/07/17/technology-and-transparency-next-step-for-livestock-farmers-says-animal-welfare-pioneer/
  http://www.theatlantic.com/technology/archive/2013/10/you-can-now-liberate-gifs-from-the-web-with-an-old-weird-technology/280804/
  http://www.denverpost.com/business/ci_23787568/maney-tech-pioneer-talks-about-engaging-kids-economic
  http://content.time.com/time/specials/packages/article/0,28804,1948486_1948485_1948483,00.html
  http://www.technologyreview.com/news/520216/three-questions-for-tech-education-pioneer-scot-osterweil/
  http://upstart.bizjournals.com/entrepreneurs/hot-shots/2013/03/27/nolan-bushnell-talks-to-silicon-valley.html?page=all
  http://www.nottinghampost.com/Family-truck-firm-leads-way-pioneering-green-fuel/story-20033625-detail/story.html
  
