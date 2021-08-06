# SolaceKafkaConnectors
This repository is an instance of Solace-Kafka connectors ready for deployment in a distributed kubernetes environment.

To use it you will need access to a solace broker running either on a cluster or on solace-cloud.

# To Run in Distributed mode

**Configuration:**  
  All the major configuration is already done but after downloading the repository, if you want to change any configuration (e.g. the number of replicas) configure the file /kafka/values.yaml.  
  After that, configure the ENV variables in /configurator/configurator.yaml so that the connectors know which broker are they supposed to connect and which kafka topics are they supposed to read/write from/to.
  
  
**Deployment:**  
Deploy kafka using *helm install*:
  * e.g. *helm install mykafka ./kafka*  

Deploy the kafka-configurator using the file */configurator/configurator.yaml* (here there's no need to build a new image since the ENVs will be passed on the deployment and not in the dockerfile):
  * *kubectl apply -f /configurator/configurator.yaml*  

**How to start the Connectors**  
All you need to do is to enter the pod in iterative mode (*kubectl exec -it \<podName\>  -- /bin/bash*) and run the starting command.

A file with just a few basic commands can be found inside the pod at /home/commands. To use them you just need to change the name of the headless service and paste them in the pod's shell.  

Note that, after the first time you use the configurator, the connectors are probably already running with old configurations. The best way to proceed is to always check if they are running. If there's any connector up, then delete it and create a new one with the new settings you need. Keep in mind that even if you uninstall and reinstall everything again, the connectors configurations are persistent, and will be running.  

The pod already has nano editor installed so if there's any special configuration being needed just open the file with nano and edit it.  

# To Run in Standalone mode 

**Configuration:**  
  After downloading the repository edit the connection information in the files:
  * ./connectors/pubsubplus-connector-kafka-sink-2.0.2/etc/solace_sink.properties 
  * ./connectors/pubsubplus-connector-kafka-source-2.0.2/etc/solace_source.properties
  
  ![image](https://user-images.githubusercontent.com/72951472/127986457-7b0f2323-17f9-4314-9cef-8cc13b0c5d86.png)
  
  If you are trying to connect to a Solace broker on a cluster and security is not a concern, the connection type will be TCP, followed by the broker's IP and the broker's port for plaintext (55555 is the default).  
  If you are trying to connect to solace cloud then the connection will have to be secure, thus the connection's type will be TCPS instead of TCP, followed by all the connection's information given by the cloud (you will need to download the PEM file, place it in the certs folder and follow the instructions there).  
   
  ![image](https://user-images.githubusercontent.com/72951472/127856736-d41c688f-e444-4fef-9f25-73e65748f9c9.png)
   
  After configuring the connection information other settings can be modified e.g. the topics that are going to be used (both kafka and solace ones).
  
**Now that all the configurations are made we can upload and deploy**  
**To upload:**  
  Choose where you want to upload your docker image, build it and upload it e.g.:
  * *docker build -t rodrigofelixdockerhub/kafka:latest .* 
  * *docker push rodrigofelixdockerhub/kafka*
      
 (If you decide to use my image don't forget to uncomment the standalone CMD and comment out the distributed one).    
      
**To deploy:**
  * Connect to your kubernetes cluster (you can check it by doing *kubectl get node*).
  * Go to the kafka folder, and configure the file values.yaml, lines 51 to 54.
  * Then just install with *helm install*:
    * e.g. helm install mykafka ./kafka
  
  
  For debug purposes the image can be initialized without the second part of the CMD command (just run the setup.sh) by either changing the start command in kafka/values.yaml (just uncomment the setup.sh at line 189) and then install again or building a new image. After that the script can be started manually (/opt/bitnami/kafka/bin/connect-standalone.sh).

  **To stop the kafka server, enter the pod in iterative mode (*kubectl exec -it mykafka-0  -- /bin/bash*) and run the script /opt/bitnami/kafka/bin/kafka-server-stop.sh**  
  
