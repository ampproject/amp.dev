FROM minimalcompact/thumbor

ENV LOG_LEVEL "error"
ENV THUMBOR_PORT "8080"

ENV AUTO_WEBP "True"

ENV MAX_AGE "31536000"

ENV LOADER "thumbor.loaders.http_loader"
ENV ALLOWED_SOURCES "[ \
  'amp.dev', \
  '.+.amp.dev', \
  'amp-dev-staging.appspot.com', \
  '.+dot-amp-dev-staging.appspot.com', \
  'localhost:.+' \
]"
