PREFIX              := amp-dev
TAG                 := $(shell git log -1 --pretty=%H)
INSTANCE_GROUP      := ig-${PREFIX}
INSTANCE_TEMPLATE   := it-${PREFIX}-${TAG}
INSTANCE_NAME       := i-${PREFIX}
INSTANCE_GROUP_SIZE := 1
PROJECT_ID          := amp-dev-230314
WORKING_DIR         := ..

REGION						  := us-east1
ZONE								:= us-east1-c

IMAGE_TAG           := gcr.io/${PROJECT_ID}/${PREFIX}:${TAG}

init-docker:
	gcloud auth configure-docker

init-firewall:
	gcloud compute firewall-rules create www-firewall-http \
    --target-tags ${PREFIX} --allow tcp:8080 \
		--source-ranges 130.211.0.0/22,35.191.0.0/16

init-backend-service:
	-gcloud config set compute/region ${REGION}
	-gcloud config set compute/zone ${ZONE}
	-gcloud compute addresses create lb-ip-cr \
    --ip-version=IPV4 \
    --global
	-gcloud compute health-checks create http http-basic-check \
    --port 80
	-gcloud compute backend-services create web-map-backend-service \
    --protocol HTTP \
    --health-checks http-basic-check \
    --global
	-gcloud compute backend-services add-backend web-map-backend-service \
    --balancing-mode UTILIZATION \
    --max-utilization 0.8 \
    --capacity-scaler 1 \
    --instance-group ${INSTANCE_GROUP} \
    --global
	-gcloud compute url-maps create web-map \
    --default-service web-map-backend-service
	-gcloud compute target-http-proxies create http-lb-proxy \
    --url-map web-map

docker-build:
	cd ${WORKING_DIR} && docker build --tag ${IMAGE_TAG} .

docker-upload:
	 cd ${WORKING_DIR} && gcloud builds submit --tag ${IMAGE_TAG} .

create-instance-template:
	 gcloud compute instance-templates create-with-container ${INSTANCE_TEMPLATE} --container-image ${IMAGE_TAG} \
		 --tags http-server,https-server

create-instance-group:
	 gcloud compute instance-groups managed create ${INSTANCE_GROUP} \
    --base-instance-name ${INSTANCE_NAME} \
    --size ${INSTANCE_GROUP_SIZE} \
    --template ${INSTANCE_TEMPLATE}

update:
	gcloud compute instance-groups managed rolling-action start-update ${INSTANCE_GROUP} \
	--version template=${INSTANCE_TEMPLATE}

update-status:
	gcloud beta compute instance-groups managed describe ${INSTANCE_GROUP}

update-stop:
	gcloud compute instance-groups managed rolling-action stop-proactive-update ${INSTANCE_GROUP} 
deploy: docker-upload create-instance-template update
