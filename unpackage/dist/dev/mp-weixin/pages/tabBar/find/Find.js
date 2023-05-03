"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navLists: [
        {
          label: "为你推荐",
          id: 1
        },
        {
          label: "每日一词",
          id: 2
        },
        {
          label: "日常必备",
          id: 3
        },
        {
          label: "玩转职场",
          id: 4
        },
        {
          label: "旅游出行",
          id: 5
        },
        {
          label: "亲子英语",
          id: 6
        }
      ],
      currentNav: 1
    };
  },
  methods: {
    navTap(nav) {
      this.currentNav = nav.id;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navLists, (nav, k0, i0) => {
      return {
        a: common_vendor.t(nav.label),
        b: common_vendor.o(($event) => $options.navTap(nav)),
        c: common_vendor.n($data.currentNav === nav.id ? "nav-active" : "")
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cde622b1"], ["__file", "D:/tinn/workspace/xiaoyue-parttimejob/study-english-uniapp/pages/tabBar/find/Find.vue"]]);
wx.createPage(MiniProgramPage);
