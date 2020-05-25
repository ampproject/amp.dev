FROM minimalcompact/thumbor

ENV LOG_LEVEL "DEBUG"
ENV THUMBOR_PORT "8080"

ENV AUTO_WEBP "True"

ENV LOADER "thumbor.loaders.file_loader"
ENV FILE_LOADER_ROOT_PATH "/app/"

COPY static /app/static

# ENV LOADER = 'thumbor_cloud_storage.loaders.cloud_storage_loader'
# ENV CLOUD_STORAGE_PROJECT_ID = 'amp-dev-staging'
# ENV CLOUD_STORAGE_BUCKET_ID = 'amp-dev-staging-thumbor-storage'
#
# ENV RESULT_STORAGE = 'thumbor_cloud_storage.result_storages.cloud_storage'
# ENV RESULT_STORAGE_CLOUD_STORAGE_PROJECT_ID = 'amp-dev-staging'
# ENV RESULT_STORAGE_CLOUD_STORAGE_BUCKET_ID = 'amp-dev-staging-thumbor-storage'
