// Script used to build Production files post webpack
var shell = require('shelljs');
var fs = require('fs');


shell.echo('[WARNING]: The Production build proces requires that the "env" theme variable be set to "production".')

// Copy images from src to build
shell.echo('Moving images ...')
shell.cp('-r', 'src/images',  'build/images')

// Rename build directory to dist in a seamless manner
// We do this so on the production server the rm -rf command
// does not cause Unstyled content requests
if (!fs.existsSync('dist')) {
    shell.mkdir('dist')
}

shell.echo('Swapping old files ...')
shell.mv('dist', 'dist_old')
shell.mv('build', 'dist')
shell.rm('-rf', 'dist_old')
