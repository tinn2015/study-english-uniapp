"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/tabBar/home/Home.js";
  "./pages/tabBar/find/Find.js";
  "./pages/tabBar/my/My.js";
  "./pages/Course/Course.js";
  "./pages/CourseMore/CourseMore.js";
  "./pages/StudyRecord/StudyRecord.js";
  "./pages/StudyToday/StudyToday.js";
  "./pages/Lesson/Lesson.js";
  "./pages/Report/Report.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/codes/study-english-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
