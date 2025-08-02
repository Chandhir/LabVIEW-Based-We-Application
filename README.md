# LabVIEW-Based-We-Application
This LabVIEW-based web application uses LabVIEW code as the server and JavaScript code as the client.

## Overview

This web application is designed to remotely monitor and control LabVIEW-based ATE (Automated Test Equipment) systems. It consists of two parts:

#### Server (LabVIEW): Runs on each test PC (ATE01, ATE02, etc.), exposing web services to deliver test status and front panel images.

#### Client (Web Dashboard): A browser-based JavaScript application (HTML/CSS/JS) hosted separately, used to login and monitor multiple ATE systems from a centralized dashboard.

## System Architecture

+--------------------+         HTTP POST Requests         +---------------------+
| Web Client (User)  | <--------------------------------> | LabVIEW HTTP Server |
| Runs in browser    |     (GetFP_Image, Request_Message) | (ATE01, ATE02...)    |
+--------------------+                                     +---------------------+

## Folder Structure

labview-multi-ate-client/ <br>
├── login.html         → Login screen UI <br>
├── login.js           → Login validation logic <br>
├── login.css          → Styling for login screen <br>
├── index.html         → Main dashboard layout <br>
├── app.js             → Dynamic behavior (navigation, fetch, command) <br>
├── style.css          → Styling for the dashboard <br>
├── systems.json       → (optional) Config for ATE list <br>

## How to Use

### 1. Start from Login

Open login.html in your browser.

Enter a dummy username/password and click Login.

You’ll be redirected to the main dashboard (index.html).

📸 Screenshot Placeholder: Login Screen

### 2. Main Dashboard Layout

Once logged in, the layout includes:

Sidebar Menu:

Home

Test Reports

Test Data

Settings

Help

Logout

Home Section:

Displays ATE cards (e.g., ATE01, ATE02)

Each card shows status and a "View" button to monitor the test system

📸 Screenshot Placeholder: Home Screen with ATE Cards

3. Monitoring a Test System

Click View on any ATE card

A new screen opens displaying:

Live Front Panel Image of the LabVIEW VI

Status of the test system

Control buttons: Start, Pause, Terminate

📸 Screenshot Placeholder: Monitor Screen with Controls and Image

4. Commands to LabVIEW

The following POST requests are sent from the web client:

Command

Endpoint URL (example)

Payload

Get FP Image - http://<ATE-IP>:8001/TSM_WebService/GetFP_Image <br>

Get Status - http://<ATE-IP>:8001/TSM_WebService/GetTestStatus <br>

Send Command -  http://<ATE-IP>:8001/TSM_WebService/Request_Message <br>

5. Logout

Click Logout in the left menu

You will be redirected back to the login screen

## Deployment Steps

Host the folder labview-multi-ate-client on a local or remote web server

Ensure LabVIEW web services are running on each ATE system

Update IP addresses in app.js or systems.json

Access login.html from any browser
