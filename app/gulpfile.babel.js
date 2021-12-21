import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import panini from 'panini';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';
// import postcssPartialImport from 'postcss-partial-import';
import postcssImport from 'postcss-import';
import loadContent from 'postcss-import/lib/load-content';
import postcssUrl from 'postcss-url';
import cssnext from 'postcss-cssnext';
import precss from 'precss';
import quantityQueries from 'postcss-quantity-queries';
import svgLoad from 'postcss-inline-svg';
import stylelint from 'stylelint';
import postcssBrowserReporter from 'postcss-browser-reporter';
import postcssReporter from 'postcss-reporter';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import webpackConfig from './webpack.conf';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Check for --open flag
const BROWSEROPEN = !!(yargs.argv.open);


function loadConfig() {
    const ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

// Load settings from settings.yml
const { PORT, PATHS } = loadConfig();

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
    rimraf(PATHS.dist, () => {
        if (!PRODUCTION) {
            done();
        }
    });

    if (PRODUCTION) {
        rimraf(PATHS.markupDist, done);
    }
}

// Copy files out of the assets folder
// This task skips over the "images", "js", and "css" folders, which are parsed separately
function copy() {
    return gulp.src(PATHS.assets)
        .pipe(gulp.dest(PATHS.dist))
        .pipe($.if(PRODUCTION, gulp.dest(PATHS.markupDist)));
}

// Copy page templates into finished HTML files
function pages() {
    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: ['src/woo/partials/', 'src/partials/'],
            data: 'src/data/',
            helpers: ['src/woo/helpers/', 'src/helpers/'],
            /* pageLayouts: {
              // All pages inside app/pages/!** will use the **.html layout
              'login': 'simple'
            } */
        }))
        // .pipe($.useref())
        .pipe($.extname())
        .pipe(gulp.dest(PATHS.dist))
        .pipe($.if(PRODUCTION, gulp.dest(PATHS.markupDist)));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
    panini.refresh();
    done();
}

function validateHtml() {
    return gulp.src(`${PATHS.dist}/*.html`)
        .pipe($.html({
            format: 'json',
        }));
}

// Compile Sass into CSS
// In production, the CSS is compressed
function styles() {
    const processors = [
        postcssImport({
            load(filename, importOptions) {
                if (filename.match(/node_modules/)) {
                    // remove stylelint check for node_modules files.
                    importOptions.plugins = []; // eslint-disable-line no-param-reassign
                    return loadContent(filename, importOptions);
                }

                // set stylelint check for not node_modules files.
                importOptions.plugins = [stylelint]; // eslint-disable-line no-param-reassign

                return loadContent(filename, importOptions);
            },
        }),
        precss,
        postcssUrl,
        svgLoad,
        cssnext(),
        quantityQueries,
        postcssBrowserReporter,
        postcssReporter({ clearReportedMessages: true }),
    ];

    if (PRODUCTION) {
        processors.push(require('postcss-sort-media-queries')({
            sort: 'desktop-first'
        }));
    }

    return gulp.src('src/assets/css/styles.pcss')
        .pipe($.postcss(processors, {
            map: !PRODUCTION, // enable source map for development
        }))
        .pipe($.if(PRODUCTION, $.csso()))
        .pipe($.extname('.css'))
        .pipe(gulp.dest(`${PATHS.dist}/css`))
        .pipe(browser.stream())
        .pipe($.if(PRODUCTION, gulp.dest(`${PATHS.markupDist}/css`)));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
    return gulp.src(PATHS.entries)
        .pipe(named())
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(`${PATHS.dist}/js`))
        .pipe($.if(PRODUCTION, gulp.dest(`${PATHS.markupDist}/js`)));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
    return gulp.src('src/assets/images/**/*')
        /*.pipe($.if(PRODUCTION, $.imagemin([
          $.imagemin.gifsicle({
            interlaced: true,
          }),
          $.imagemin.jpegtran({
            progressive: true,
          }),
          $.imagemin.optipng({
            optimizationLevel: 5,
          }),
        ])))*/
        .pipe(gulp.dest(`${PATHS.dist}/images`))
        .pipe($.if(PRODUCTION, gulp.dest(`${PATHS.markupDist}/images`)));
}

function fonts() {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest(`${PATHS.dist}/fonts`))
        .pipe($.if(PRODUCTION, gulp.dest(`${PATHS.markupDist}/fonts`)));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
    browser.init({
        server: PATHS.dist,
        port: PORT,
        open: BROWSEROPEN,
    });
    done();
}

// Reload the browser with BrowserSync
// function reload(done) {
//   browser.reload();
//   done();
// }

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
    gulp.watch(PATHS.assets, copy);
    gulp.watch('src/pages/**/*.{html,hbs,handlebars}').on('all', gulp.series(pages, browser.reload));
    gulp.watch('src/{layouts,partials,woo}/**/*.{html,hbs,handlebars}').on('all', gulp.series(resetPages, pages, browser.reload));
    gulp.watch('src/{assets,woo}/css/**/*.{css,pcss}').on('all', gulp.series(styles));
    gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
    gulp.watch('src/assets/images/**/*').on('all', gulp.series(images, browser.reload));
    gulp.watch('src/assets/fonts/**/*').on('all', gulp.series(fonts, browser.reload));
}

// Copy www folders to Wordpress
function copyToWP() {
    return gulp.src('../www/{images,fonts,js,css}/**/*').pipe(gulp.dest(PATHS.wp));
}

// Build the "dist" folder by running all of the below tasks
gulp.task(
    'build',
    gulp.series(clean, gulp.parallel(pages, styles, fonts, javascript, images, copy)),
);

// Build the site, run the server, and watch for file changes
gulp.task(
    'default',
    gulp.series('build', server, watch),
);

// Run HTML Markup validator
gulp.task('validateHtml', validateHtml);

// HTML only update
gulp.task('html', gulp.series(pages, copy));

// WordPress theme
gulp.task('wp-build', gulp.series(clean, 'build', copyToWP));
gulp.task('wp-copy', copyToWP);
gulp.task('wp-js', gulp.series(javascript, copyToWP));
gulp.task('wp-css', gulp.series(styles, copyToWP));