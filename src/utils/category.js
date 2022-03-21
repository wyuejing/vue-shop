// 存储 category 信息
export function setCategoryList(value) {
  return sessionStorage.setItem('category', JSON.stringify(value))
}
// 获取 category 信息
export function getCategoryList() {
  //   const category = sessionStorage.getItem('category')
  return JSON.parse(sessionStorage.getItem('category'))
}
