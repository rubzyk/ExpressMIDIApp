// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    urlArgs: 'cb=' + Math.random(),
    paths: {
      jquery: 'vendors/jquery-1.10.2.min',
      'jasmine': 'spec/jasmine/jasmine',
      'jasmine-html': 'spec/jasmine/jasmine-html',
      spec: 'spec/'
    },
    shim: {
      jasmine: {
        exports: 'jasmine'
      },
      'jasmine-html': {
        deps: ['jasmine'],
        exports: 'jasmine'
      }
    }
  });

  window.AC = {};

  window.AC.Core = {};

  window.AC.MIDI = {};

  window.AC.Utils = {};

  window.AC.GUI = {};

  require(["jquery", "jasmine-html"], function($, jasmine) {
    var htmlReporter, jasmineEnv, specs;
    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    specs = ["spec/RVal.spec", "spec/Note.spec", "spec/Interval.spec", "spec/Degree.spec", "spec/Array_adds.spec", "spec/AbstractMode.spec", "spec/Mode.spec", "spec/MelodicContext.spec", "spec/Constants.spec", "spec/Domain.spec", "spec/HGen.spec", "spec/Bar.spec", "spec/TimeLine.spec", "spec/RGen.spec", "spec/Position.spec", "spec/MGen.spec", "spec/Track.spec", "spec/Composer.spec", "spec/Directive.spec", "spec/Combinatorics.spec", "spec/MelodicPattern.spec", "spec/calcul.spec", "spec/init"];
    return $(function() {
      return require(specs, function(spec) {
        return jasmineEnv.execute();
      });
    });
  });

}).call(this);
