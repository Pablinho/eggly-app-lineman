module.exports = function(lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/jquery.js",
        //"vendor/js/bootstrap.js",
        "vendor/js/lodash.min.js",
        "vendor/js/angular.js",
        "vendor/js/angular-route.js",
        //"vendor/js/angular-resource.js",
        "vendor/js/**/*.js"
      ],
      app: [
        "app/js/app.js",
        "app/js/**/*.js"
      ]
    },

    less: {
      compile: {
        options: {
          paths: ["vendor/css/normalize.css", "vendor/css/**/*.css", "app/css/**/*.less"]
        }
      }
    }
  };
};
