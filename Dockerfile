FROM ruby:2.5.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - \
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

ADD . /bolt-network-react
CMD ["puma"]
