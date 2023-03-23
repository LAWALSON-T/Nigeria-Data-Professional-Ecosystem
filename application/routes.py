from application import app
from flask import Flask, render_template, url_for

@app.route('/')
def index():
    return render_template('dash.html', title= 'home')

@app.route("/index")
def base():
    return render_template('index.html')


@app.route("/layout")
def layout():
    return render_template('layout.html', title= 'layout')