FROM ruby:2.5.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - \
&& apt-get install -y nodejs

# Install yarn
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

RUN mkdir /bolt-network-react
WORKDIR /bolt-network-react

ADD Gemfile /bolt-network-react/Gemfile
ADD Gemfile.lock /bolt-network-react/Gemfile.lock

RUN bundle install

# Development
# =========================================================
# ADD . /bolt-network-react
# =========================================================

# Staging
# =========================================================
ENV RAILS_ENV staging
ENV RACK_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV BOLT_NETWORK_REACT_DATABASE_PASSWORD ChunkyBac0n

COPY package.json yarn.lock ./
RUN yarn install

ADD . /bolt-network-react

# RUN yarn add webpack

RUN bundle exec rake assets:precompile
RUN yarn cache clean

RUN rails db:create db:migrate db:seed
# # =========================================================

# Production
# =========================================================
# ENV RAILS_ENV production
# ENV RACK_ENV production
# ENV NODE_ENV production
# ENV RAILS_SERVE_STATIC_FILES true

# COPY package.json yarn.lock ./
# RUN yarn install

# ADD . /bolt-network-react

# # RUN yarn add webpack

# RUN bundle exec rake assets:precompile
# RUN yarn cache clean
# # =========================================================

CMD ["puma"]
