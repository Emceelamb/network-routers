#!/bin/sh

########################################
########################################
###                                  ###
###        WIFI CONFIGURATION        ###
###                                  ###
########################################
############################EMCEELAMB###

if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Not running as root"
    exit
fi
read -p 'WiFi SSID: ' SSID
sed -i "s/^ssid=.*/ssid=$SSID/" /etc/hostapd/hostapd.conf

PASSPHRASE_OKAY=false
while [ $PASSPHRASE_OKAY=false ]
do
        echo "Passphrase must be minimum of 8 characters."
        read -sp 'WPA Passphrase: ' PASSPHRASE

        if [ ${#PASSPHRASE} -gt 7 ]; then
                PASSPHRASE_OKAY=true
                break
        fi
        echo ""
done

sed -i "s/^wpa_passphrase.*/wpa_passphrase=$PASSPHRASE/" /etc/hostapd/hostapd.conf

echo ""
echo "Broadcasting as: $SSID"

systemctl restart hostapd

