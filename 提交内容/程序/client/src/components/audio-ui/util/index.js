/**
 * 计算时间差
 * @param time
 * @returns {{hours: number, minutes: number, seconds: number}}
 */
function duration (time = 0) {
  const UNIT = 1000
  const ARY = 60
  let result = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  time = Number((time / UNIT).toFixed(0))
  result.seconds = time % ARY // 秒
  time = (time - result.seconds) / ARY
  result.minutes = time % ARY // 分
  result.hours = (time - result.minutes) / ARY // 时
  return result
}

/**
 * 格式化时间
 * @param durationTime
 * @returns {*}
 */
export function formatTime (durationTime = 0) {
  let time
  let result = []
  if (!durationTime || isNaN(Number(durationTime))) return '00:00' // eslint-disable-line
  time = duration(durationTime)
  if (time.hours !== 0) {
    result.push(time.hours > 9 ? time.hours : ('0' + time.hours))
  }
  result.push(time.minutes > 9 ? time.minutes : ('0' + time.minutes))
  result.push(time.seconds > 9 ? time.seconds : ('0' + time.seconds))
  return result.join(':')
}
