<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev" :class="{ disabled: prevDisable }" @click="setPageNum">
          <a><i class="iconfont icon-xiangzuojiantou"></i>&nbsp;上一页</a>
        </li>
        <li v-if="pageNumStartAndEnd.start > 1" @click="getPageNum(1)">
          <a>1</a>
        </li>
        <li class="dotted" v-if="pageNumStartAndEnd.start > 2"><span>...</span></li>
        <!-- 连续页数循环输出 -->
        <li
          v-for="page in pageNumStartAndEnd.pageList"
          :key="page"
          :class="{ active: pageNum === page }"
          @click="getPageNum(page)"
        >
          <a>{{ page }}</a>
        </li>
        <li class="dotted" v-if="pageNumStartAndEnd.end < totalPage - 1">
          <span>...</span>
        </li>
        <li v-if="pageNumStartAndEnd.end < totalPage" @click="getPageNum(totalPage)">
          <a>{{ totalPage }}</a>
        </li>
        <li class="next" :class="{ disabled: nextDisable }" @click="nextPage">
          <a>下一页&nbsp;<i class="iconfont icon-xiangyoujiantou"></i></a>
        </li>
        <li class="sum">
          <span>共 {{ totalPage }} 页</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // 当前页pageNum，每页条数pageSize，总条数total，连续页数continues
  props: ['pageNum', 'pageSize', 'total', 'continues'],
  methods: {
    //   点击页码，将最新的页码发给父组件，让父组件修改值
    getPageNum(page) {
      this.$emit('setPageNum', page)
    },
    // 点击上一页
    setPageNum() {
      const { pageNum } = this
      const num = pageNum - 1
      if (num >= 1) {
        this.getPageNum(num)
      }
    },
    // 点击下一页
    nextPage() {
      const { pageNum, totalPage } = this
      const num = pageNum + 1
      if (num <= totalPage) {
        this.getPageNum(num)
      }
    }
  },
  computed: {
    // 计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页数的开头和结尾
    pageNumStartAndEnd() {
      let start = 0
      let end = 0
      const { pageNum, continues, totalPage } = this
      // 如果连续页数大于总页数
      if (continues > totalPage) {
        start = 1
        end = this.totalPage
      } else {
        // 如果连续页数小于总页数
        start = pageNum - parseInt(continues / 2)
        end = pageNum + parseInt(continues / 2)
        // 如果越界
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      const pageList = []
      for (let i = start; i <= end; i++) {
        pageList.push(i)
      }
      return { start, end, pageList }
    },
    // 通过当前页数判断要不要加样式
    prevDisable() {
      const { pageNum } = this
      if (pageNum > 1) {
        return false
      }
      return true
    },
    nextDisable() {
      const { pageNum, totalPage } = this
      if (pageNum < totalPage) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 66px;

  .sui-pagination {
    ul {
      li {
        display: inline-block;
        margin-left: -1px;
        a {
          padding: 9px 18px;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          font-size: 14px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border: 1px solid #f35f58;
            cursor: default;
            position: relative;
            z-index: 999;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999 !important;
            cursor: default;
          }
        }

        &.dotted {
          span {
            padding: 9px 18px;
            background-color: #fff;
            font-size: 14px;
            border: 1px solid #e0e9ee;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }

        &.sum {
          span {
            padding: 9px 18px;
            font-size: 14px;
            border: 1px solid #e0e9ee;
            color: #333;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
