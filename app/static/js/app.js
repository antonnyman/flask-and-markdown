page('/', index);
page('/:id', node);
page({hashbang: true});
page();


function index() {
  list();
}



function template(name) {
  var el = document.getElementById('content');
  reset(el);
  el.classList.add(name);
}

function list() {
  var el = document.getElementById('content');
  var ul = document.createElement('ul');
  template('index');
  ul.setAttribute('id', 'coollist');
  el.appendChild(ul);
  getJson('/index').then(function(data) {
    for(var root in data) {
      if(data.hasOwnProperty(root)) {
        var tree = data[root];
        for(var key in tree) {
          var node = tree[key];
          var li = document.createElement('li');
          li.setAttribute('class', 'item');
          var a = document.createElement('a');
          var linkText = document.createTextNode(node.title);
          a.appendChild(linkText);
          a.title = node.title;
          a.href = node.path;
          li.appendChild(a);
          ul.appendChild(li);
        }
      }
    }
  });
}

function node(ctx) {
  var id = ctx.params.id;
  template('partial');
  var el = document.getElementById('content');
  getJson(id).then(function(data) {
    el.innerHTML = data.body;
  });
}

function reset(el) {
  el.innerHTML = "";
  el.className = "";
}


function getJson(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
};
