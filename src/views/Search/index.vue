<template>
  <div class="search">
    <!-- 三级联动框 -->
    <type-nav></type-nav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i class="iconfont icon-chahao" @click="removeSateGoryName"></i>
            </li>
            <!-- 关键词面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i class="iconfont icon-chahao" @click="removekeyword"></i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i class="iconfont icon-chahao" @click="removeTradeMark"></i>
            </li>
            <!-- // 属性面包屑 -->
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{ prop.split(':')[1]
              }}<i class="iconfont icon-chahao" @click="removeAttrValue(index)"></i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @setTradeMarkBread="tradeMarkInfo" @setattrValueBread="attrValueInfo" />

        <!--details-->
        <div class="details clearfix" v-if="show">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a href="javascript:void(0);" @click="setOrder('1')"
                    >综合<i
                      v-show="isOne"
                      class="iconfont"
                      :class="isOneUp ? 'icon-arrow-up' : 'icon-arrow-down'"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }">
                  <a href="javascript:void(0);" @click="setOrder('2')"
                    >销量<i
                      v-show="isTwo"
                      class="iconfont"
                      :class="isTwoUp ? 'icon-arrow-up' : 'icon-arrow-down'"
                    ></i
                  ></a>
                </li>
                <li>
                  <a href="javascript:void(0);">新品</a>
                </li>
                <li>
                  <a href="javascript:void(0);">评价</a>
                </li>
                <li>
                  <a href="javascript:void(0);">价格⬆</a>
                </li>
                <li>
                  <a href="javascript:void(0);">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="今日钜惠" v-html="good.title"></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link class="sui-btn btn-bordered btn-danger" :to="`/detail/${good.id}`"
                      >加入购物车</router-link
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 当前页pageNum，每页条数pageSize，总条数total，连续页数continues -->
          <page-nav
            :pageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @setPageNum="setPageNum"
          ></page-nav>
        </div>
        <div class="notshop" v-else><h1>暂无此商品...</h1></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      },
      show: true
    }
  },
  components: {
    SearchSelector
  },
  methods: {
    getData() {
      // 调函数，存数据
      this.$store.dispatch('search/getSearchGoods', this.searchParams)
    },
    removeSateGoryName() {
      // 点击叉号，删除面包屑，然后重新发起请求，恢复默认请求状态，参数如果为 undefined，则发起请求的时候不会带上这个参数
      const obj = {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined
      }
      // 对象合并，第一个为目标对象，后面的参数都为源对象，如果属性一样，后面会覆盖掉前面的
      Object.assign(this.searchParams, obj)
      this.getData()
      // 如果搜索框有内容，则需要把这个内容继续带着，比较严谨
      this.$router.push({ name: 'search', params: this.$route.params })
    }, // 同上，只是这次删的是关键字
    removekeyword() {
      const obj = {
        keyword: undefined
      }
      Object.assign(this.searchParams, obj)
      this.getData()
      this.$router.push({ name: 'search', query: this.$route.query })
      // 告诉header，清除搜索框内容
      this.$bus.$emit('clearKeyWord')
    },
    // 子向父传值，自定义事件
    tradeMarkInfo(e) {
      // 整理参数
      this.searchParams.trademark = `${e.tmId}:${e.tmName}`
      // 重新发起请求
      this.getData()
    },
    // 删除品牌面包屑
    removeTradeMark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 将商品属性获取过来
    attrValueInfo(attrs, attrValue) {
      const props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      // 如果存在了，就不再添加
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
      this.getData()
    },
    // 通过数组下标 删除 属性 面包屑
    removeAttrValue(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 设置 排序方法
    setOrder(flag) {
      // 拿到初始order值
      const [count, mode] = this.searchParams.order.split(':')
      // 如果为同一项，就改排序方式
      if (flag === count) {
        this.searchParams.order = mode === 'desc' ? `${count}:asc` : `${count}:desc`
      } else {
        this.searchParams.order = `${flag}:desc`
      }
      this.getData()
    },
    // 设置当前页数
    setPageNum(page) {
      this.searchParams.pageNo = page
      // 重置页数后重新发起请求
      this.getData()
    }
  },
  beforeMount() {
    // 因为从主页过来时就要请求数据了
    // 在渲染前将参数组合起来，发起请求
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    this.getData()
  },
  watch: {
    $route(newValue) {
      // 只要在三级联动或者在搜索框，执行事件了，路由信息就会发生改变，所以监听到后就要重新发起请求
      // 在路由信息发生变化后，重新发起请求
      Object.assign(this.searchParams, newValue.query, newValue.params)
      this.getData()
      // 请求完成后，id都置为空
      const obj = { category1Id: undefined, category2Id: undefined, category3Id: undefined }
      Object.assign(this.searchParams, obj)
    }, // 如果没有请求到数据，则出现提示文字
    goodsList(value) {
      if (value.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
  computed: {
    // 请求完成后数据就会发生改变，以store中的数据作为依赖项，可以实时获取数据
    ...mapGetters('search', ['goodsList']),
    ...mapState('search', ['serachList']),
    // 计算是按照哪个排序
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isOneUp() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isTwoUp() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    // 获取商品总数
    total() {
      return this.serachList.total
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          display: inline-block;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          margin: 0 5px 5px 0;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 0.4s;
          cursor: pointer;

          i {
            margin-left: 5px;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 20%;
            margin-top: 10px;
            padding: 0 10px;
            // height: 420px;
            line-height: 28px;
            box-sizing: border-box;

            .list-wrap {
              .p-img {
                // min-height: 255px;
                height: 255px;
                padding: 5px 5px;
                text-align: center;
                img {
                  max-width: 100%;
                  max-height: 265px;
                  // height: 100%;
                  vertical-align: middle;
                }
              }

              .price {
                margin-top: 5px;
                padding-left: 10px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 1px;
                  }
                }
              }

              .attr {
                padding: 0 10px;
                overflow: hidden;
                margin-bottom: 8px;
                height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 10px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                display: flex;
                justify-content: space-between;
                padding: 12px 5px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 4px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.notshop {
  width: 1200px;
  height: 300px;
  line-height: 300px;
  font-size: 80px;
  text-align: center;
  margin: 0 auto;
  color: red;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.sui-nav li a:hover {
  color: #fff;
}
</style>
