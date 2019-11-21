import { paths, config } from "../../../gulpfile.babel";
import path from 'path';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("index", function(options) {

    let file;

    if(options.data.file) {
      file = options.data.file;
    } else {
      file = options.data.root.file;
    }

    let relative = path.relative(paths.views.pages, path.relative(file.cwd, path.dirname(file.path)));
    let currentPath = path.join(paths.views.dist, relative);

    return new Handlebars.SafeString('./' + path.relative(currentPath, paths.dist).split('\\').join('/'));
  });
};
