# SolaceKafkaConnectors
Basically an instantiation of Solace-Kafka connectors but ready for deployment in kubernetes

# To run in distributed mode
All the major configuration is already done, just download the repo, configure the file /kafka/values.yaml to use the settings you want (pay special atention to ReplicaCount), after that just install kafka using *helm install*:
  * e.g. helm install mykafka ./kafka  

Now configure the ENV vars in configurator.yaml and deploy it.  
After that just enter the pod in iterative mode (kubectl exec -it \<podName\>  -- /bin/bash) and run the comands to configure or get information about the connectors.  
A file with just a few basic commands can be found inside the pod at /home/commands all you got to do to use them is to change the name of the headless service.

# To run in standalone mode 

**Configuration:**  
  After downloading the repo edit the connection information in the files:
  * ./connectors/pubsubplus-connector-kafka-sink-2.0.2/etc/solace_sink.properties 
  * ./connectors/pubsubplus-connector-kafka-source-2.0.2/etc/solace_source.properties
  
  ![image](https://user-images.githubusercontent.com/72951472/127986457-7b0f2323-17f9-4314-9cef-8cc13b0c5d86.png)
  
  If you are trying to connect to a Solace broker on a cluster and security is not a concern, the connection type will be TCP, followed by the broker's IP and the broker's port for plaintext (55555 is the default).  
  If you are trying to connect to solace cloud then the connection will have to be secure, thus the connection's type will be TCPS instead of TCP, followed by all the connection's information given by the cloud (you will need to download the PEM file, place it in the certs folder and follow the instructions there).  
   
  ![image](https://user-images.githubusercontent.com/72951472/127856736-d41c688f-e444-4fef-9f25-73e65748f9c9.png)
   
  After configuring the connection information other settings can be modified e.g. the topics that are going to be used (both kafka and solace ones).
  
**Now that all the configurations are made we can upload and deploy**  
**To upload:**  
  Choose where you want to upload your docker image, build it and upload it e.g.
  * *docker build -t rodrigofelixdockerhub/kafka:latest .* 
  * *docker push rodrigofelixdockerhub/kafka*
      
**To deploy:**
  * Connect to your kubernetes cluster (you can check it by doing *kubectl get node*).
  * Go to the kafka folder, and configure the file values.yaml, lines 51 to 54.
  * Then just install with *helm install*:
    * e.g. helm install mykafka ./kafka
  
  
  For debug purposes the image can be initialized without the second part of the CMD comand (just run the setup.sh) by either changing the start command in kafka/values.yaml (just uncomment the setup.sh at line 189) and then install again or building a new image. After that the script can be started manually (/opt/bitnami/kafka/bin/connect-standalone.sh).

  **To stop the kafka server, enter the pod in iterative mode (kubectl exec -it mykafka-0  -- /bin/bash) and run the script /opt/bitnami/kafka/bin/kafka-server-stop.sh**  
  
