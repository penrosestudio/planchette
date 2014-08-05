This is an effort to redo Planchette's pattern books to use Ractive, in whatever way feels appropriate. Aiming to replace the clunky use of Handlebars in `gulp server`.

TO-DO
turn template into partials
get partials out into separate files
get a header and footer working
gulp watch has to work with live reload

options for templating:

1) Ractify / RequireJS loading

- you can load from HTML files (using a plugin that reads them as text

2) Gulp build process to replace scripts pointing at templates with inline templates

- could replace specific script tags with their inlined templates (gulp-replace, see http://stackoverflow.com/questions/23820703/how-to-inject-content-of-css-file-into-html-in-gulp)

- or could read through the partials folder and inline partials for all those files, with the ID of the script tag being the file name (minus the extension)

3) Ractive components can now be loaded from .html files, so maybe that will work

See (the bottom of) https://github.com/RactiveJS/Ractive/issues/366