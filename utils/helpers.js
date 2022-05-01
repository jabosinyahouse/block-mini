export const addressShorterner = (address) => {
  return `${address.slice(0, 5)}.....${address.slice(-6, -1)}`
}

export default addressShorterner
