const gulp = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('rimraf')

const tsProject = ts.createProject('tsconfig.json')
const VIEW_FILES = ['./views/**/*']
const CUSTOM_VIEW_FILES = ['./customViews/*']
const CREATE_EXE_SCRIPT_FILES = ['./createExeScripts/*']
const LICENCE_FILES = ['./licences/*']

function scripts() {
    const tsResult = tsProject.src()
        .pipe(tsProject())
    return tsResult.js
        .pipe(gulp.dest('dist'))
}

function setViews() {
    return gulp.src(VIEW_FILES)
        .pipe(gulp.dest('dist/views'))
}

function setCustomViews() {
    return gulp.src(CUSTOM_VIEW_FILES)
        .pipe(gulp.dest('dist/customViews'))
}

function setCreateExeScripts() {
    return gulp.src(CREATE_EXE_SCRIPT_FILES)
        .pipe(gulp.dest('dist'))
}

function setLicences() {
    return gulp.src(LICENCE_FILES)
        .pipe(gulp.dest('dist/licences'))
}

function clean(cb) {
    rimraf('./dist', cb)
}

function build() {
    return scripts()
}

exports.clean = clean
exports.build = gulp.series(clean, gulp.parallel(build, setViews, setCustomViews, setCreateExeScripts, setLicences))
