import sys
from flask import Flask, render_template, jsonify
from flask_flatpages import FlatPages, pygments_style_defs
from pygments.styles import get_all_styles

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_MARKDOWN_EXTENSIONS = ['codehilite', 'extra', 'headerid', 'nl2br']

app = Flask(__name__)
app.config.from_object(__name__)

pages = FlatPages(app)

@app.route('/static/distr/pygments.css')
def pygments_css():
    return pygments_style_defs('tango'), 200, {'Content-Type': 'text/css'}

@app.route('/')
def index():
    return app.send_static_file('distr/index.html')

@app.route('/index')
def all():
    results = []
    articles = (p for p in pages)
    latest = sorted(articles, reverse=True, key=lambda p: p.meta['date'])

    for l in latest:
        p = {"title": l['title'],
            "date": str(l['date']),
            "path": l.path,
            #"body": l
            }
        print(p)
        results.append(p)

    return jsonify(results = results)

@app.route('/z')
def z():
    articles = (p for p in pages)
    latest = sorted(articles, reverse=True,
                    key=lambda p: p.meta['date'])
    return jsonify(articles = latest)

@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    return jsonify({'title': page['title'],
                    'date': str(page['date']),
                    'body': page})
