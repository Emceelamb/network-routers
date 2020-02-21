# Setup a base router on Alpine Linux

## Requirements
- Alpine Linux
- Raspberry Pi with onbard WiFi
- Ethernet connection
- Software packages installed:
    - hostapd
    - dnsmasq
    - iptables

## Setup 
- Modify `initap` with correct INGRESS and EGRESS interfaces
- Run `./configure-files`
- Enable access point with  `./initap`
