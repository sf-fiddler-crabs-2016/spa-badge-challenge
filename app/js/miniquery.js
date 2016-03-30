
 var SweetSelector = {};
 (function(exports){
  exports.select = function(el){
    if (el[0] === '#'){
      var id = el.slice(1);
      return (document.getElementById(id))
    } else if (el[0] === '.') {
      var elClass = el.slice(1);
      return (document.getElementsByClassName(elClass))
    } else {
      return (document.getElementsByTagName(el))
    }
  }
 })(SweetSelector);

var DOM = {};
(function(exports){
  exports.hide = function(el) {
    SweetSelector.select(el).style.visibility = "hidden"
  },
  exports.show = function(el) {
    SweetSelector.select(el).style.visibility = "visible"
  },
  exports.addClass = function(el, name) {
    return SweetSelector.select(el).classList.add(name)
  },
  exports.removeClass = function(el, name) {
    return SweetSelector.select(el).classList.remove(name)
  }
})(DOM)

var EventDispatcher = {};
(function(exports){
var event = document.createEvent('Event');
  exports.on = function(el, customEvent, func) {
    event.initEvent(customEvent, true, true)
    console.log(SweetSelector.select(el))
    if(typeof SweetSelector.select(el).constructor != String){
      for(var i = 0; i < SweetSelector.select(el).length; i++){
        SweetSelector.select(el)[i].addEventListener(customEvent, func, false)
      }
    }else{
      SweetSelector.select(el).addEventListener(customEvent, func, false)
    }
  },
  exports.trigger = function(el, customEvent) {
    SweetSelector.select(el).dispatchEvent(event)
  }
})(EventDispatcher)

EventDispatcher.on('a', 'click', function(){DOM.hide('.container')})
// EventDispatcher.trigger('.container', 'bob')



// var EventDispatcher = {};
// (function(exports){

//   var event = document.createEvent('Event')

//   exports.on = function(element, customEvent, phunction){
//     event.initEvent(customEvent, true, true)
//     if(SweetSelector.select(element).length > 1){
//       for(var i = 0;i < SweetSelector.select(element).length; i++){
//         SweetSelector.select(element)[i].addEventListener(customEvent, phunction, false)
//       }
//     }else{
//       SweetSelector.select(element).addEventListener(customEvent, phunction, false)
//     }
//   }

//   exports.trigger = function(element, customEvent){
//     SweetSelector.select(element)[0].dispatchEvent(event)

//   exports.onhashchange = function(){

//   }
//   }

// })(EventDispatcher);






// SweetSelector = {};
// (function(exports){

//   exports.select = function(element){
//     if(element.charAt(0) === '#'){
//       return document.getElementById(element.slice(1))
//     }else if(element.charAt(0) === '.'){
//       return document.getElementsByClassName((element.slice(1)))
//     }else{
//       return document.getElementsByTagName(element)
//     }
//   }

// })(SweetSelector);



// DOM = {};
// (function(exports){

//   exports.hide = function(element){
//     SweetSelector.select(element)[0].style.display = 'none'
//   }

//   exports.show = function(element){
//     SweetSelector.select(element)[0].style.display = 'block'
//   }

//   exports.addClass = function(klass, name){
//     SweetSelector.select(klass)[0].classList.add(name)
//   }

//   exports.removeClass = function(klass, name){
//     SweetSelector.select(klass)[0].classList.remove(name)
//   }

// })(DOM);





var AjaxWrapper = {};
(function(exports) {

  exports.request = function(args) {
    var promise = new Promise( function(resolve, reject){
      var ajax = new XMLHttpRequest();
      ajax.addEventListener('load', transferComplete);
      ajax.addEventListener('error', transferFailed);
      ajax.open(args.type, args.url);
      ajax.send();
      function transferComplete(){
        resolve(this);
        console.log('good')
      };

      function transferFailed(){
        reject(this);
        console.log('bad')
      }
    })
    return promise;
  };
})(AjaxWrapper);
