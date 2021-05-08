#!/bin/bash

# build
docker run --rm --name jdk --volume $PWD:/source -w /source docker.io/library/maven:3.6.3-openjdk-8 mvn install -B

# container registry
REGISTRY='quay.io/mycontroller-org'
IMAGE_WEBSITE="${REGISTRY}/website-v1"
IMAGE_TAG=`git rev-parse --abbrev-ref HEAD`

# debug lines
echo $PWD
ls -alh
git branch

# build image
docker buildx build \
  --push \
  --progress=plain \
  --platform linux/arm/v6,linux/arm/v7,linux/arm64,linux/amd64 \
  --file docker/Dockerfile \
  --tag ${IMAGE_WEBSITE}:${IMAGE_TAG} .
