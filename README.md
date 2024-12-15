
# Angular App for Webpage Feedback

This is an Angular application that takes a URL as input, sends it to a FastAPI backend via a WebSocket, and retrieves feedback about the webpage.

---

## Prerequisites

Before you begin, ensure the following are installed on your machine:

- **Node.js**: Download and install [Node.js](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.
- **Angular CLI**: Install globally using `npm install -g @angular/cli`.

To check if these are installed, run:

```bash
node -v
npm -v
ng version
```

---

## Features

- A simple input field to enter a webpage URL.
- Connects to a FastAPI backend via WebSocket.
- Displays feedback about the webpage in real-time.

---

## Getting Started

### Step 1: Clone the Repository

Clone the Angular project from the repository:

```bash
git clone <repository_url>
cd <repository_name>
```

### Step 2: Install Dependencies

Install the required dependencies for the application:

```bash
npm install
```

### Step 3: Configure the Backend URL

In the Angular app, update the WebSocket URL in the service file (e.g., `src/app/services/websocket.service.ts`):

```typescript
const WEBSOCKET_URL = 'ws://127.0.0.1:8000/ws'; // Replace with your FastAPI WebSocket URL if different
```

### Step 4: Run the Angular App

Start the Angular application:

```bash
ng serve
```

By default, the application will run at:

```text
http://localhost:4200
```

---

## How to Use

1. Open the application in your browser at [http://localhost:4200](http://localhost:4200).
2. Enter a valid webpage URL in the input field.
3. Click the "Submit" button to send the URL to the backend.
4. View the feedback about the webpage displayed below the input field.

---

## Application Overview

### Key Components

#### 1. **URL Input Form**
- A simple form with a text input field to accept a webpage URL.
- A submit button to send the URL to the backend.

#### 2. **WebSocket Service**
- Manages the connection to the FastAPI backend via WebSocket.
- Sends the URL to the backend and listens for responses.

Example code snippet for the WebSocket service:

```typescript
import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private WEBSOCKET_URL = 'ws://127.0.0.1:8000/ws';
  private socket$ = new WebSocketSubject(this.WEBSOCKET_URL);

  sendMessage(data: any): void {
    this.socket$.next(data);
  }

  getMessages() {
    return this.socket$;
  }
}
```

#### 3. **Feedback Display**
- Dynamically updates the feedback section based on the response from the backend.
