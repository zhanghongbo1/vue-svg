 

 export const switchTimeFormat =(time)=> {
  const dateTime = new Date(time)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const date = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()
  return `${year}-${addZero(month)}-${addZero(date)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`
}
const  addZero =(v)=> {
  return v < 10 ? '0' + v : v
}