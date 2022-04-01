<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="notShow" @mouseenter="onShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加过渡动画，元素或组件标签必须有 v-if 或 v-show 写了name，则以name-开头，否则v-开头-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ itemHover: currentIndex == index }"
              >
                <h3 @mouseenter="getCurrentIndex(index)">
                  <a :data-categoryname="c1.categoryName" :data-categoryid1="c1.categoryId">{{
                    c1.categoryName
                  }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryname="c2.categoryName" :data-categoryid2="c2.categoryId">{{
                          c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-categoryid3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCategoryList } from '@/utils/category.js'
import throttle from 'lodash/throttle.js'
export default {
  created() {
    // 组件有了配置项后，立马调用actions中的方法，发起请求，存储分类列表
    if (!getCategoryList()) {
      this.$store.dispatch('home/getCategoryList')
    }
    // 如果不在 home 页面，则三级联动不显示
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  data() {
    return {
      currentIndex: -1,
      show: true // 控制三级联动显示与隐藏
    }
  },
  computed: {
    // 读取vuex中的数据
    ...mapState('home', ['categoryList'])
    /* ...mapState({
      categoryList: (state) => state.home.categoryList
    }) */
  },
  methods: {
    // 获取鼠标所在标签的 index
    getCurrentIndex: throttle(function (index) {
      this.currentIndex = index
    }, 30),
    // 跳转到 search 页
    goSearch(event) {
      // 解构，没有则为 undefined
      const { categoryname, categoryid1, categoryid2, categoryid3 } = event.target.dataset
      // 最后参数格式为 {name: 'search', query: {categoryName:categoryname, category1Id: categoryid1 }}
      const location = { name: 'search' }
      let query = null
      // 确定是否为a 如果是a
      if (categoryname) {
        // 判断是几级标签
        if (categoryid1) {
          query = { category1Id: categoryid1, categoryName: categoryname }
        } else if (categoryid2) {
          query = { category2Id: categoryid2, categoryName: categoryname }
        } else {
          query = { category3Id: categoryid3, categoryName: categoryname }
        }
      } else {
        return
      }
      location.query = query
      // 如果输入框也输入了值，则参数要拼接
      if (this.$route.params) {
        location.params = this.$route.params
        this.$router.push(location)
      } else {
        this.$router.push(location)
      }
      this.show = false
    },
    // 鼠标离开后，背景颜色恢复
    notShow() {
      this.currentIndex = -1
      // 如果不在 /home 页面，则联动框隐藏
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    onShow() {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 47px;
      width: 210px;
      height: 460px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30.5px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              &:hover {
                color: rgb(199, 49, 38);
              }
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 458px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .itemHover {
          background: #ccc;
        }
      }
    }

    .sort-enter {
      height: 0;
    }
    .sort-enter-active {
      transition: height 0.5s;
    }
    .sort-leave-to {
      opacity: 0;
    }
    .sort-leave-active {
      transition: opacity 0.5s;
    }
  }
}
</style>
