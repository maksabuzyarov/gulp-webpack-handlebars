import { paths } from '../../../gulpfile.js';
import path from 'path';

export default {
  register(Handlebars) {
    Handlebars.registerHelper('indexDir', function (options) {

      let file;

      if (options.data.file) {
        file = options.data.file;
      } else {
        file = options.data.root.file;
      }

      let relative = path.relative(paths.views.pages, path.relative(file.cwd, path.dirname(file.path)));
      let currentPath = path.join(paths.views.dist, relative);

      let index = path.relative(currentPath, paths.dist).split('\\').join('/');

      if (!index) {
        index = '.';
      }

      return new Handlebars.SafeString(index);
    });
  },
};
