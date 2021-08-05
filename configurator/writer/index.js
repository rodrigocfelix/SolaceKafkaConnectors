const fs = require('fs');

const sinkfile = `{"name":"solaceSinkConnector","config":{"connector.class":"com.solace.connector.kafka.connect.sink.SolaceSinkConnector","tasks.max":"1","key.converter":"org.apache.kafka.connect.converters.ByteArrayConverter","value.converter":"org.apache.kafka.connect.storage.StringConverter","group.id":"solSinkConnectorGroup","topics":"${process.env.KafkaSinkTopic}","sol.host":"${process.env.SolaceSinkHost}","sol.username":"${process.env.SolaceSinkUser}","sol.password":"${process.env.SolaceSinkPass}","sol.vpn_name":"${process.env.SolaceSinkVPNname}","sol.topics":"${process.env.SolaceSinkTopics}","sol.record_processor_class":"com.solace.connector.kafka.connect.sink.recordprocessor.SolSimpleRecordProcessor"}}`;

const sourcefile = `{"name":"solaceSourceConnector","config":{"name":"solaceSourceConnector","connector.class":"com.solace.connector.kafka.connect.source.SolaceSourceConnector","tasks.max":"1","kafka.topic":"${process.env.KafkaSourceTopic}","sol.host":"${process.env.SolaceSourceHost}","sol.username":"${process.env.SolaceSourceUser}","sol.password":"${process.env.SolaceSourcePass}","sol.vpn_name":"${process.env.SolaceSourceVPNname}","sol.topics":"${process.env.SolaceSourceTopics}","sol.message_processor_class":"com.solace.connector.kafka.connect.source.msgprocessors.SolSampleSimpleMessageProcessor","value.converter":"org.apache.kafka.connect.converters.ByteArrayConverter","key.converter":"org.apache.kafka.connect.storage.StringConverter"}}`;


fs.writeFile("./solace_sink_properties.json", sinkfile, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`created file: ${sinkfile}`);
}); 


fs.writeFile("./solace_source_properties.json", sourcefile, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`created file: ${sourcefile}`);
}); 

// Or
//fs.writeFileSync('/tmp/test-sync', 'Hey there!');
