 
/**
 * Generates a random UUID (Universally Unique Identifier) following the version
 * 4 standard.
 *
 * The function replaces each 'x' and 'y' in the template
 * 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' with random hexadecimal digits. For
 * 'y', the function ensures the first hexadecimal digit is '8', '9', 'A', or
 * 'B' as per the UUID v4 standard.
 *
 * @returns A string representing a version 4 UUID.
 *
 * @example
 *
 * const id = uuidv4();
 * console.log(id); // Outputs: '3f0d2c77-4f69-4c1e-8a6e-35e866e8a5d1'
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
