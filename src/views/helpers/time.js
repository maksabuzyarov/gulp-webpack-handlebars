import { paths, config } from "../../../gulpfile.babel";
import path from 'path';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("time", function(options) {

    return (new Date()).getTime();
  });
};
