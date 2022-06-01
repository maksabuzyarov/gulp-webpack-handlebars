import { paths } from '../../../gulpfile.js';
import path from 'path';

export default {
  register(Handlebars) {
    Handlebars.registerHelper("assets", function (options) {

      let file;

      if (options.data.file) {
        file = options.data.file;
      } else {
        file = options.data.root.file;
      }

      let relative = path.relative(paths.views.pages, path.relative(file.cwd, path.dirname(file.path)));
      let currentPath = path.join(paths.views.dist, relative);

      return new Handlebars.SafeString(path.relative(currentPath, paths.assets.dist).split('\\').join('/'));
    });
  }
}
