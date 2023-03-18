const monthNames = [
  ["január"],
  ["február"],
  ["marec"],
  ["apríl"],
  ["máj"],
  ["jún"],
  ["júl"],
  ["august"],
  ["september"],
  ["október"],
  ["november"],
  ["december"],
]

const monthToNumber = (monthName: string) => {
  monthName = monthName.toLocaleLowerCase()
  if (monthNames[0].includes(monthName)) return 1
  if (monthNames[1].includes(monthName)) return 2
  if (monthNames[2].includes(monthName)) return 3
  if (monthNames[3].includes(monthName)) return 4
  if (monthNames[4].includes(monthName)) return 5
  if (monthNames[5].includes(monthName)) return 6
  if (monthNames[6].includes(monthName)) return 7
  if (monthNames[7].includes(monthName)) return 8
  if (monthNames[8].includes(monthName)) return 9
  if (monthNames[9].includes(monthName)) return 10
  if (monthNames[10].includes(monthName)) return 11
  if (monthNames[11].includes(monthName)) return 12

  return null
}

export default monthToNumber