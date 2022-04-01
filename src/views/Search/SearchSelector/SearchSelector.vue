<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="trademark in trademarkList"
            :key="trademark.tmId"
            @click="tradeMarkHandller(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);" class="all">更多></a>
      </div>
    </div>
    <div class="type-wrap" v-for="attrs in attrsList" :key="attrs.attrsId">
      <div class="fl key">{{ attrs.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="(item, index) in attrs.attrValueList"
            :key="index"
            @click="attrValueListHandler(attrs, item)"
          >
            <a>{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  computed: {
    ...mapGetters('search', ['attrsList', 'trademarkList'])
  },
  methods: {
    // 点击品牌，获取品牌名，加入到面包屑中，然后发起请求
    tradeMarkHandller(trademark) {
      this.$emit('setTradeMarkBread', trademark)
    },
    // 点击 将属性值 传给 父组件
    attrValueListHandler(attrs, attrValue) {
      // console.log(attrs, index)
      this.$emit('setattrValueBread', attrs, attrValue)
    }
  }
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 18px;
      line-height: 18px;

      .sui-btn {
        font-size: 12px;
        padding: 0 10px;
        background: #fff;
        cursor: pointer;
      }

      a {
        color: #666;
      }
      .all {
        margin-left: 5px;
      }
    }
  }
}
</style>
