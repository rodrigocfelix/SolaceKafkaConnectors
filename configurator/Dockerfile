FROM adoptopenjdk/openjdk8:x86_64-ubuntu-jre8u292-b10


RUN apt-get update && \
    apt-get install -y nano &&\
    apt-get install -y jq

RUN mkdir /home/bkup
COPY ./solace_sink_properties.json /home/bkup
COPY ./solace_source_properties.json /home/bkup

COPY ./createprops.js /home

WORKDIR /home

CMD sleep infinity
