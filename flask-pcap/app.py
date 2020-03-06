import time
import subprocess
import threading
import eventlet
import random
from flask import Flask, render_template
from flask_socketio import SocketIO
from scapy.all import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

eventlet.monkey_patch()
socketio = SocketIO(app, async_mode="eventlet")

thread = Thread()
thread_stop_event = Event()

class Sniffer(Thread):
    def __init__(self):
        self.delay = 1
        super(Sniffer, self).__init__()

    def snifferGenerator(self):
        print("Sniffing started.")
        while not thread_stop_event.isSet():
            pkts = sniff(count=1, prn=lambda x: x.summary())
            print(pkts)
            socketio.emit('event repeater', str(pkts), namespace='/network-listener')

            ### random number test
            # number = round(random.random()*10, 3)
            # print (number)
            # socketio.emit('event repeater', number, namespace='/network-listener')

            time.sleep(self.delay)

    def run(self):
        self.snifferGenerator()

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@socketio.on('my event', namespace='/network-listener')
def handle_event(message):
    socketio.emit('server response', "Server response", namespace='/network-listener')
    print('Received ' + str(message))

@socketio.on('connect', namespace='/network-listener')
def repeater():
    # Using Threads
    global thread
    if not thread.isAlive():
        thread = Sniffer()
        thread.start()

    ##### Send one packet ####
    # pkts = sniff(count=4, prn=lambda x: x.summary())
    # summary = str(pkts.summary())
    # print(pkts)
    # socketio.emit('server response', str(pkts), namespace='/network-listener')

    ###### Attempt to loop packet sent #####
    # while True:
    #     pkts = sniff(count=4, prn=lambda x: x.summary())
    #     summary = str(pkts.summary())
    #     print(pkts)
    #     socketio.emit('server response', str(pkts), namespace='/network-listener')
    #     time.sleep(100)

@socketio.on('disconnect')
def disconnection():
    print('Client disconnected.')
    
@socketio.on('connect')
def connection():
    print('Client connected.')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True)
