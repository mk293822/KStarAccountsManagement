FROM php:8.4-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set build args for UID/GID
ARG UID=1000
ARG GID=1000

# Install system dependencies (MUST be run as root)
RUN apt-get update -y && apt-get install -y \
    libicu-dev \
    libmariadb-dev \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install gettext intl pdo_mysql

# Create user after installing software
RUN groupadd -g ${GID} appgroup && \
    useradd -m -u ${UID} -g ${GID} -s /bin/bash appuser

# Switch to non-root user
USER appuser

# Set working directory
WORKDIR /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy your Laravel app
COPY . .
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf


# Optional: fix permissions
USER root
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html
USER appuser
