import random from './random'

const getOneRandomOf = items => {
  return items[random(items.length - 1)]
}

export default getOneRandomOf
