#!/bin/sh
if [ "$(uname -m)" = "aarch64" ]; then
    echo "ARM architecture detected"
    export MEDIASOUP_WORKER_BIN=./mediasoup-bins/arm64/mediasoup-worker
    echo "Setting MEDIASOUP_WORKER_BIN to ./mediasoup-bins/arm64/mediasoup-worker"
fi