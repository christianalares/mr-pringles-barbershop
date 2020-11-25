const getTimeEmoji = time => {
  switch (time) {
    case '01:00':
    case '13:00':
      return '🕐'
    case '01:30':
    case '13:30':
      return '🕜'
    case '02:00':
    case '14:00':
      return '🕑'
    case '02:30':
    case '14:30':
      return '🕝'
    case '03:00':
    case '15:00':
      return '🕒'
    case '03:30':
    case '15:30':
      return '🕞'
    case '04:00':
    case '16:00':
      return '🕓'
    case '04:30':
    case '16:30':
      return '🕟'
    case '05:00':
    case '17:00':
      return '🕔'
    case '05:30':
    case '17:30':
      return '🕠'
    case '06:00':
    case '18:00':
      return '🕕'
    case '06:30':
    case '18:30':
      return '🕡'
    case '07:00':
    case '19:00':
      return '🕖'
    case '07:30':
    case '19:30':
      return '🕢'
    case '08:00':
    case '20:00':
      return '🕗'
    case '08:30':
    case '20:30':
      return '🕣'
    case '09:00':
    case '21:00':
      return '🕘'
    case '09:30':
    case '21:30':
      return '🕤'
    case '10:00':
    case '22:00':
      return '🕙'
    case '10:30':
    case '22:30':
      return '🕥'
    case '11:00':
    case '23:00':
      return '🕚'
    case '11:30':
    case '23:30':
      return '🕦'
    case '12:00':
    case '00:00':
      return '🕛'
    case '12:30':
    case '00:30':
      return '🕧'

    default:
      return '🕖'
  }
}

export default getTimeEmoji
