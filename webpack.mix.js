let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .disableNotifications()
    .js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/plugins.js', 'public/js')
    .js('resources/assets/js/modal.js', 'public/js')
    .js('resources/assets/js/orders.js', 'public/js')
    .js('resources/assets/js/leads.js', 'public/js')
    .js('resources/assets/js/icd10codes.js', 'public/js')
    .js('resources/assets/js/shipping_options.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sass('resources/assets/sass/clean.scss', 'public/css')
    .sass('resources/assets/sass/pdf.scss', 'public/css')
    .sourceMaps()
    .version()
    .vue();
