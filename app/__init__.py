import sys
from flask import Flask, render_template, jsonify
from flask_flatpages import FlatPages

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)

pages = FlatPages(app)

@app.route('/')
def index():
    return app.send_static_file('distr/index.html')

@app.route('/all')
def all():
    results = []
    for page in pages:
        p = {"title": page['title'],
            "date": str(page['date']),
            "body": page.body
            }
        results.append(p)
    return jsonify(results = results)

@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    return jsonify({'title': page['title'],
                    'date': str(page['date']),
                    'body': page.body})
