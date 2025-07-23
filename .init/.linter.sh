#!/bin/bash
cd /home/kavia/workspace/code-generation/note-management-system-26e046d5/notes_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

