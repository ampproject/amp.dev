# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Use an official Go runtime as a parent image
FROM golang:1.22

ENV GO111MODULE=on

# Clone amppackager files so we can use b3 directory
WORKDIR /data
# Get latet repo data to avoid caching the results of git clone. See https://stackoverflow.com/a/39278224/967
ADD https://api.github.com/repos/ampproject/amppackager/git/refs/heads/main version.json
# Run this if you clone from main branch.
RUN git clone -b main https://github.com/ampproject/amppackager.git /data/amppackager
# RUN git clone https://github.com/ampproject/amppackager.git /data/amppackager

# Install AMP Packager
# Run this if you want to go off main branch.
RUN  cd /data/amppackager/ && go install github.com/ampproject/amppackager/cmd/amppkg

# Seed the ocsp cache
WORKDIR /data/amppackager/testdata/b3
RUN ./seedcache.sh

WORKDIR /go/src/app

# Copy the AMP packager binary into our app dir inside the container.
RUN cp /go/bin/amppkg .

# Copy whatever certs are available in the certs/ directory  into the container.
COPY certs/*pem* /amppkg/
# Copy config file into container.
COPY amppkg.toml .

# Make port 8080 available to the world outside this container. This
# port must match the AMP Packager port configured in the toml file.
EXPOSE 8080

# Start the AMP Packager
ENTRYPOINT ["amppkg"]

CMD ["-config=amppkg.toml"]
