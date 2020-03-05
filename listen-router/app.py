from flask import Flask, render_template
from flask_socketio import SocketIO
import time
import subprocess
from scapy.all import *


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

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
# while True:
    pkts = sniff(count=4, prn=lambda x: x.summary())
    summary = str(pkts.summary())
    print(pkts)
    socketio.emit('server response', str(pkts), namespace='/network-listener')
        # time.sleep(100)
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

# sniffer = subprocess.Popen(['tshark', '-i', 'eth0'],
#         stdout=subprocess.PIPE,
#         stderr=subprocess.STDOUT)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
