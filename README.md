# RealityCheck: Interactive AI-Awareness Game 🧠

**RealityCheck** is a fast-paced psychological web game testing the player's ability to distinguish between human-written texts and contextually manipulated AI-generated content under strict time constraints. 

It evaluates confidence, reaction time, and risk appetite, dynamically tracking player behavior through a rigorously implemented React Finite State Machine (FSM). 

## 🚀 Features
* **Dynamic Content Extraction:** 3 Synthetically generated AI options and 1 organic Human text mixed concurrently per round without repetitive generation.
* **Psychological Scoring:** Algorithms interpreting *Streak Multipliers*, *Time Bonuses*, and variable *Confidence Sliders* to calculate end-game profiles.
* **Algorithmic Generators:** Node.js/Express backend algorithm procedurally shuffling conversational linguistics, intentional colloquialisms, and dataset anomalies to prevent predictable AI patterns.
* **Premium Interactive UI:** Pure Vanilla CSS implementation featuring dynamic DOM flashing animations, glowing pastel components, and fluid responsive states without bulk frameworks.

## ⚙️ Tech Stack
* **Frontend:** React, Vite, Core JavaScript, Vanilla CSS 
* **Backend:** Node.js, Express
* **Architecture:** Custom React Reducers (`gameReducer.js`) serving as the absolute source of truth.

## 🛠️ Local Development

This project uses a monorepo setup containing both `client` and `server` folders.

### 1. Start the Node Server 
Provides local API endpoints (`GET /round`) and parses randomizing datasets.
```bash
cd server
npm install
node index.js
```
*The server will execute locally on port `3001`.*

### 2. Start the React Client 
Mounts the React application and the UI interface loops.
```bash
cd client
npm install
npm run dev
```
*The client will run via Vite, commonly accessible at `http://localhost:5173`.*

## 🎯 Gameplay Mechanics
- **Threat Levels:** Select from Level 1 (obvious machine text) to Level 5 (adversarial linguistic obfuscation).
- **Time Pressure:** An aggressive timer scales dynamically per difficulty level.
- **Confidence Overlay:** Modify your bet on each round. High confidence on incorrect answers will severely harm your psychological rating!

---
*Built with ❤️ in 2026.*
