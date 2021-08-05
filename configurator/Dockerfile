FROM adoptopenjdk/openjdk8:x86_64-ubuntu-jre8u292-b10


RUN apt-get update && \
    apt-get install -y nano &&\
    apt-get install -y jq &&\
    apt-get install -y npm

RUN mkdir /home/bkup
COPY ./solace_sink_properties.json /home/bkup
COPY ./solace_source_properties.json /home/bkup

COPY ./writer /home/writer
#RUN cd  /home/writer
WORKDIR /home/writer

#RUN npm install

CMD sleep infinity
