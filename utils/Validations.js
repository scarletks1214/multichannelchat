
// export const NAME_VALIDATION_REGEX = /^[a-zA-Z][a-zA-Z0-9_-.#]*/
export const NAME_VALIDATION_REGEX = /^[a-zA-Z][a-zA-Z0-9_#.-]*$/
export const ENTITY_VALIDATION_REGEX = /^[a-zA-Z{][a-zA-Z0-9_#.}-]*$/
export const UTTERANCE_VALIDATION_REGEX = /^[ a-zA-Z0-9]*$/

export function validateWithRegEx(candidate, regex) {
  return regex.test(candidate);
}
