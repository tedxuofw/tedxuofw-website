#!/home4/tedxuofw/venv/tagboard/bin/python 

from flup.server.fcgi import WSGIServer
from tagboard import app as application

WSGIServer(application).run()
