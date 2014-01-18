module.exports = function(grunt){


    grunt.registerTask('default',['nodemon']);

    grunt.loadNpmTasks('grunt-nodemon');


    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        nodemon:{
            dev:{
                options:{
                    file:'server.js',
                    ignoredFiles: ['node_modules/**'],
                    watchedFolders: ['../client/dist','controllers','lib','models']
                }
            }
        }
    });




}