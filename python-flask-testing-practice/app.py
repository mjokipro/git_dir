"""Simple Flask app to demonstrate some testing."""

from flask import Flask, request, render_template, redirect, session

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"