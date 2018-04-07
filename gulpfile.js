const gulp = require('gulp')
const pug = require('gulp-pug')
const path = require('path')
const plumber = require('gulp-plumber')
const coffee = require('gulp-coffee')

const srcDir = 'front'
const docDir = 'docs'

gulp.task('build:pug', () => {
  gulp.src(path.join(srcDir, 'views/**/[^_]*.pug'))
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(docDir))
})

gulp.task('build:coffee', () => {
  gulp.src(path.join(srcDir, 'scripts/**/*.coffee'))
    .pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(path.join(docDir, 'scripts/')))
})

gulp.task('default', ['build:pug', 'build:coffee'], () => {
  gulp.watch([srcDir + '/views/**/*.pug'], ['build:pug'])
  gulp.watch([srcDir + '/scripts/**/*.coffee'], ['build:coffee'])
})
