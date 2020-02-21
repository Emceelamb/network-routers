# Alpine Setup on Raspberry Pi 3B+ V. 1.2 (2015)

Alpine Linux is a super lightweight Linux distribution that is great on Raspberry Pis. They can be installed as run-from-RAM with super fast boot time making it an excellent option to run as a router. The installation process is almost as simple as copying the files to a drive and this guide will explain how to install a router image easily.

The instructions are meant for a Linux build machine.

## Installation

1. First identify your SD card: 
```
sudo fdisk -l

Disk /dev/sdb: 29.47 GiB, 31633440768 bytes, 61784064 sectors
Disk model: STORAGE DEVICE
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x6cad6aa8

Device     Boot Start      End  Sectors  Size Id Type
/dev/sdb1        2048 61784063 61782016 29.5G  c W95 FAT32 (LBA)
```
2. Clear the partitions: 
```
sudo fdisk /dev/sdb
```
  1. Command __o__ to delete all partitions
  2. Command __n__ to create new partition
  3. Use default settings is fine
  4. Command __t__ to change partition type
  5. Command __c__ to select W95 FAT32 (LBA)
  6. Command __w__ to write changes to card


3. Create a EXT4 file system with `mkdosfs`:
```
sudo mkdosfs -F 32 /dev/sdX1
```
4. Mount the SD card and change to the SD card directory

5. Extract tarball of Alpine image:
```
tar -xvf <Alpine-image.tar.gz> .
```

6. Unmount the SD card and plug into  a Raspberry Pi.

7. Done!
