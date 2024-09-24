export const getPercentageBetweenTwoNumbers = (
  currentValue: number,
  endValue: number
) => {
  const result = (currentValue * 100) / endValue

  return result > 100 ? 100 : Math.ceil(result)
}
