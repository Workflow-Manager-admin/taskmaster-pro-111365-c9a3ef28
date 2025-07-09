#!/bin/bash
cd /home/kavia/workspace/code-generation/taskmaster-pro-111365-c9a3ef28/task_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

