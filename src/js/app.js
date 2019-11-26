import svg4everybody from 'svg4everybody';

window.Site = {};

// One time after page loading
window.Site.initPage = function () {

};

// Every time after creating new elements. For example: after ajax loading
window.Site.initElements = function () {
  svg4everybody();
};

window.addEventListener('load', () => {
  window.Site.initPage();
  window.Site.initElements();
});

