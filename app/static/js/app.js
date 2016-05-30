page('/', index);
page('/:id', node);
page();

function index() {
  nav();

  var el = get('content');

  var heroContainer = document.createElement('section');
  heroContainer.setAttribute('class', 'container grid-960')
  var hero = document.createElement('div');
  hero.setAttribute('id', 'hero');
  hero.setAttribute('class', 'column col-12');
  heroContainer.appendChild(hero);

  var projectsContainer = document.createElement('section');
  projectsContainer.setAttribute('class', 'container grid-960');
  var projects = document.createElement('div');
  projects.setAttribute('id', 'projects');
  projects.setAttribute('class', 'columns');
  projectsContainer.appendChild(projects);

  el.appendChild(heroContainer);
  el.appendChild(projectsContainer);

  getJson("hero.json").then(function(data) {
    el.setAttribute('class', 'enter');
    hero.innerHTML = data.body;
  });

  getJson("all.json").then(function(data) {
    for(var root in data) {
      if(data.hasOwnProperty(root)) {
        var tree = data[root];
        for(var key in tree) {
          var node = tree[key];

          var column = document.createElement('div');
          column.setAttribute('class', 'column col-4');

          var card = document.createElement('div');
          card.setAttribute('class', 'card');

          var cardHeader = document.createElement('div');
          cardHeader.setAttribute('class', 'card-header');


          var title = document.createElement('h4');
          title.setAttribute('class', 'card-title');
          var linkText = document.createTextNode(node.title);
          title.appendChild(linkText);
          title.title = node.title;
          title.href = node.path;


          cardHeader.appendChild(title);
          card.appendChild(cardHeader);
          column.appendChild(card);
          projects.appendChild(column);
          el.setAttribute('class', 'enter');
        }
      }
    }

  })
}

function node(ctx) {
  resetNav();
  var id = ctx.params.id;
  template('partial');
  var el = document.getElementById('content');
  getJson(id + ".json").then(function(data) {
    el.setAttribute('class', 'column col-12');
    el.setAttribute('class', 'enter');
    el.innerHTML = data.body;
  });
}

function template(name) {
  var el = document.getElementById('content');
  reset(el);
  el.classList.add(name);
}

function nav() {
  var el = get('nav');
  var ul = document.createElement('ul');
  template('nav');
  ul.setAttribute('class', 'nav');
  el.setAttribute('class', 'column col-12');
  el.appendChild(ul);

  getJson('nav.json').then(function(data) {

    for(var root in data) {
      if(data.hasOwnProperty(root)) {
        var tree = data[root];
        for(var key in tree) {
          var node = tree[key];
          var li = document.createElement('li');
          li.setAttribute('class', 'nav-item');
          var a = document.createElement('a');
          var linkText = document.createTextNode(node.title);
          a.appendChild(linkText);
          a.title = node.title;
          a.href = node.path;
          li.appendChild(a);
          ul.appendChild(li);
          el.setAttribute('class', 'enter');
        }
      }
    }
  });
}

function resetNav() {
  if(document.getElementById('nav').innerHTML === "") {
    nav();
  }
}

function parseJson(href, json) {
  getJson(href).then(function(data) {
    for(var root in data){}
  })
}

function reset(el) {
  el.innerHTML = "";
  el.className = "";
}

function getJson(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('progress', updateProgress);
    //  xhr.addEventListener('load', transferComplete);
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

function updateProgress(event) {
  if(event.lengthComputable) {
    var percentComplete = event.loaded / event.total;
    console.log(percentComplete);
  } else {
    // nothing
  }
}

function get(element) {
  return document.getElementById(element);
}
