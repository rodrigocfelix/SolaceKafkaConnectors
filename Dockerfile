#this dockerfile is an adaption from apache kafka provided by bitnami, the only diference is that it has
#bouth solace connectores confured inside the containers. and the connectors start along with the containers.
#
FROM bitnami/kafka:2.8.0-debian-10-r43

RUN mkdir -p  /opt/bitnami/kafka/connectors
COPY ./connectors  /opt/bitnami/kafka/connectors

RUN mkdir -p  /opt/bitnami/kafka/certs
COPY ./certs  /opt/bitnami/kafka/certs

RUN rm /opt/bitnami/kafka/config/connect-standalone.properties
RUN rm /opt/bitnami/kafka/config/connect-distributed.properties

COPY ./connect-standalone.properties /opt/bitnami/kafka/config
COPY ./connect-distributed.properties /opt/bitnami/kafka/config

WORKDIR /opt/bitnami/kafka

CMD /scripts/setup.sh & sleep 10 ; /opt/bitnami/kafka/bin/connect-standalone.sh /opt/bitnami/kafka/config/connect-standalone.properties /opt/bitnami/kafka/connectors/pubsubplus-connector-kafka-source-2.0.2/etc/solace_source.properties /opt/bitnami/kafka/connectors/pubsubplus-connector-kafka-sink-2.0.2/etc/solace_sink.properties
