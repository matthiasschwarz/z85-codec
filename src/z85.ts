const encoder: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '.',
  '-',
  ':',
  '+',
  '=',
  '^',
  '!',
  '/',
  '*',
  '?',
  '&',
  '<',
  '>',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '@',
  '%',
  '$',
  '#',
]

const decoder: number[] = [
  0x00,
  0x44,
  0x00,
  0x54,
  0x53,
  0x52,
  0x48,
  0x00,
  0x4b,
  0x4c,
  0x46,
  0x41,
  0x00,
  0x3f,
  0x3e,
  0x45,
  0x00,
  0x01,
  0x02,
  0x03,
  0x04,
  0x05,
  0x06,
  0x07,
  0x08,
  0x09,
  0x40,
  0x00,
  0x49,
  0x42,
  0x4a,
  0x47,
  0x51,
  0x24,
  0x25,
  0x26,
  0x27,
  0x28,
  0x29,
  0x2a,
  0x2b,
  0x2c,
  0x2d,
  0x2e,
  0x2f,
  0x30,
  0x31,
  0x32,
  0x33,
  0x34,
  0x35,
  0x36,
  0x37,
  0x38,
  0x39,
  0x3a,
  0x3b,
  0x3c,
  0x3d,
  0x4d,
  0x00,
  0x4e,
  0x43,
  0x00,
  0x00,
  0x0a,
  0x0b,
  0x0c,
  0x0d,
  0x0e,
  0x0f,
  0x10,
  0x11,
  0x12,
  0x13,
  0x14,
  0x15,
  0x16,
  0x17,
  0x18,
  0x19,
  0x1a,
  0x1b,
  0x1c,
  0x1d,
  0x1e,
  0x1f,
  0x20,
  0x21,
  0x22,
  0x23,
  0x4f,
  0x00,
  0x50,
  0x00,
  0x00,
]

/**
 *  Encode data with the Z85 codec
 *
 * @param data - data to encode.
 * Length needs to be divisible by 4 otherwise null is returned.
 * String needs to be encoded in UTF-8.
 * @returns encoded data as string or null when encoding is not possible
 * @see {@link https://github.com/zeromq/rfc/blob/master/src/spec_32.c} for the used reference implementation
 */
export function encode(data: Uint8Array | string): string | null {
  if (data.length % 4) return null
  let encoded = ''
  let byteNbr = 0
  let value = 0
  const dataIndexAccess =
    typeof data === 'string'
      ? (data: string, index: number): number => data.charCodeAt(index)
      : (data: Uint8Array, index: number): number => data[index]

  while (byteNbr < data.length) {
    value =
      value * 256 + dataIndexAccess(data as Uint8Array & string, byteNbr++)
    if (byteNbr % 4 === 0) {
      let divisor = 52200625 // 85 * 85 * 85 * 85
      while (divisor >= 1) {
        encoded += encoder[Math.floor(value / divisor) % 85]
        divisor /= 85
      }
      value = 0
    }
  }

  return encoded
}

/**
 *  Decode data with the Z85 codec
 *
 * @param string - string to decode.
 * Length needs to be divisible by 5 otherwise null is returned.
 * Needs to be encoded in UTF-8.
 * @returns decoded string as Uint8Array or null when decoding is not possible
 * @see {@link https://github.com/zeromq/rfc/blob/master/src/spec_32.c} for the used reference implementation
 */
export function decode(string: string): Uint8Array | null {
  if (string.length % 5) return null
  const decoded = new Uint8Array((string.length * 4) / 5)
  let byteNbr = 0
  let charNbr = 0
  let value = 0

  while (charNbr < string.length) {
    const index = string.charCodeAt(charNbr++) - 32
    if (index < 0 || index >= decoder.length) return null // invalid characters in string
    value = value * 85 + decoder[index]
    if (charNbr % 5 === 0) {
      let divisor = 16777216 // 256 * 256 * 256
      while (divisor >= 1) {
        decoded[byteNbr++] = (value / divisor) % 256
        divisor /= 256
      }
      value = 0
    }
  }

  return decoded
}
