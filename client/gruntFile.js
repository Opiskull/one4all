module.exports = function(grunt){


    grunt.registerTask('default',['debug','watch']);


    grunt.registerTask('dist',['clean','gitinfo','less:dist','html2js:dist','uglify','concat:index','copy'])

    grunt.registerTask('debug',['clean','gitinfo','less:debug','html2js:debug','concat','copy']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dest:{
            dir: 'build',
            pkg: '<%= dest.dir %>/<%= pkg.name %>'
        },
        src: {
            js: ['src/**/*.js'],
            html: ['src/index.html'],
            less: ['src/assets/main.less'],
            tpl:['src/app/**/*.html','src/common/**/*.html'],
            vendor:['vendor/angular/*.js','vendor/angular-route/*.js','vendor/angular-ui/*.js','vendor/restangular/*.js','vendor/underscore/*.js'],
            fonts:'src/assets/fonts/'
        },
        uglify:{
            options: {
                //mangle: {toplevel: true}
            },
            vendor:{
                expand:true,
                files:
                    {
                    '<%= dest.pkg %>.vendor.min.js':'<%= src.vendor %>'
                }
            },
/*            templates:{
                files:{
                    '<%= dest.pkg %>.templates.min.js':['<%= tempdir %>*//*.js']
                }
            },*/
            application:{
                files:{
                    '<%= dest.pkg %>.min.js':'<%= src.js %>'
                }
            }
        },
        less:{
            debug:{
                options: {
                    paths: ['vendor/bootstrap','assets']
                },
                files: {
                    '<%= dest.pkg %>.min.css': '<%= src.less %>'
                }
            },
            dist:{
                options: {
                    compress:true,
                    paths: ['vendor/bootstrap','assets']
                },
                files: {
                    '<%= dest.pkg %>.min.css': '<%= src.less %>'
                }
            }
        },
        copy:{
            fonts: {
                expand:true, cwd: '<%= src.fonts %>',src:'*',dest:'<%= dest.dir %>/fonts/',flatten:true,filter:'isFile'
            }
        },
        concat:{
            index: {
                src: '<%= src.html %>',
                dest: '<%= dest.dir %>/index.html',
                options: {
                    process: true
                }
            },
            application: {
                src: '<%= src.js %>',
                dest: '<%= dest.pkg %>.min.js'
            },
            vendor:{
                expand:true,
                files:
                {
                    '<%= dest.pkg %>.vendor.min.js':'<%= src.vendor %>'
                }
            }
        },
        html2js: {
            dist: {
                options: {
                    htmlmin: {
                        //collapseBooleanAttributes: true,
                        collapseWhitespace: true
                    },
                    base: 'src/app'
                },
                src: ['<%= src.tpl %>'],
                dest: '<%= dest.pkg %>.templates.min.js',
                module: '14all.templates'
            },
            debug: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl %>'],
                dest: '<%= dest.pkg %>.templates.min.js',
                module: '14all.templates'
            }
        },
        clean: ['<%= dest.dir %>/*'],
        watch: {
            scripts: {
                files: ['!**/node_modules/**','!**/build/**','src/**/*.*','vendor/**/*.*'],
                tasks: ['debug']
            }
        },
        gitinfo:{

        }
    });
}