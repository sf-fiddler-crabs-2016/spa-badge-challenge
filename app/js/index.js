$('document').ready(function(){
  console.log("WE GOOD");

  var templateScript = SweetSelector.select('#names-template').innerHTML;
   var template = Handlebars.compile(templateScript);
   var teachers;

  AjaxWrapper.request({
      url: 'http://spa-badge-api.herokuapp.com/teachers',
      type: 'GET'
  })
  .then(function(response) {
    // console.log(JSON.parse(response.responseText))
    var teachers = JSON.parse(response.responseText)
    // console.log(teachers)
    var context = {
      teacher: teachers
  };
  console.log(context)
  var compiledHtml = template(context);
  SweetSelector.select('#teachers-list').innerHTML = compiledHtml
  })
  .catch(function(error) {
    console.log("all bad")
  });

})
