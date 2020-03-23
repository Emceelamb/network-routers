# Bridges to the Internet
[Presentation deck](https://bridges-to-the-internet.herokuapp.com/)

An ITP Thesis exploring routers as bridges to the internet where the local meets the global.

## About

Bridges to the internet explores how routers both make local communities (LAN) and provide access to the greater internet (WAN). The routers generally are made with easily accessible single board computers (Raspberry Pi Model 3B+). For the most part when the computer is plugged into a modem/router they create a Wireless Access Point and where devices can connect to the WLAN and the traffic is forwarded. There are a variety of community interventions in the local network which can be made at the link. This repository is both storage of my explorations and learning resources.

## Sections
- [How to setup up a basic router](https://github.com/Emceelamb/network-routers/tree/master/basic_router)
- [Raspberry Pi Linux Setups](https://github.com/Emceelamb/network-routers/tree/master/raspberrypi_installation)
- [A Community Router](https://github.com/Emceelamb/network-routers/tree/master/community-router)
- [A Flask-SocketIO server](https://github.com/Emceelamb/network-routers/tree/master/flask-pcap)
- [Listen to your network traffic](https://github.com/Emceelamb/network-routers/tree/master/listen-routera)
- [Captive portal Setup](https://github.com/Emceelamb/network-routers/tree/master/nodogsplash)

### Software Used
- hostapd - creates access ponts
- dnsmasq - provides dns resolution/ ip address allocation
- iptables - forwards traffic
- nodogsplash - creates captive portals
