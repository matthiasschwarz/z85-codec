# z85-codec

[![NPM](https://img.shields.io/npm/v/z85-codec.svg?style=flat)](https://npmjs.org/package/z85-codec)
[![Coverage Status](https://coveralls.io/repos/github/matthiasschwarz/z85-codec/badge.svg?branch=master)](https://coveralls.io/github/matthiasschwarz/z85-codec?branch=master)

> Z85 - ZeroMQ's ascii85 encoding format

#### Why should i use this package instead of [z85](https://www.npmjs.com/package/z85)?
This package and [z85](https://www.npmjs.com/package/z85) uses the same 
[reference implementation](https://github.com/zeromq/rfc/blob/master/src/spec_32.c) provided by 
[ZeroMQ](https://zeromq.org/). 
The difference is that this library provides Typescript declarations and uses 
[typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) to be compatible in the browser. 
 
## API

### encode(data: Uint8Array | string): string | null

> Encode data with the Z85 codec

#### Parameters

* **data**: Uint8Array | string - data to encode
    * Data length must be divisible by 4
    * String encoding must be UTF-8
    
#### Returns

* **string** - encoded data
* **null** - when data length is not divisible by 4

### decode(string: string): Uint8Array | null

> Decode data with the Z85 codec

#### Parameters

* **string** - string to decode
    * Length must be divisible by 5
    * Encoding must be UTF-8
    
#### Returns

* **Uint8Array** - decoded string
* **null** - when data length is not divisible by 5 or string includes invalid characters

## License

Licensed under the [MIT](LICENSE) License.