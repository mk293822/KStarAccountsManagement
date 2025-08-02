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
	docker compose exec kstart-account-management bash

bash-root:
	docker exec -u 0 -it kstart-account-management bash

composer:
	docker compose exec kstart-account-management composer install

migrate:
	docker compose exec kstart-account-management php artisan migrate:fresh --seed

npm-dev:
	docker compose exec kstart-account-management npm run dev

npm-build:
	docker compose exec kstart-account-management npm run build
