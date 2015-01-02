module.exports = function( grunt )
{
  var latest = '<%= pkg.name %>',
      name = '<%= pkg.name %>-v<%= pkg.version%>',
      bannerContent = 
        '/*!\n' + 
        ' * <%= pkg.name %> <%= pkg.version %> - Copyright <%= grunt.template.today("yyyy") %> Terrill Dent, http://terrill.ca\n' +
        ' * <%= pkg.license %>\n' +
        ' */\n',

      sourceDir = 'src/',
      distDir   = 'dist/',

      devJS     = latest+'.js',
      minJS     = latest+'.min.js';
       
       
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jslint: {
      tsorter: {
        src: [ sourceDir + 'tsorter.js' ]
      }
    },

    uglify:{
      options : {
        banner: bannerContent,
        mangle: {}
      },
      tsorter: {
        src: distDir + devJS,
        dest: distDir + minJS
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-jslint');

  grunt.registerTask('default', [ 'jslint:tsorter', 'uglify:tsorter' ] );
};


