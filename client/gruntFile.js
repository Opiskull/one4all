module.exports = function(grunt){


    grunt.registerTask('default',['build','watch']);

    grunt.registerTask('build',['clean','less','html2js','concat','copy']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');


    grunt.initConfig({
        distdir: 'dist',
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
        less:{
            compile:{
                options: {
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
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        concat:{
            dist:{
                src:['<%= src.js %>', '<%= src.jsTpl %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },
/*            vendor:{
                src:[
                    'vendor/angular/angular.js',
                    'vendor/restangular/restangular.js',
                    'vendor/angular-ui/ui-bootstrap-tpls-0.7.0.js',
                    'vendor/underscore/underscore.js',
                    'vendor/angular-route/angular-route.js'
                ],
                dest: '<%= distdir %>/vendor.js'
            }*/
            angular: {
                src:['vendor/angular/angular.js'],
                dest: '<%= distdir %>/vendor/angular.js'
            },
            restangular: {
                src:['vendor/restangular/restangular.js'],
                dest: '<%= distdir %>/vendor/restangular.js'
            },
            bootstrap: {
                src:['vendor/angular-ui/ui-bootstrap-tpls-0.10.0.min.js'],
                dest: '<%= distdir %>/vendor/bootstrap.js'
            },
            underscore:{
                src:['vendor/underscore/underscore.js'],
                dest: '<%= distdir %>/vendor/underscore.js'
            },
            angularroute:{
                src:['vendor/angular-route/angular-route.js'],
                dest: '<%= distdir %>/vendor/angular-route.js'
            }
        },
        clean: ['<%= distdir %>/*'],
        watch: {
            scripts: {
                files: ['!**/node_modules/**','!**/dist/**','src/**/*.*','vendor/**/*.*'],
                tasks: ['build']
            }
        }
    });




}