# dev mode
start-dev:
	docker compose --env-file .env up -d
stop-dev:
	docker compose stop
down-dev:
	docker compose down
restart-dev:
	docker compose restart
log-db:
	docker container logs -f db
