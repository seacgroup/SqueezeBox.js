/* 
 * The MIT Modified License (MIT, Erich Horn)
 * Copyright (c) 2012, 2013 Erich
 *
 * Author Erich
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice, author and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 */

/* compression and decompletion library */

( function ( ) {
    'use strict';
    var SEAC = self.exports ? self.exports : ( self.SEAC || self ),
        _Dictionary = {},
        _SCache = {},
        _UCache = {},
        _Literals = [
            "null", "true", "false"
        ],
        _NonReservedWords = [
            "NaN", "Infinity", "undefined"
        ],
        _PredefinedWords = [
            'AnalyserNode', 'ApplicationCache', 'Array', 'ArrayBuffer', 'Attr', 'Audio', 'AudioBuffer', 'AudioBufferSourceNode', 'AudioDestinationNode', 'AudioListener', 'AudioNode', 'AudioParam', 'AudioProcessingEvent', 'AutocompleteErrorEvent', 'BarProp', 'BeforeLoadEvent', 'BeforeUnloadEvent', 'BiquadFilterNode', 'Blob', 'Boolean', 'CDATASection', 'CSS', 'CSSCharsetRule', 'CSSFontFaceRule', 'CSSHostRule', 'CSSImportRule', 'CSSKeyframeRule', 'CSSKeyframesRule', 'CSSMediaRule', 'CSSPageRule', 'CSSPrimitiveValue', 'CSSRule', 'CSSRuleList', 'CSSStyleDeclaration', 'CSSStyleRule', 'CSSStyleSheet', 'CSSValue', 'CSSValueList', 'CSSVariablesMap', 'CSSViewportRule', 'CanvasGradient', 'CanvasPattern', 'CanvasRenderingContext2D', 'ChannelMergerNode', 'ChannelSplitterNode', 'CharacterData', 'ClientRect', 'ClientRectList', 'Clipboard', 'CloseEvent', 'Comment', 'CompositionEvent', 'ConvolverNode', 'Counter', 'CustomEvent', 'DOMException', 'DOMImplementation', 'DOMParser', 'DOMSettableTokenList', 'DOMStringList', 'DOMStringMap', 'DOMTokenList', 'DataTransferItemList', 'DataView', 'Date', 'DelayNode', 'DeviceMotionEvent', 'DeviceOrientationEvent', 'Document', 'DocumentFragment', 'DocumentType', 'DynamicsCompressorNode', 'Element', 'Entity', 'Error', 'ErrorEvent', 'EvalError', 'Event', 'EventSource', 'EventTarget', 'File', 'FileError', 'FileList', 'FileReader', 'Float32Array', 'Float64Array', 'FocusEvent', 'FormData', 'Function', 'GainNode', 'HTMLAllCollection', 'HTMLAnchorElement', 'HTMLAppletElement', 'HTMLAreaElement', 'HTMLAudioElement', 'HTMLBRElement', 'HTMLBaseElement', 'HTMLBodyElement', 'HTMLButtonElement', 'HTMLCanvasElement', 'HTMLCollection', 'HTMLContentElement', 'HTMLDListElement', 'HTMLDataListElement', 'HTMLDirectoryElement', 'HTMLDivElement', 'HTMLDocument', 'HTMLElement', 'HTMLEmbedElement', 'HTMLFieldSetElement', 'HTMLFontElement', 'HTMLFormControlsCollection', 'HTMLFormElement', 'HTMLFrameElement', 'HTMLFrameSetElement', 'HTMLHRElement', 'HTMLHeadElement', 'HTMLHeadingElement', 'HTMLHtmlElement', 'HTMLIFrameElement', 'HTMLImageElement', 'HTMLInputElement', 'HTMLKeygenElement', 'HTMLLIElement', 'HTMLLabelElement', 'HTMLLegendElement', 'HTMLLinkElement', 'HTMLMapElement', 'HTMLMarqueeElement', 'HTMLMediaElement', 'HTMLMenuElement', 'HTMLMetaElement', 'HTMLMeterElement', 'HTMLModElement', 'HTMLOListElement', 'HTMLObjectElement', 'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLOptionsCollection', 'HTMLOutputElement', 'HTMLParagraphElement', 'HTMLParamElement', 'HTMLPreElement', 'HTMLProgressElement', 'HTMLQuoteElement', 'HTMLScriptElement', 'HTMLSelectElement', 'HTMLShadowElement', 'HTMLSourceElement', 'HTMLSpanElement', 'HTMLStyleElement', 'HTMLTableCaptionElement', 'HTMLTableCellElement', 'HTMLTableColElement', 'HTMLTableElement', 'HTMLTableRowElement', 'HTMLTableSectionElement', 'HTMLTemplateElement', 'HTMLTextAreaElement', 'HTMLTitleElement', 'HTMLTrackElement', 'HTMLUListElement', 'HTMLUnknownElement', 'HTMLVideoElement', 'HashChangeEvent', 'History', 'IDBCursor', 'IDBCursorWithValue', 'IDBDatabase', 'IDBFactory', 'IDBIndex', 'IDBKeyRange', 'IDBObjectStore', 'IDBOpenDBRequest', 'IDBRequest', 'IDBTransaction', 'IDBVersionChangeEvent', 'Image', 'ImageBitmap', 'ImageData', 'Infinity', 'InputMethodContext', 'Int16Array', 'Int32Array', 'Int8Array', 'Intl', 'JSON', 'KeyboardEvent', 'Location', 'Math', 'MediaController', 'MediaElementAudioSourceNode', 'MediaError', 'MediaKeyError', 'MediaKeyEvent', 'MediaList', 'MediaSource', 'MediaStreamAudioDestinationNode', 'MediaStreamAudioSourceNode', 'MediaStreamEvent', 'MediaStreamTrack', 'MessageChannel', 'MessageEvent', 'MessagePort', 'MimeType', 'MimeTypeArray', 'MouseEvent', 'Mustache', 'MutationEvent', 'MutationObserver', 'MutationRecord', 'NaN', 'NamedNodeMap', 'Navigator', 'Node', 'NodeFilter', 'NodeIterator', 'NodeList', 'Notation', 'Notification', 'Number', 'Object', 'OfflineAudioCompletionEvent', 'Option', 'OscillatorNode', 'OverflowEvent', 'PageTransitionEvent', 'Performance', 'PerformanceEntry', 'PerformanceMark', 'PerformanceMeasure', 'PerformanceNavigation', 'PerformanceResourceTiming', 'PerformanceTiming', 'PeriodicWave', 'Plugin', 'PluginArray', 'PopStateEvent', 'ProcessingInstruction', 'ProgressEvent', 'RGBColor', 'RTCIceCandidate', 'RTCSessionDescription', 'Range', 'RangeError', 'Rect', 'ReferenceError', 'RegExp',   'SVGAElement', 'SVGAltGlyphDefElement', 'SVGAltGlyphElement', 'SVGAltGlyphItemElement', 'SVGAngle', 'SVGAnimateColorElement', 'SVGAnimateElement', 'SVGAnimateMotionElement', 'SVGAnimateTransformElement', 'SVGAnimatedAngle', 'SVGAnimatedBoolean', 'SVGAnimatedEnumeration', 'SVGAnimatedInteger', 'SVGAnimatedLength', 'SVGAnimatedLengthList', 'SVGAnimatedNumber', 'SVGAnimatedNumberList', 'SVGAnimatedPreserveAspectRatio', 'SVGAnimatedRect', 'SVGAnimatedString', 'SVGAnimatedTransformList', 'SVGAnimationElement', 'SVGCircleElement', 'SVGClipPathElement', 'SVGColor', 'SVGComponentTransferFunctionElement', 'SVGCursorElement', 'SVGDefsElement', 'SVGDescElement', 'SVGDocument', 'SVGElement', 'SVGElementInstance', 'SVGElementInstanceList', 'SVGEllipseElement', 'SVGFEBlendElement', 'SVGFEColorMatrixElement', 'SVGFEComponentTransferElement', 'SVGFECompositeElement', 'SVGFEConvolveMatrixElement', 'SVGFEDiffuseLightingElement', 'SVGFEDisplacementMapElement', 'SVGFEDistantLightElement', 'SVGFEDropShadowElement', 'SVGFEFloodElement', 'SVGFEFuncAElement', 'SVGFEFuncBElement', 'SVGFEFuncGElement', 'SVGFEFuncRElement', 'SVGFEGaussianBlurElement', 'SVGFEImageElement', 'SVGFEMergeElement', 'SVGFEMergeNodeElement', 'SVGFEMorphologyElement', 'SVGFEOffsetElement', 'SVGFEPointLightElement', 'SVGFESpecularLightingElement', 'SVGFESpotLightElement', 'SVGFETileElement', 'SVGFETurbulenceElement', 'SVGFilterElement', 'SVGFontElement', 'SVGFontFaceElement', 'SVGFontFaceFormatElement', 'SVGFontFaceNameElement', 'SVGFontFaceSrcElement', 'SVGFontFaceUriElement', 'SVGForeignObjectElement', 'SVGGElement', 'SVGGlyphElement', 'SVGGlyphRefElement', 'SVGGradientElement', 'SVGGraphicsElement', 'SVGHKernElement', 'SVGImageElement', 'SVGLength', 'SVGLengthList', 'SVGLineElement', 'SVGLinearGradientElement', 'SVGMPathElement', 'SVGMarkerElement', 'SVGMaskElement', 'SVGMatrix', 'SVGMetadataElement', 'SVGMissingGlyphElement', 'SVGNumber', 'SVGNumberList', 'SVGPaint', 'SVGPathElement', 'SVGPathSeg', 'SVGPathSegArcAbs', 'SVGPathSegArcRel', 'SVGPathSegClosePath', 'SVGPathSegCurvetoCubicAbs', 'SVGPathSegCurvetoCubicRel', 'SVGPathSegCurvetoCubicSmoothAbs', 'SVGPathSegCurvetoCubicSmoothRel', 'SVGPathSegCurvetoQuadraticAbs', 'SVGPathSegCurvetoQuadraticRel', 'SVGPathSegCurvetoQuadraticSmoothAbs', 'SVGPathSegCurvetoQuadraticSmoothRel', 'SVGPathSegLinetoAbs', 'SVGPathSegLinetoHorizontalAbs', 'SVGPathSegLinetoHorizontalRel', 'SVGPathSegLinetoRel', 'SVGPathSegLinetoVerticalAbs', 'SVGPathSegLinetoVerticalRel', 'SVGPathSegList', 'SVGPathSegMovetoAbs', 'SVGPathSegMovetoRel', 'SVGPatternElement', 'SVGPoint', 'SVGPointList', 'SVGPolygonElement', 'SVGPolylineElement', 'SVGPreserveAspectRatio', 'SVGRadialGradientElement', 'SVGRect', 'SVGRectElement', 'SVGRenderingIntent', 'SVGSVGElement', 'SVGScriptElement', 'SVGSetElement', 'SVGStopElement', 'SVGStringList', 'SVGStyleElement', 'SVGSwitchElement', 'SVGSymbolElement', 'SVGTSpanElement', 'SVGTextContentElement', 'SVGTextElement', 'SVGTextPathElement', 'SVGTextPositioningElement', 'SVGTitleElement', 'SVGTransform', 'SVGTransformList', 'SVGUnitTypes', 'SVGUseElement', 'SVGVKernElement', 'SVGViewElement', 'SVGViewSpec', 'SVGZoomEvent', 'Screen', 'ScriptProcessorNode', 'SecurityPolicy', 'Selection', 'SharedWorker', 'SpeechInputEvent', 'Storage', 'StorageEvent', 'String', 'StyleSheet', 'StyleSheetList', 'SyntaxError', 'Text', 'TextEvent', 'TextMetrics', 'TextTrack', 'TextTrackCue', 'TextTrackCueList', 'TextTrackList', 'TimeRanges', 'Touch', 'TouchEvent', 'TouchList', 'TrackEvent', 'TransitionEvent', 'TreeWalker', 'TypeError', 'UIEvent', 'URIError', 'URL', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray', 'ValidityState', 'WaveShaperNode', 'WebGLActiveInfo', 'WebGLBuffer', 'WebGLContextEvent', 'WebGLFramebuffer', 'WebGLProgram', 'WebGLRenderbuffer', 'WebGLRenderingContext', 'WebGLShader', 'WebGLShaderPrecisionFormat', 'WebGLTexture', 'WebGLUniformLocation', 'WebKitAnimationEvent', 'WebKitCSSFilterRule', 'WebKitCSSFilterValue', 'WebKitCSSMatrix', 'WebKitCSSMixFunctionValue', 'WebKitCSSTransformValue', 'WebKitMediaSource', 'WebKitMutationObserver', 'WebKitPoint', 'WebKitShadowRoot', 'WebKitSourceBuffer', 'WebKitSourceBufferList', 'WebKitTransitionEvent', 'WebSocket', 'WheelEvent', 'Window', 'Worker', 'XMLDocument', 'XMLHttpRequest', 'XMLHttpRequestProgressEvent', 'XMLHttpRequestUpload', 'XMLSerializer', 'XPathEvaluator', 'XPathExpression', 'XPathResult', 'XSLTProcessor',
            'applicationCache', 'chrome', 'clientInformation', 'closed', 'console', 'crypto', 'decodeURI', 'decodeURIComponent', 'defaultStatus', 'defaultstatus', 'devicePixelRatio', 'document', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'event', 'external', 'frameElement', 'frames', 'history', 'indexedDB', 'innerHeight', 'innerWidth', 'isFinite', 'isNaN', 'length', 'localStorage', 'location', 'locationbar', 'menubar', 'name', 'navigator', 'offscreenBuffering', 'opener', 'outerHeight', 'outerWidth', 'pageXOffset', 'pageYOffset', 'parent', 'parseBool', 'parseFloat', 'parseInt', 'performance', 'personalbar', 'screen', 'screenLeft', 'screenTop', 'screenX', 'screenY', 'scrollX', 'scrollY', 'scrollbars', 'self', 'sessionStorage', 'status', 'statusbar', 'styleMedia', 'toolbar', 'top', 'undefined', 'unescape', 'webkitAudioContext', 'webkitAudioPannerNode', 'webkitIDBCursor', 'webkitIDBDatabase', 'webkitIDBFactory', 'webkitIDBIndex', 'webkitIDBKeyRange', 'webkitIDBObjectStore', 'webkitIDBRequest', 'webkitIDBTransaction', 'webkitIndexedDB', 'webkitMediaStream', 'webkitNotifications', 'webkitOfflineAudioContext', 'webkitRTCPeerConnection', 'webkitSpeechGrammar', 'webkitSpeechGrammarList', 'webkitSpeechRecognition', 'webkitSpeechRecognitionError', 'webkitSpeechRecognitionEvent', 'webkitStorageInfo', 'webkitURL', 'window'
        ],
        _ReservedSymbols = [
            "~", "}", "||", "|=", "|", "{", "^=", "^", "]", "[", "?", ">>>=", ">>>", ">>=", ">>", ">=", ">", "===", "==", "=", "<=", "<<=", "<<", "<", ";", ":", "/=", "/", ".", "-=", "--", "-", ",", "+=", "++", "+", "*=", "*", ")", "(", "&=", "&&", "&", "%=", "%", "!==", "!=", "!"
        ],
        _ReservedWordsLibrary = {
            "ECMAScript5.1": [
                "with", "while", "void", "var", "typeof", "try", "throw", "this", "switch", "return", "new", "instanceof", "in", "if", "function", "for", "finally", "else", "do", "delete", "default", "debugger", "continue", "catch", "case", "break",
                { strict: ["class", "const", "enum", "export", "extends", "import", "super"] }
            ],
        },
        _ReservedWordsDefault = _ReservedWordsLibrary[Object.keys( _ReservedWordsLibrary )[0]],
        _IdentifierRE = /[A-Za-z$_\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc][A-Za-z$_a-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc0-9\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19b0-\u19c0\u19c8\u19c9\u19d0-\u19d9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2-\u1cf4\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f1\ua900-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]*/,
        // add RegExp constant re to next line  \/(?:[^\\\/\n]+|\\[\x20-\uff3f])+\/[qimy]*
        _ConstantRE = /"(?:[^"\\\n]+|\\.)*"|'(?:[^'\\\n]+|\\.)*'|0(?:[xX][0-9a-fA-f]+|[0-7]+)|\d+(?:\.\d*)?(?:[eE]\+?\d+)?|\.\d+|\/(?:[^\\\/\n]+|\\[\x20-\uff3f])+\/[qimy]*/,
        _NewLine = /\n/,
        _WhitespaceRE = /[\t\v\f\r\x20\xa0]*(?:\/\/[^\n]*|\/\*(?:[^*]+|\*(?!\/))*\*\/[\t\v\f\r\x20\xa0]*)*/,
        _EscapeAndJoin = function ( arr, token, escape ) {
            var result = [],
                f;
            
            if ( escape instanceof Function )
                f = escape;
            else if ( escape instanceof RegExp ) {
                escape = new RegExp( escape.source, 'g' );
                f = function ( str ) { return str.replace( escape, "\\$&" ) };
            } else if ( typeof ( escape || ( escape = '\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|' ) ) === 'string' ) {
                escape = new RegExp( '[\\' + escape.split( '' ).join( '\\' ) + ']', 'g' );
                f = function ( str ) { return str.replace( escape, '\\$&' ) };
            } else
                throw 'invalid escape characters (third argument)';
            
            arr.forEach( function ( token, i ) { result[i] = f( token ); } );
            return result.join( token || '|' );
        },
        _CompileRegexp = function ( ) {
            var j, t, u,
                list = _ReservedWordsDefault.slice.call( arguments ),
                mode = typeof list[0] === 'string' && list.shift( ),
                reservedWords = [],
                i = list.length - 1,
                symbols = ( i >= 0 && list[i] instanceof Array ) ? list.pop( ) : _ReservedSymbols,
                nonreserved = ( i >= 0 && list[i] instanceof Array ) ? list.pop( ) : _NonReservedWords,
                literals = ( i >= 0 && list[i] instanceof Array ) ? list.pop( ) : _Literals,
                predefined = ( i >= 0 && list[i] instanceof Array ) ? list.pop( ) : _PredefinedWords,
                modeReservedWords = ( i >= 0 && list[i] instanceof Object && !( list[i] instanceof Array ) ) ? list.pop( ) : {},
                re;
            
            list.forEach( function ( rwl, idx ) {
                ( t = ( rwl instanceof Array ? rwl : _ReservedWordsLibrary[rwl] ) ).forEach( function ( rw ) {
                    if ( reservedWords.indexOf( rw ) < 0 ) {
                        if ( typeof rw === 'string' )
                            reservedWords.push( rw );
                        else if ( rw instanceof Object ) {
                            if ( ( u = modeReservedWords[mode] ) )
                                u.forEach( function ( mrw ) {
                                    if ( reservedWords.indexOf( rw ) < 0 )
                                        reservedWords.push( mrw );
                                } );
                        }
                    }
                } );
            } );
            
            re = new RegExp( '^(?:' + _WhitespaceRE.source + ')(?:(('
                    + _EscapeAndJoin( reservedWords )
                    + ')|(' + _EscapeAndJoin( nonreserved )
                    + ')|(' + _EscapeAndJoin( literals )
                    + ')|(' + _IdentifierRE.source
                    + '))\\b|(' + _ConstantRE.source
                    + ')|(' + _EscapeAndJoin( symbols )
                    + ')|(' + _NewLine.source
                    + '))' );
            re.named = [ 'word', 'reserved', 'nonreserver', 'literal', 'identifier', 'constant', 'symbol', 'newline' ];
            return re;
        },
        _Tokenize = function ( content, regexp ) {
            var typeLookup = { },
                tokenCount = { },
                tokenLookup = [ ],
                i = 0,
                l = content.length,
                t, m, n, o, p;
            
            while ( i < l && ( m = content.slice( i ).match( regexp ) ) ) {
                n = null;
                o = m.shift( );
                console.log( o, m );
                m.forEach( function ( part, mi ) {
                    if ( part && ( t = regexp.named[mi] ) ) {
                        tokenCount[p = part] = ( tokenCount[p] || 0 ) + 1;
                        if ( typeLookup[n = t] == null )
                            typeLookup[n] = { };
                        if ( typeLookup[n][p] == null )
                            typeLookup[n][p] = [ ];
                        typeLookup[n][p].push( i );
                    }
                } );
                if ( n )
                    tokenLookup.push( { token: p, pos: i, type: n, isword: !! m[0] } );
                i += o.length;
            }
            
            if ( i < l && ! content.slice( i ).match( /^\s+$/ ) )
                console.debug( 'Tokenize halted prematurely at ' + i );
            
            return { types: typeLookup, tokens: tokenLookup, count: tokenCount };
        },
        _CleanTokens = function ( tokens ) {
            var newline = "\n",
                result = [],
                l = {},
                t, n;
            tokens.forEach( function ( token, i ) {
                if ( token.type === 'newline' ) {
                    if ( ( t = l.type ) && t !== 'newline' && ( t = result[result.length-1] ).type && t.token !== '{' && ( n = tokens[i+1] ) && n.token !== ';' && n.token !== '}' )
                        result.push( { token: newline, isword: false, type: 'newline', pos: token.pos } );
                } else if ( token.token === ';' ) {
                    if ( ( t = result[result.length-1] ).type && t.token !== ')' && ( n = tokens[i+1] ) && n.token !== '}' )
                        result.push( token );
                } else
                    result.push( token );
                l = token;
            } );
            // clean off tailing newlines
            l = result.length;
            while ( l-- > 0 && result[l].type === 'newline' );
            result.splice( l + 1 );
            return result;
        },
        _BeautifyTokens = function ( tokens ) {
            return tokens;
        },
        _GetScopeLayers = function ( tokens ) {
            var layers = {};
            
            layers = tokens;
            return layers;
        },
        _FindDeclared = function ( tokenized, layers ) {
            var declared = { };
            // consider scope and scope layer depth
            declared = layers;
            return declared;
        },
        _SqueezeDeclared = function ( tokenized, declared ) {
            var result = {};
            
            result = declared;
            return result;
        },
        _JoinTokens = function ( tokens ) {
            var newline = "\n",
                result = [],
                l = {};
            tokens.forEach( function ( token ) {
                if ( token.isword && l.isword )
                    result.push( ' ', token.token );
                else
                    result.push( token.type === 'newline' ? newline : token.token );
                l = token;
            } );
            return result.join( '' );
        },
        Squeeze = function ( content, options ) {
            var squeezeMap = {},
                 re, tokenized, tokens;
            
            if ( options instanceof RegExp ) {
                re = options;
                options = arguments[2] || { };
            } else {
                re = _CompileRegexp( '', ( options || ( options = { } ) ).scriptType || 'ECMAScript5.1' );
            }
        
            tokenized = _Tokenize( content, re );
            tokens = ( options.clean || options.clean == null ) ? _CleanTokens( tokenized.tokens ) : tokenized.tokens;
            
            if ( options.squeeze || options.squeeze == null ) {
                tokens = _SqueezeDeclared( tokenized, _FindDeclared( tokenized, _GetScopeLayers( tokens ) ), squeezeMap );
                tokenized.map = squeezeMap;
            }
            
            return _JoinTokens( tokens );
        },
        Unsqueeze = function ( bundle, options ) {
            var map = ( options || ( options = {} ) ).map || {},
                version = [ bundle.charCodeAt( 0 ), bundle.charCodeAt( 1 ), bundle.charCodeAt( 2 )].join( '.' ) + ( bundle[3] || '' ),
                crc32 = ( ( bundle.charCodeAt( 4 ) << 8 | bundle.charCodeAt( 5 ) ) << 8 | bundle.charCodeAt( 6 ) ) << 8 | bundle.charCodeAt( 7 ),
                scriptTypeCrc32 = ( ( bundle.charCodeAt( 8 ) << 8 | bundle.charCodeAt( 9 ) ) << 8 | bundle.charCodeAt( 10 ) ) << 8 | bundle.charCodeAt( 11 ),
                scriptType = _GetScriptTypeFromCRC32( scriptTypeCrc32 ) || options.scriptType || 'ECMAScript5.1',
                p = 12,
                content = [ ];
            
            if ( options.clean )
                content = _CleanTokens( content );
            if ( options.beautify )
                content = _BeautifyTokens( content );
            
            return _JoinTokens( content );
        };
    
    Squeeze.Compile = _CompileRegexp;
    Squeeze.Tokenize = _Tokenize;
    Squeeze.CleanTokens = _CleanTokens;
    Squeeze.JoinTokens = _JoinTokens;
    SEAC.Squeeze = Squeeze;
    
    SEAC.Unsqueeze = Unsqueeze;
    
    return Squeeze;
} )( );
