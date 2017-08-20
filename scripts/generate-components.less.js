const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, '../dist'))) {

    const componentsPath = path.join(process.cwd(), 'src');
    let componentsLessContent = '';
    const libdir = path.join(process.cwd(), 'lib');
    const styledir = path.join(libdir, 'styles');
    if (!fs.existsSync(libdir)) fs.mkdirSync(libdir);
    if (!fs.existsSync(styledir)) fs.mkdirSync(styledir);

    // Build components in one file: lib/styles/components.less
    fs.readdir(componentsPath, function (err, files) {
        files.forEach(function (file) {
            if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
                componentsLessContent += `@import "../${path.join(file, 'style').replace("\\","/")}/index.less";\n`
            }
        });

        fs.writeFileSync(path.join(process.cwd(), 'lib', 'styles', 'components.less'), componentsLessContent);

        // Build less entry file: dist/hrm-comps.less
        fs.writeFileSync(
            path.join(process.cwd(), 'dist', 'hrm-comps.less'),
            '@import "../lib/styles/main.less";\n@import "../lib/styles/components.less";'
        );
    });
    console.log('Built a entry less file to dist/hrm-comps.less');
}