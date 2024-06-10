#!/bin/sh
if [ "$(uname -m)" = "aarch64" ]; then
    echo "ARM architecture detected"
    export MEDIASOUP_SKIP_WORKER_PREBUILT_DOWNLOAD='true'
    export MEDIASOUP_WORKER_BIN='/app/mediasoup-bins/arm64/mediasoup-worker'
    echo "Setting MEDIASOUP_WORKER_BIN to /app/mediasoup-bins/arm64/mediasoup-worker"
fi