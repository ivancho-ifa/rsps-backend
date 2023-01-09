import mqtt from 'mqtt'


const mqtt_client = mqtt.connect({
	protocol: 'ws',
	hostname: 'broker.hivemq.com',
	port: 8000,
	path: '/mqtt'
})

mqtt_client.on('message', function (_topic, message) {
	const message_parsed = message.toString()
	console.log(`message: ${message_parsed}`)
})