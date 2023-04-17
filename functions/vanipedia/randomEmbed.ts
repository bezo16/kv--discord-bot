import createTextEmbed from "../../functions/common/createTextEmbed"
import vanipediaEssential from "../../data/other/vanipedia-essential"

const randomVanipediaEmbed = () => {
  const keys = Object.keys(vanipediaEssential)
  const keysLength = keys.length
  const randomKey = keys[Math.floor(Math.random() * keysLength)]
  const arrayLength = vanipediaEssential[randomKey].length
  const randomDesc = vanipediaEssential[randomKey][Math.floor(Math.random() * arrayLength)]

  return createTextEmbed({ title: randomKey, description: randomDesc })
}

export default randomVanipediaEmbed