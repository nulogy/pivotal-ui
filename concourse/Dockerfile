FROM pivotal-ui-npm-cache
USER root
ENV SHELL /bin/bash

# cache npm packages
RUN apt-get install -y phantomjs
RUN ls
RUN git clone https://github.com/pivotal-cf/pivotal-ui /tmp/pivotal-ui
RUN cd /tmp/pivotal-ui/library && yarn
RUN cd /tmp/pivotal-ui/library && gulp build
RUN cd /tmp/pivotal-ui/styleguide && cat package.json && yarn
RUN cd /tmp/pivotal-ui/styleguide_new && yarn
