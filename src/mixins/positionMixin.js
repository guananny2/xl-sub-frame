/**
 * 缓存全局页面Y滚动条的位置
 * 需要缓存页面位置的页面，引用改全局混入对象
 * mixins: [myMixin]
 */
export default {
  activated() {
    sessionStorage.getItem('position') && window.scrollTo(0, Number(sessionStorage.getItem('position')))
    sessionStorage.removeItem('position')
  },
  deactivated() {
    sessionStorage.setItem('position', window.scrollY)
  }
}
