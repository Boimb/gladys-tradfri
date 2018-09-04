# [WIP]gladys-tradfri

[![Build Status](https://travis-ci.org/Boimb/gladys-tradfri.svg?branch=master)](https://travis-ci.org/Boimb/gladys-tradfri)

## Description
Control IKEA Tradfri devices through Gladys.

*This module interacts with the TRADFRI Gateway.
You need to have your devices associated with it before install.*
 
## Installation

- Install module through gladys dashboard
- Fill the "TRADFRI_SECRET" param with the code written on gateway
- Restart Gladys.

## Implemented
- Authentication on Tradfri gateway
- Store credentials so you don't have to authenticate further
- Subscribe to devices update
- Add discovered devices/deviceTypes to Gladys DB
- Listen to device update and sync
- Control devices

##TODO
- Manage Groups
- Change device properties (on gateway)
- Change deviceTypes properties (on gateway)
- Manage gateway status (updates,disconnect...)

##
Not officially part of the Gladys Project created by Pierre Gilles Leymarie
But prowdly promoting it and contributing.

Visit : [Gladys Project GitHub page](https://github.com/GladysProject/Gladys)
