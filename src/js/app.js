import svg4everybody from 'svg4everybody';

if (!window.site) window.site = {};

// One time after page loading
window.site.initPage = function () {

};

// Every time after creating new elements. For example: after ajax loading
window.site.initElements = function () {
  svg4everybody();
};

window.addEventListener('load', () => {
  window.site.initPage();
  window.site.initElements();
});

