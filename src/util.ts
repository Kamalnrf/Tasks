// credit: https://bearnithi.com/2019/11/10/how-to-calculate-the-time-difference-days-hours-minutes-between-two-dates-in-javascript/#:~:text=To%20calculate%20the%20minutes%20difference,milliseconds%20(minutes%20*%2060)%20.
function timeDiffCalc(dateFuture: number, dateNow: number) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60

  return {
    days,
    hours,
    minutes,
    seconds: ((diffInMilliSeconds % 60000) / 1000).toFixed(0),
  }
}

export function getCurrTimerAndTimeout(dateFuture: number, dateNow: number) {
  const {days, hours, minutes, seconds} = timeDiffCalc(dateFuture, dateNow)

  if (days >= 0)
    return {
      text: `${days}d`,
    }
  else if (hours >= 0)
    return {
      text: `${hours}h`,
    }
  else if (minutes >= 0)
    return {
      text: `${minutes}m`,
    }

  return {
    text: `${seconds}s`,
  }
}
