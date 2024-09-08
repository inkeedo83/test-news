clean:
	find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

init-api:
	docker run --name pg_alinews -d -p 5432:5432 -v pg_alinews_data:/var/lib/postgresql/data -e POSTGRES_DB=alinews -e POSTGRES_USER=alinews -e POSTGRES_PASSWORD=123456789 postgres:15.1
start-api:
	yarn start:dev
drop-db:
	yarn typeorm:drop
migrate-db:
	yarn typeorm:up

