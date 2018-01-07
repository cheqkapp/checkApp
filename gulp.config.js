const path = require('path');
const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');


const config = {
    src: src,
    dist: dist,
    images: 'images',
    scripts: 'scripts',
    styles: 'css'
};

module.exports = config;
