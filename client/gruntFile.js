var _ = require('lodash');

module.exports = function(grunt){


    grunt.registerTask('default',['debug','watch']);


    grunt.registerTask('dist',['clean','gitinfo','less:dist','html2js:dist','uglify','bower_concat','concat:index','copy']);

    grunt.registerTask('debug',['clean','gitinfo','less:debug','html2js:debug','bower_concat','concat','copy']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dest:{
            dir: 'build',
            pkg: '<%= dest.dir %>/<%= pkg.name %>'
        },
        src: {
            js: ['src/**/_config.js','src/**/*.js'],
            html: ['src/index.html'],
            less: ['src/assets/main.less'],
            tpl:['src/app/**/*.html','src/common/**/*.html'],
            vendor:[''],
            fonts:'bower_components/bootstrap-bower/fonts/',
            favicon: 'src/site_44px.png'
        },
        bower_concat: {
            all: {
                dest: '<%= dest.pkg %>.vendor.min.js',
                include:[
                    'angular',
                    'angular-bootstrap',
                    'angular-route',
                    'angular-sanitize',
                    'angular-animate',
                    'lodash',
                    'restangular',
                    'momentjs'
                ],
                callback: function(mainFiles, component) {
                    return _.map(mainFiles, function(filepath) {
                        // Use minified files is available
                        var min = filepath.replace(/\.js$/, '.min.js');
                        return grunt.file.exists(min) ? min : filepath;
                    });
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        uglify:{
            options: {
                //mangle: {toplevel: true}
            },
//            vendor:{
//                expand:true,
//                files:
//                    {
//                    '<%= dest.pkg %>.vendor.min.js':'<%= src.vendor %>'
//                }
//            },
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
                    paths: ['assets']
                },
                files: {
                    '<%= dest.pkg %>.min.css': '<%= src.less %>'
                }
            },
            dist:{
                options: {
                    compress:true,
                    paths: ['assets']
                },
                files: {
                    '<%= dest.pkg %>.min.css': '<%= src.less %>'
                }
            }
        },
        copy:{
            fonts: {
                expand:true, cwd: '<%= src.fonts %>',src:'*',dest:'<%= dest.dir %>/fonts/',flatten:true,filter:'isFile'
            },
            favicon:{
                src:'<%= src.favicon %>', dest:'<%= dest.dir %>/site.png'
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
            }
//            ,
//            vendor:{
//                expand:true,
//                files:
//                {
//                    '<%= dest.pkg %>.vendor.min.js':'<%= src.vendor %>'
//                }
//            }
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
                files: ['**/bower_components/**','!**/node_modules/**','!**/build/**','src/**/*.*','gruntFile.js'],
                tasks: ['debug']
            }
        },
        gitinfo:{

        }
    });
}