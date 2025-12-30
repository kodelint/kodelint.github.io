FROM ruby:3.2-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libyaml-dev \
    zlib1g-dev \
    libgmp-dev \
    nodejs \
    git \
    && gem install bundler \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock* ./
RUN bundle install

# Copy rest of site
COPY . .

# Jekyll default port and livereload port
EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--drafts", "--livereload"]