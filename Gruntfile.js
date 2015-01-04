module.exports = function( grunt )
{
  var latest = '<%= pkg.name %>',
      name = '<%= pkg.name %>-v<%= pkg.version%>',
      bannerContent = 
        '/*!\n' + 
        ' * <%= pkg.name %> <%= pkg.version %> - Copyright <%= grunt.template.today("yyyy") %> Terrill Dent, http://terrill.ca\n' +
        ' * <%= pkg.description %>\n' +
        ' * <%= pkg.license %>\n' +
        ' */\n',

      sourceDir = 'src/',
      distDir   = 'dist/',

      devJS     = latest +'.js',
      minJS     = latest +'.min.js';
       
       
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jslint: {
      tsorter: {
        directives: { 
          browser: true,
          white: true,
          plusplus: true,
          todo: true
        },
        src: [ sourceDir + 'tsorter.js' ]
      }
    },

    uglify:{
      options : {
        banner: bannerContent
      },
      tsorter: {
        src: sourceDir + devJS,
        dest: distDir + minJS
      }
    },

    concat: {
      options: {
        banner: bannerContent
      },
      tsorter: {
        src: sourceDir + devJS,
        dest: distDir + devJS
      },
    },
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');

  grunt.registerTask('default', [ 'jslint:tsorter', 'uglify:tsorter', 'concat:tsorter' ] );
};


