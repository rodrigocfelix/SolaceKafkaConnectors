# SolaceKafkaConnectors
Basically an instantiation of Solace-Kafka connectors but ready for deployment in kubernetes

Steps to configure:
  Download the repo
  Edit the connection information in the files /connectors/pubsubplus-connector-kafka-sink-2.0.2/etc/solace_sink.properties and /connectors/pubsubplus-connector-kafka-source-2.0.2/etc/solace_source.properties
  
  ![image](https://user-images.githubusercontent.com/72951472/127836159-d799afc7-f434-4044-baa6-9e84f0b651b0.png)
  
  If you are trying to connect to a Solace broker on a cluster and you dont want any security the connection type will be TCP, followed by the broker IP and then the port that the broker uses for plaintext (55555 is the default).
   If you are trying to connect to solace cloud then the connection will have to be secure so the connection type will be TCPS instead of TCP, followed by all the connection information given by the cloud (and you will need to download the PEM file, place it in the certs folder and follow the instructions there)
   
  ![image](https://user-images.githubusercontent.com/72951472/127856736-d41c688f-e444-4fef-9f25-73e65748f9c9.png)
   
  After configuring the connection information other settings can be modified e.g. the topics that are going to be used (bouth kafka and solace ones)
  
Now that all the configurations are made we can upload and deploy
To upload:
  Choose where you want to upload your docker image, build it and upload it e.g.
      docker build -t rodrigofelixdockerhub/kafka:latest /home/felix/Documents/estagio/solace/kafka
      docker push rodrigofelixdockerhub/kafka
      
To deploy:
  Connect to your kubernetes cluster (you can check by doing kubectl get node)
  Go to the kafka folder, and configure the file values.yaml, lines 51 to 54.
  Then just install with helm:
  helm install <name> <dir>
  e.g. helm install mykafka /home/felix/Documents/estagio/solace/kafka/kafka
  
  to start in Distributed mode instead of standalone change the start command in the dockerfile (after the sleep).
