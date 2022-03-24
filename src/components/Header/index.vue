<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            autocomplete="off"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keyup="getWordOrGoSearch"
            @blur="setShow"
            @focus="getKeyWord"
          />
          <input type="text" style="display: none" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
      <div class="suggest-list" v-show="show">
        <div
          class="suggest-item"
          v-for="item in suggestList"
          :key="item[1]"
          @click="setKeywords(item[0])"
        >
          {{ item[0] }}
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// 引入发起 jsonp 请求的包
import { jsonp } from 'vue-jsonp'
// 防抖函数
import debounce from 'lodash/debounce.js'
// import debounce from '@/utils/debounce.js'
// 将输入的汉字转换成拼音
import { pinyin } from 'pinyin-pro'
export default {
  data() {
    return {
      keyword: '',
      show: false, // 控制模糊搜索框显示与隐藏
      cacheObj: {}, // 定义一个缓存对象
      suggestList: [] // 搜索到的数据
    }
  },
  mounted() {
    // 因为代码编写的原因，每次发起请求都相当于重新渲染了页面，所以在这里可以接收到Search传过来的事件
    this.$bus.$on('clearKeyWord', () => {
      this.keyword = ''
    })
  },
  methods: {
    // 如果按下回车则 跳转页面，如果是其他键则进行内容匹配
    getWordOrGoSearch: debounce(function (e) {
      if (e.keyCode === 13) {
        this.goSearch()
        this.show = false
        this.suggestList = []
      } else {
        this.getKeyWord()
      }
    }, 400),
    // 跳转到搜索页 如果当前页有query参数，则需要拼接
    goSearch() {
      const location = {
        name: 'search',
        params: { keyword: this.keyword || undefined }
      }
      // 如果有 query，就全部拼接在一起，这样路由参数对象就都可以获取到了
      if (this.$route.query) {
        location.query = this.$route.query
        this.$router.push(location)
      } else {
        this.$router.push(location)
      }
    },
    // 输入内容，进行内容匹配
    async getKeyWord() {
      // 获取不带声调的拼音
      // pinyin('汉语拼音', { toneType: 'none' }); // 'han yu pin yin'
      // 将字符串转换成拼音后去除所有空格
      const keyWords = pinyin(this.keyword.trim(), { toneType: 'none' }).replace(/\s/g, '')
      if (keyWords.length <= 0) {
        this.show = false
        this.suggestList = []
        return 0
      }
      if (this.cacheObj[keyWords]) {
        this.suggestList = this.cacheObj[keyWords]
        this.show = true
        return 0
      }
      // 发起请求获取数据
      const res = await jsonp('https://suggest.taobao.com/sug?q=' + keyWords)
      if (res.result.length === 0) {
        this.show = false
        return 0
      }
      // 将数据存入数据列表
      this.suggestList = res.result
      // 存入缓存对象
      this.cacheObj[keyWords] = res.result
      // 显示框
      this.show = true
    },
    // 失去焦点，隐藏 suggest 框 点击按钮实际上input也会失去焦点，所以都可以实现隐藏
    setShow() {
      setTimeout(() => {
        this.show = false
      }, 300)
    },
    // 点击提示框中的项，会获取里面的字符串进行请求及跳转页面
    setKeywords(val) {
      this.keyword = val
      this.show = false
      this.goSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
    height: 111px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      .logo {
        img {
          width: 175px;
        }
      }
    }

    .searchArea {
      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }

    .suggest-list {
      position: absolute;
      left: 50%;
      top: 102px;
      margin-left: 42px;
      z-index: 9999;
      width: 558px;
      box-sizing: border-box;
      border: 1px solid #ea4a36;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #fff;
      overflow: hidden;
      .suggest-item {
        height: 30px;
        padding: 0 8px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        // 文本溢出隐藏 省略号
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover {
          color: #ea4a36;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
