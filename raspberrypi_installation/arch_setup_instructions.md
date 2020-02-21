# Arch Arm Setup on Raspberry Pi 3B+ V. 1.2 (2014)

Arch Linux is one of my favorite Linux distributions that I've tried. Partly because I love memes, but mostly the absence of bloat. 

For my router series I am looking for a lightweight OS because I'm hoping to release my custom routers as downloadable software packages that can be installed at home. I'm using a single-board computer to run the routers because I might eventually need additional processing power than a typical router can operate, and in the futere I would like to use GPIO pins in order to incorporate physical elements to my routers. For my SBC I am using a Raspberry Pi for its low cost and easy to access. Currently in my posession are versions Raspberry Pi 3B+ from 2014, 2015 and 2017. The 2014 model is before the on-board WiFi module is installed and requires additonal steps to set up a USB WiFi adapter. 

I am using Arch because of it's simplicity and rolling release. Arch is very modifiable and fairly widely used so finding forums and issues is pretty easy. This guide will explain how to set up Arch Linux Arm for the Raspberry Pi using a Linux build machine.

## Preparing the SD card
The first step to installing Arch is preparing your SD card. I am using a 32G micro SD card. 
1. Find the device using `fdisk -l`
```
sudo fdisk -l

Disk /dev/sdb: 29.47 GiB, 31633440768 bytes, 61784064 sectors
Disk model: STORAGE DEVICE  
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000

Device     Boot Start      End  Sectors  Size Id Type
/dev/sdb1        8192 61784063 61775872 29.5G  c W95 FAT32 (LBA)
```
You can see that my SD card is listed as `/dev/sdb` and has the Disklabel type is `dos`.

2. Format the SD card and create partition tables. Start fdisk into the SD card with:
```
sudo fdisk /dev/sdb
```
  a. Type __o__ to clear partitions and create an empty dos partition label.
  b. Type __p__ to list partitions. There will be no partitions now.
  c. Type __n__ then __p__ for primary, __1__ for the first partition. Use the default for the first sector and type __+100M__ for the last sector.
  d. Type __t__, then __c__ to set the type as _W95 FAT32 (LBA)_. If you are using a disklabel other than dos you will have different option types. 
  e. Type __n__ then __p__ for primary, __2__ for the second partition. Use the default values for the first and last sector.
  f. Write the partition table with __w__.

3. Create and mount the FAT filesystem:
```
mkfs.vfat /dev/sdX1
mkdir boot
mount /dev/sdX1 boot
```

4. Create and mount the ext4 filesystem:
```
mkfs.ext4 /dev/sdX2
mkdir root
mount /dev/sdX2 root
```

5. Download and extract the root filesystem (Note: Verify the processor on your raspberry pi. The 3B+ from 2015 has a Broadcom BCM2837 1.2GHz processor while a 2014 Model 3B+ (No On-board WiFi) uses a Broadcom BCM2835 700MHz processor. The tarball you will depend on your Architecture/ Processor ):
```
# This is for 2014 Model
wget http://os.archlinuxarm.org/os/ArchLinuxARM-rpi-latest.tar.gz 
bsdtar -xpf ArchLinuxARM-rpi-latest.tar.gz -C root
sync

OR

# This is for 2015 Model
wget http://os.archlinuxarm.org/os/ArchLinuxARM-rpi-2-latest.tar.gz
bsdtar -xpf ArchLinuxARM-rpi-2-latest.tar.gz -C root
sync
```

6. Move boot files to the first parttion: 
```
mv root/boot/* boot
```

7. Unmount the partitions:
```
umount boot root
```

8. Insert the SD Card into the Pi, connect it to ethernet and power it on.

9. Connect a monitor to the Pi or you can SSH into the Raspberry Pi using the IP Address:
  - Default user name is: _alarm_ and password is _alarm_.
  - Once logged into type `su` to switch to the root account. The root password is _root_.

10. Initialize the pacman keyring and populate the Arch Linux Arm package signing keys:
```
pacman-key --init
pacman-key --populate archlinuxarm
```

## Arch Installation Setup
11. Change the root password with:
```
# passwd
```

12. Change the timezone. First identify the correct time zone setting, remove the current time zone, and creating a symlink to the correct timezone.
```
# ls /usr/share/zoneinfo
# ls /usr/share/zoneinfo/America

# rm /etc/localtime

# ln -s /usr/share/zoneinfo/America/New_York /etc/localtime
```

13. Change the name of the Pi
  - Edit `/etc/hostname`
  ```
  #  vi /etc/hostname
  ```
Change 'alarmpi' to another name.

  - Change `/etc/hosts` to reflect newhost name
  ```
  # vi /etc/hosts

  127.0.0.1 localhost.localdomain localhost <yourhostname>
  ```

14. Update your packages.
```
# pacman -Syu

```

15. Create a new user and allow regular user permission to use sudo.
```
# pacman -S sudo
``` 
To allow regular users to use sudo you must add them to the _wheel_ group. But first allow the wheel group.
 As root run:
```
# EDITOR=vi visudo
```

Find the User privilege specification section and uncomment the line:
```
%wheel ALL=(ALL) ALL
```

Save and Exit.

16. Create a regular user account with:
```
# useradd -m -G wheel -s /bin/bash <newusername>
# passwd <newusername>
```

17. Logout of the root account and login as a regular user:
```
# logout

login: <newusername>
password: <newuserpassword>

$
```
Note the prompt will change from __#__ to __$__ to signify that you are a regular user. You can prepend commands with `sudo` to run commands with root privileges.

18. Delete the alarm user account:
```
$ sudo userdel alarm
```

19. You're done!

## Enable on-board WiFi
1. First bring up the `wlan0` interface
```
# ifconfig wlan0 up
```

2. Copy the netctl example:
```
/etc/netctl# install -m640 examples/wireless-wpa wireless-home
/etc/netctl# cat wireless-home
Description='A simple WPA encrypted wireless connection'
Interface=wlan0
Connection=wireless
Security=wpa

IP=dhcp

ESSID='MyNetwork'
# Prepend hexadecimal keys with \"
# If your key starts with ", write it as '""<key>"'
# See also: the section on special quoting rules in netctl.profile(5)
Key='WirelessKey'
# Uncomment this if your ssid is hidden
#Hidden=yes
```

3. Edit the SSID and Key as needed

4. Enable netctl-auto:
```
systemctl enable netctl-auto@wlan0
```

5. Bring down wireless interface:
```
ip link set wlan0 down
```

6. Start netctl:
```
netctl start wireless-home
```

6. Test connection:
```
ping 8.8.8.8
```

7. Enable network start on boot:
```
netctl enable wireless-home
```

8. Done!
