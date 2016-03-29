var SweetSelector = (function () {
  return {
    select: function (element) {
      if (element[0] === '#') {
        return document.getElementById(element.substr(1));
      } else if (element[0] === '.') {
        return document.getElementsByClassName(element.substr(1));
      } else {
        return document.getElementsByTagName(element);
      }
    }
  };
})();

var DOM = (function () {
  return {
    hide: function (element) {
      var classCollection = SweetSelector.select(element);
        if (classCollection.length){
          for (var i = 0; i < classCollection.length; i++) {
            classCollection[i].style.visibility = "hidden";
          }
        }else{
          // debugger
          classCollection.style.visibility = "hidden"
        }
    },

    show: function (element) {
      var classCollection = SweetSelector.select(element);
        if (classCollection.length){
          for (var i = 0; i < classCollection.length; i++) {
            classCollection[i].style.visibility = "visible";
          }
        }else{
          // debugger
          classCollection.style.visibility = "visible"
        }
    },

    addClass: function (orginalClass, classToAdd) {
      var root = document.getElementsByClassName(orginalClass.substr(1));
      for (var i = 0; i < root.length; i++)
        root[i].classList.add(classToAdd);
    },
    removeClass: function (orginalClass, classToRemove) {
      var root = document.getElementsByClassName(orginalClass.substr(1));
      for (var i = 0; i < root.length; i++)
        root[i].classList.remove(classToRemove);
    }
  }
})();

var EventDispatcher = (function(){
  return{
    on: function(element, event, runThisFunction){
      var elementCollection = SweetSelector.select(element);
          for (var i = 0; i < elementCollection.length; i++)
            elementCollection[i].addEventListener(event, runThisFunction)
    },
    trigger: function(element, triggerEvent){
      var elementCollection = SweetSelector.select(element);
      var myEvent = new CustomEvent(triggerEvent)
      for (var i = 0; i < elementCollection.length; i++)
            elementCollection[i].dispatchEvent(myEvent)
    }
  }
})();


var AjaxWrapper = (function(){
  return{
    request: function(args){
      return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open(args.type, args.url);
        xhr.onload = function() {
          if (xhr.status === 200 && xhr.status <= 300) {
            resolve(xhr.responseText);
          } else {
            reject('Request failed.  Returned status of ' + xhr.status);
          }
        }
      xhr.send(args.data);
      })
    }
  }
})();

// AjaxWrapper.request({}).then(function(response))
// AjaxWrapper.request({}).catch(function(r)


function $(selector){

  var self = {};
  self.selector = selector;
  self.element = SweetSelector.select(self.selector)
  // self.element = document.querySelector(self.selector);

  self.html = function(){
    return self.element;
  }

  self.attr = function(name, value){
    all = self.element
    for (var i = 0; i < all.length; i++){
      if(all[i].innerHTML == value){
        console.log(all[i])
      }
    }
  }

  self.on = function(type, callback){
    self.element['on' + type] = callback
    return self;
  }

  self.show = function(){
    DOM.show(self.selector)
  }

  self.hide = function(){
    DOM.hide(self.selector)
  }

  self.addClass = function(classTBA){
    DOM.addClass(self.selector, classTBA)
  }

  self.removeClass = function(removingElement){
    DOM.removeClass(self.selector, removingElement)
  }
  return self
}



// function .jax(){
//   // vanalla JS ajax request

//   var xhr = new XMLHttpRequest
//   xhr.onreadystate = someCallBack;
//   function someCallBack(){
//     if (xhr.status !== 200){
//       // xhr request was bad
//       alert("It's all bad!");
//       return;
//     }
//     // When code is good in the hood run these
//     console.log(xhr.responseText);
//   }
//   xhr.open('GET', 'url here', "true for asyn/false for syn request");
//   xhr.send('data sending if POST request')
// }