#!/include/bin/env python

from __future__ import print_function

import sqlite3
from functools import wraps
from datetime import datetime
from flask import Flask, request, g, jsonify, render_template
from flask.ext.cors import CORS
from werkzeug.exceptions import BadRequest

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
        'added_timestamp': pass_if_none(reformat_to_iso, message[3]),
        'approved_timestamp': pass_if_none(reformat_to_iso, message[4])
    }

def pass_if_none(func, item):
    if item is None:
        return None
    else:
        return func(item)

def get_messages(query, args=()):
    return list(map(parse_message, query_db(query, args)))

def get_message(query, args=()):
    return parse_message(query_db(query, args, one=True))

def get_now():
    return datetime.utcnow().replace(microsecond=0)

def get_now_iso():
    return to_iso(get_now())

def reformat_to_iso(timestamp):
    return to_iso(datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S"))

def parse_iso(timestamp):
    return datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S")

def to_iso(date):
    return date.isoformat().split('.')[0]

def respond(key, data, success=True, error=None):
    error = [] if error is None else error
    return jsonify({
        key: data, 
        "errors": error, 
        "success":True, 
        "timestamp": get_now_iso()
    })

def success():
    return jsonify({'errors': [], 'success': True, 'timestamp': get_now_iso()})

def error(*reasons):
    return (jsonify({
        'errors': list(reasons), 
        'success': False, 
        'timestamp': get_now_iso()}), 400)

class ValidationError(Exception): pass

def catch_failures(func):
    @wraps(func)
    def func_wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValidationError as ex:
            return error(str(ex))
        except BadRequest as ex:
            return error("JSON missing or contains syntax error")
    return func_wrapper

def get_data(data, expected_field):
    if data is None:
        raise ValidationError('no json provided (make sure headers are set)')
    if expected_field not in data:
        raise ValidationError('missing field: {0}'.format(expected_field))
    return data[expected_field]

@app.route("/")
def index():
    return render_template("liveinput.html")

@app.route("/approval")
def approval():
    return render_template("approval.html")

@app.route("/display")
def display():
    return render_template("tagboard.html")

@app.route("/messages", methods=['GET', 'POST'])
@catch_failures
def messages():
    if request.method == 'GET':
        messages = get_messages("select * from Messages")
        return respond('messages', messages)
    else:
        message = get_data(request.json, 'text')
        insert_db("INSERT INTO Messages(Text, Status) VALUES (?, ?)", 
                  (message, "unset"))
        return success()

@app.route("/messages/<message_id>", methods=['GET', 'POST'])
@catch_failures
def get_message_route(message_id):
    if request.method == 'GET':
        if message_id in ('unset', 'approved', 'disapproved'):
            messages = get_messages("SELECT * FROM Messages WHERE status=?", 
                    (message_id,))
            return respond('messages', messages)
        else:
            message = get_message("SELECT * FROM Messages WHERE id=?", 
                    (message_id,))
            return respond("message", message)
    else:
        status = get_data(request.json, 'status')
        if status not in ('unset', 'approved', 'disapproved'):
            return error('status must be one of unset, approved, disapproved')
        update_db("UPDATE Messages SET Status=?, ApprovedTimestamp=? WHERE id = ?", 
                (status, get_now(), message_id))
        return success()

@app.route("/messages/<message_type>/unseen/<timestamp>", methods=['GET'])
@catch_failures
def get_unseen_messages(message_type, timestamp):
    timestamp = parse_iso(timestamp)
    if message_type not in ('unset', 'approved', 'disapproved', 'all'):
        return error('status must be one of unset, approved, disapproved, all')
    if message_type == 'all':
        messages = get_messages(
                'SELECT * FROM Messages WHERE AddedTimestamp > ?',
                (timestamp,))
    elif message_type == 'approved':
        messages = get_messages(
                "SELECT * FROM Messages WHERE Status=? AND ApprovedTimestamp > ?",
                (message_type, timestamp))
    else:
        messages = get_messages(
                "SELECT * FROM Messages WHERE Status=? AND AddedTimestamp > ?",
                (message_type, timestamp))
    return respond('messages', messages)
    

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True)
