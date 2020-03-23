# Basic Router setup

## Requirements
- hostapd
- iptables
- dnsmasq 


## Installation
- Modify `initap` with correct INGRESS and EGRESS interfaces
- Modify `/files/hostapd.conf` for your own SSID broadcast
- Run `./configure-files`
- Enable access point with `./initap`

## Run Instructions
- run `./initap`
