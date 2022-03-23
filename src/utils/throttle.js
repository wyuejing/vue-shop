// 节流函数
export default function throttle(fn, wait) {
  let firstTime = Date.now()
  // console.log(this) undefined
  return function (...args) {
    const lastTime = Date.now()
    const context = this
    if (lastTime - firstTime > wait) {
      firstTime = Date.now()
      fn.apply(context, args)
    }
  }
}
