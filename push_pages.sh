#!/bin/bash

git checkout pages && mvn install -B && git checkout master && cp target/website/* . -r && rm target/ -rf && git add * && git commit -m "MyController.org page update" && git push origin master;

# back to pages branch
git checkout pages;

