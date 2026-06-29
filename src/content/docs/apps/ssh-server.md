---
title: SSH Server
description: 'Start an SSH server on Leaf to reach the device shell from a computer over Wi-Fi.'
---

The SSH Server app starts a small SSH server (Dropbear) on the device so you can open
a terminal to it from a computer on the same network. It is aimed at tinkerers who
want shell access; most people will never need it.

![The SSH Server app showing the server toggled on, with its IP address and port, username, masked password, and start folder listed](/ssh-server.png)

## Starting it

1. Connect the device to Wi-Fi (**Settings → Network**).
2. Open **SSH Server** from the **Apps** tab.
3. Select **Start**. The screen shows the device's **IP address** and **port**.

The server runs until you stop it; it does not start on its own at boot.

## Connecting

From a terminal on your computer:

```sh
ssh sshadmin@<device-ip> -p 2222
```

- The default username is **`sshadmin`** and the default port is **2222**.
- You set the password from the app the first time, using the on-screen keyboard.
- The username, port, and starting folder can all be changed in the app.
- A host key is generated automatically the first time you start the server.

The bundled SSH server is Dropbear (MIT / public domain).
