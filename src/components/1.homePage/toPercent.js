function toPercent(num1, num2) {
  if (num2 != 0) {
    return Math.round((num1 / num2) * 10000) / 100.0;
  }

}
export {
  toPercent
}
