'use strict';
var ShelfElements = require ('../../../lib/shelf-elements.js').ShelfElements;
describe('shelf',function(){
  var  shelfElements= new ShelfElements();
//  beforeEach(function () {
  browser.get('/');
  browser.executeScript(function () {
    localStorage['config.updateResponsivenessInterval'] = 1;
    window.onbeforeunload = null;
  });
  browser.wait(function(){
    return editorGetLine(2).then(function(text) {
      return text === 'title:';
    });
  });
//  });

  var methods = shelfElements.getResourceLevelMethods();
  var options = ['baseUriParameters', 'headers', 'queryParameters'];
  var parameters = shelfElements.getNamedParametersLevel();
  var methodElems = shelfElements.getMethodsLevel();
  describe('resource-Methods elements',function(){

    methods.forEach(function(method){
      it(method+'- check section', function(){
        var definition = [
          '#%RAML 0.8',
          'title: My api',
          '/res:',
          '  '+method+':',
          '     '
        ].join('\\n');
        editorSetValue(definition);
        editorSetCursor(5,5);
        shelfElementsMethodsByGroupAssertion(shelfElements);
      });
    });

    describe('Named Parameters', function(){ // https://www.pivotaltracker.com/story/show/60351064

      methods.forEach(function(method){
        options.forEach(function(option){
          it(method+'-'+option+': NamedParameters displayed on the shelf', function(){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+':',
              '    '+option+': ',
              '      hola:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(8,9);
            shelfElemNamedParametersByGroupAssertion(shelfElements);
          });
        });
      });

      describe('after selected', function(){

        methods.forEach(function(method){
          options.forEach(function(option){
            parameters.forEach(function(parameter){
              it(method+'-'+option+'-'+parameter+'is no longer displayed on the shelf', function(){
                var definition = [
                  '#%RAML 0.8',
                  'title: My api',
                  'baseUri: http://www.theapi.com/{hola}',
                  '/res:',
                  '  '+method+': ',
                  '    '+option+': ',
                  '      hola:',
                  '        '+parameter+':',
                  '          '
                ].join('\\n');
                editorSetValue(definition);
                editorSetCursor(9,9);
                var list2 =[parameter];
                var listPromise = shelfGetListOfElementsFromShelf();
                listPromise.then(function (list) {
                  noShelfElementsAssertion(list, shelfElements.getNamedParametersLevel(),list2);
                });
              });
            });
          });
        });

      }); // Not displayed after being selected

    }); //NamedParameters

    describe('response', function(){

    }); //response

    describe('body', function(){

    }); //body

    describe('after being selected', function(){
      methods.forEach(function(method){
        methodElems.forEach(function(methodElem){
          it(methods+'-'+methodElem+' is no longer displayed on the shelf', function(){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              '/res:',
              '  '+method+': ',
              '    '+methodElem+': ',
              '        '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(6,4);
            var list2 =[methodElem];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfElements.getMethodsLevel(),list2);
            });
          });
        });
      });
    }); // not displayed after being selected
  });//resource-Methods elements
}); // shelf
