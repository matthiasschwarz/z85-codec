import { decode, encode } from '../src'

const testData1: Uint8Array = Uint8Array.of(
  0x86,
  0x4f,
  0xd2,
  0x6f,
  0xb5,
  0x59,
  0xf7,
  0x5b
)

const testData2: Uint8Array = Uint8Array.of(
  0x8e,
  0x0b,
  0xdd,
  0x69,
  0x76,
  0x28,
  0xb9,
  0x1d,
  0x8f,
  0x24,
  0x55,
  0x87,
  0xee,
  0x95,
  0xc5,
  0xb0,
  0x4d,
  0x48,
  0x96,
  0x3f,
  0x79,
  0x25,
  0x98,
  0x77,
  0xb4,
  0x9c,
  0xd9,
  0x06,
  0x3a,
  0xea,
  0xd3,
  0xb7
)

function arrayToString(array: Uint8Array): string {
  return Array.from(array)
    .map(value => String.fromCharCode(value))
    .join('')
}

describe('encode', function() {
  it('should return empty string', function() {
    expect(encode(new Uint8Array())).toStrictEqual('')
    expect(encode('')).toStrictEqual('')
  })

  it('should return null when data length is not divisible by 4', function() {
    expect(encode(Uint8Array.of(0, 1, 2, 3, 4))).toBeNull()
    expect(encode('ABC')).toBeNull()
  })

  it('should return HelloWorld', function() {
    expect(encode(testData1)).toStrictEqual('HelloWorld')
    expect(encode(arrayToString(testData1))).toStrictEqual('HelloWorld')
  })

  it('should return encoded string', function() {
    const encoded = 'JTKVSB%%)wK0E.X)V>+}o?pNmC{O&4W4b!Ni{Lh6'
    expect(encode(testData2)).toStrictEqual(encoded)
    expect(encode(arrayToString(testData2))).toStrictEqual(encoded)
  })
})

describe('decode', function() {
  it('should return empty Uint8Array', function() {
    expect(decode('')).toBeDefined()
    expect(decode('')!!.length).toStrictEqual(0)
  })

  it('should return null when string length is not divisible by 5', function() {
    expect(decode('a')).toBeNull()
    expect(decode('abc')).toBeNull()
  })

  it('should return null when string includes invalid characters', function() {
    expect(decode('abcd~')).toBeNull()
  })

  it('should return test data 1', function() {
    expect(decode('HelloWorld')).toEqual(testData1)
  })

  it('should return test data 2', function() {
    expect(decode('JTKVSB%%)wK0E.X)V>+}o?pNmC{O&4W4b!Ni{Lh6')).toEqual(
      testData2
    )
  })
})
