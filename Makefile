start-dev:
	down
	up
	migrate
	npm-dev

build-force:
	docker compose build --no-cache --force-rm

build:
	docker compose build

up:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

down-volumes:
	docker compose down --volumes --remove-orphans

bash:
	docker compose exec laravel-docker bash

bash-root:
	docker exec -u 0 -it laravel-docker bash

composer:
	docker compose exec laravel-docker composer install

migrate:
	docker compose exec laravel-docker php artisan migrate:fresh --seed

npm-dev:
	docker compose exec laravel-docker npm run dev

npm-build:
	docker compose exec laravel-docker npm run build
