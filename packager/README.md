## Assumptions

- *You're packaging (i.e. want to create SXG for) `amp.dev` (this exact
  domain)*, and the appropriate certificates are in the `certs/` directory.
- *You're deploying to the Google Cloud project `amp-dev-sxg`*, and the
  password to decrypt the key will be available via [project-wide custom
  metadata](https://cloud.google.com/compute/docs/storing-retrieving-metadata#projectwide)
  at
  http://metadata.google.internal/computeMetadata/v1/project/attributes/password
  (see `decrypt.sh`).

If either of these is not true, you will need to make changes to make the
correct certificate available, and to ensure the unencrypted certificates make
it onto the container. Please see `Dockerfile` and `decrypt.sh`, and the sample
command for encryption and decription at the bottom of this file. It may also be
useful to be aware of how to pass environment variables to Docker via the
`--env` command.

## Deploy and run on Google App Engine

```sh
# deploy
$ cd .. && gulp packagerDeploy
```

## Build and run on local Docker instance

```sh
# build local Docker image called "amppkg"
$ docker build -t amppkg .

# create local container from Docker image, expose ports (uses CMD)
$ docker run -p 8080:8080 --env PASSWORD=$PASSWORD amppkg

# create (local) container from Docker image and provide shell (ignore CMD)
$ docker run -it amppkg bash
```
