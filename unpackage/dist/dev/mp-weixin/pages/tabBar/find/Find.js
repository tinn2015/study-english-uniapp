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
      currentNav: 1,
      courses: [
        {
          title: "日常必备口语30句",
          subTitle: "学习目标： 生活中遇见",
          views: 1e3,
          poster: ""
        },
        {
          title: "日常必备口语30句",
          subTitle: "学习目标： 生活中遇见",
          views: 1e3,
          poster: ""
        },
        {
          title: "日常必备口语30句",
          subTitle: "学习目标： 生活中遇见",
          views: 1e3,
          poster: ""
        },
        {
          title: "日常必备口语30句",
          subTitle: "学习目标： 生活中遇见",
          views: 1e3,
          poster: ""
        },
        {
          title: "日常必备口语30句",
          subTitle: "学习目标： 生活中遇见",
          views: 1e3,
          poster: ""
        }
      ]
    };
  },
  methods: {
    navTap(nav) {
      this.currentNav = nav.id;
    },
    getCourseDetail(course) {
      console.log("course", course);
      common_vendor.index.navigateTo({
        url: "/pages/Course/Course?courseId=1"
      });
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
    }),
    b: common_vendor.f($data.courses, (course, k0, i0) => {
      return {
        a: course.poster,
        b: common_vendor.t(course.title),
        c: common_vendor.t(course.subTitle),
        d: common_vendor.t(course.views),
        e: common_vendor.o(($event) => $options.getCourseDetail(course))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cde622b1"], ["__file", "C:/Users/douqiting01/Desktop/workspace/tinn/study-english-uniapp/pages/tabBar/find/Find.vue"]]);
wx.createPage(MiniProgramPage);
