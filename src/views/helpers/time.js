export default {
  register(Handlebars) {
    Handlebars.registerHelper('time', function () {

      return (new Date()).getTime();
    });
  },
};
