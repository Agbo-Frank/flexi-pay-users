#!/bin/bash

# npm run build
git add .
# read -p "Enter Commit message: " $commit_message
git commit -m $1
git push origin prod

