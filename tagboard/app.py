#!/include/bin/env python

from __future__ import print_function

import sqlite3
from datetime import datetime
from flask import Flask, request, g, jsonify
from flask.ext.cors import CORS

DATABASE_PATH = './database.sqlite.db'

app = Flask(__name__)
CORS(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE_PATH)
    return db

@app.teardown_appcontext
def close_db_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def insert_db(query, args=()):
    with get_db() as conn:
        cur = conn.execute(query, args)

def update_db(query, args=()):
    with get_db() as conn:
        cur = conn.execute(query, args)

def parse_message(message):
    return {
            'id': message[0],
            'text': message[1],
            'status': message[2],
            'added_timestamp': message[3],
            'approved_timestamp': message[4]
            }

def respond(key, data, error=None):
    return jsonify({key: data, "error": error})

@app.route("/")
def index():
    return "Hello"

@app.route("/messages", methods=['GET', 'POST'])
def messages():
    if request.method == 'GET':
        messages = list(map(parse_message, query_db("select * from Messages")))
        print(messages)
        return respond('messages', messages)
    else:
        data = request.json
        if data is None:
            return respond('message', [], 'no json provided (make sure headers are set)')
        else:
            message = data['text']
            print(message)
            insert_db("INSERT INTO Messages(Text, Status) VALUES (?, ?)", 
                      (message, "undecided"))
            return respond('success', ':)')

@app.route("/messages/<message_id>", methods=['GET', 'POST'])
def get_message(message_id):
    if request.method == 'GET':
        if message_id in ('unset', 'approved', 'disapproved'):
            messages = query_db("SELECT * FROM Messages WHERE status=?", 
                    (message_id,))
            return respond('messages', list(map(parse_message, messages)))
        else:
            message = query_db("SELECT * FROM Messages WHERE id=?", (message_id,), one=True)
            return respond("message", parse_message(message))
    else:
        data = request.json
        if data['status'] not in ('unset', 'approved', 'disapproved'):
            return respond('success', '', 'status must be one of unset, approved, disapproved')
        update_db("UPDATE Messages SET Status=?, ApprovedTimestamp=? WHERE id = ?", 
                (data['status'], datetime.now(), message_id))
        return respond('success', ':)')

if __name__ == '__main__':
    app.run(debug=True)
