// 防抖函数
export default function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    const context = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
