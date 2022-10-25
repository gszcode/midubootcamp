const palindrome = (str) => {
  return str.split('').reverse().join('')
}

const average = (array) => {
  let suma = 0

  array.forEach((num) => {
    suma += num
  })

  return suma / array.length
}

module.exports = {
  palindrome,
  average
}
