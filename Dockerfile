FROM php:8.4-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install system dependencies
RUN apt-get update -y && apt-get install -y \
	libicu-dev libmariadb-dev libpq-dev unzip zip curl \
	zlib1g-dev libpng-dev libjpeg-dev libfreetype6-dev \
	libjpeg62-turbo-dev gnupg git

# Install PHP extensions including PostgreSQL
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd gettext intl pdo_mysql pdo_pgsql pgsql

# Install Node.js + npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
	apt-get install -y nodejs

# Install Composer (latest)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy app code
COPY . .

# Copy Apache config (if you have custom virtual host config)
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Install backend dependencies
RUN composer install

# Install frontend dependencies and build
RUN npm install && npm run build

# Fix permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
