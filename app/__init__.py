import sys
from flask import Flask, render_template, jsonify
from flask_flatpages import FlatPages

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)

pages = FlatPages(app)



def page_list (pages, limit = None):
    p_list = (p for p in pages if 'date' in p.meta)
    p_list = sorted(p_list, reverse = True, key = lambda p: p.meta['date'])
    return p_list[:limit]

def page_titles (pages, limit = None):
    titles = {}
    all_pages = page_list(pages)
    for p in all_pages:
        titles.append(p.meta['title'])
    return titles

def page_dates(pages, limit = None):
    dates = []
    all_pages = page_list(pages)
    for p in all_pages:
        dates.append(p.meta['date'])
    return dates

""" ROUTES """

@app.route('/')
def index():
    # all_pages = page_list(pages)
    # for p in all_pages:
    return jsonify({'title': page_titles(pages)})

@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    return jsonify({'title': page['title'],
                    'date': str(page['date']),
                    'body': page.body})
