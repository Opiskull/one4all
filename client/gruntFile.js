module.exports = function(grunt){


    grunt.registerTask('default',['build','watch']);

    grunt.registerTask('build',['clean','gitinfo','less','html2js','uglify','concat','copy']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.initConfig({
        distdir: 'dist',
        tempdir: 'temp',
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['src/**/*.js'],
            jsTpl: ['<%= distdir %>/templates/**/*.js'],
            html: ['src/index.html'],
            less: ['src/assets/main.less'],
            tpl:{
                app:['src/app/**/*.html'],
                common:['src/common/**/*.html']
            }
        },
        uglify:{
            options: {
                mangle: false
            },
            vendor:{
                expand:true,
                files:
                    {
                    '<%= distdir %>/<%= pkg.name %>.vendor.min.js':['vendor/angular/*.js','vendor/angular-route/*.js','vendor/angular-ui/*.js','vendor/restangular/*.js','vendor/underscore/*.js']
                }
            },
            templates:{
                files:{
                    '<%= distdir %>/<%= pkg.name %>.templates.min.js':['<%= tempdir %>/*.js']
                }
            },
            application:{
                files:{
                    '<%= distdir %>/<%= pkg.name %>.min.js':['src/app/**/*.js','src/common/**/*.js']
                }
            }
        },
        less:{
            compile:{
                options: {
                    compress:true,
                    paths: ['vendor/bootstrap','assets']
                },
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css': '<%= src.less %>'
                }
            }
        },
        copy:{
            fonts: {
                expand:true, cwd: 'src/assets/fonts/',src:'*',dest:'<%= distdir %>/fonts/',flatten:true,filter:'isFile'
            }
        },
        concat:{
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            }
        },
        html2js: {
            app: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true
                    },
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= tempdir %>/app.tpl.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true
                    },
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= tempdir %>/common.tpl.js',
                module: 'templates.common'
            }
        },
        clean: ['<%= distdir %>/*'],
        watch: {
            scripts: {
                files: ['!**/node_modules/**','!**/dist/**','src/**/*.*','vendor/**/*.*'],
                tasks: ['build']
            }
        },
        gitinfo:{

        }
    });
}