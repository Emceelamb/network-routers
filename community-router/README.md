```
 _______                              _             
 (_______)                            (_)  _         
  _       ___  ____  ____  _   _ ____  _ _| |_ _   _ 
  | |     / _ \|    \|    \| | | |  _ \| (_   _) | | |
  | |____| |_| | | | | | | | |_| | | | | | | |_| |_| |
   \______)___/|_|_|_|_|_|_|____/|_| |_|_|  \__)\__  |
         ______                               
         (_____ \              _               
          _____) )___  _   _ _| |_ _____  ____ 
          |  __  // _ \| | | (_   _) ___ |/ ___)
          | |  \ \ |_| | |_| | | |_| ____| |    
          |_|   |_\___/|____/   \__)_____)_|    
```

This router calls to attention the local community around local networks.

View and listen to the network traffic of the network and chat with your peers.

## Installation & setup  
1. Configure routing in /router-config
2. Configure splashpage in /splashpage
3. Start Access point with `router/initap`
4. Begin nodogsplash with `nodogsplash &`
5. Begin chat server with `npm start`

## Software
- hostapd to create access point
- dnsmasq for dns resolution and ip allocation
- nodogsplash for captive portal
- iptables to forward traffic
- node/socketio for chat server
