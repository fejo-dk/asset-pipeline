import identity from 'identity-function'

export function greet (whom) {
  return identity(`Hello ${whom}`)
}
