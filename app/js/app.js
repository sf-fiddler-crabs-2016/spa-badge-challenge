window.onload = function(){
  var templateScript = SweetSelector.select('#names-template').innerHTML;
  var template = Handlebars.compile(templateScript);
  var teachers;
  AjaxWrapper.request({
         url: 'http://spa-badge-api.herokuapp.com/teachers',
         type: 'GET'
        }).then(function(response) {
          var teachers = JSON.parse(response.responseText)
          var context = {
            teacher: teachers
          };
          var compiledHtml = template(context);
          // console.log(compiledHtml)
          SweetSelector.select('#teachers-list').innerHTML = compiledHtml
        }).catch(function(error) {
          console.log("something went wrong...")
        });
}
