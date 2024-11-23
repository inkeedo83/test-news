clean:
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

init-api:
	docker run --name pg_alinews -d -p 5432:5432 -v pg_alinews_data:/var/lib/postgresql/data -e POSTGRES_DB=alinews -e POSTGRES_USER=alinews -e POSTGRES_PASSWORD=123456789 postgres:15.1
	docker run --name minio-forms -d -p 9000:9000 -p 9001:9001 -v minio_data:/data -e MINIO_ROOT_USER=admin -e MINIO_ROOT_PASSWORD=adminadmin minio/minio:latest server /data --console-address ":9001"

start-api:
	yarn start:dev
drop-db:
	yarn typeorm:drop
migrate-db:
	yarn typeorm:up

