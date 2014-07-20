#!/bin/bash
export PORT=8080
export ROOT_URL="http://d2modd.in/"
export MONGO_URL="mongodb://d2mpsys:aucCXtn7d8twSEm4C28G@127.0.0.1/d2moddin"
export NODE_ENV=production
export USE_CLUSTER=true
node /app/app.js
