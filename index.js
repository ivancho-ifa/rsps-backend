import mqtt from 'mqtt'


const frontendClient = mqtt.connect({
	protocol: 'ws',
	hostname: 'broker.hivemq.com',
	port: 8000,
	path: '/mqtt'
})


const trackerClient = mqtt.connect({
	protocol: 'mqtt',
	hostname: 'test.mosquitto.org',
	port: 1883,
})

trackerClient.subscribe('rsps/trackers/+')

trackerClient.on('message', function (topic, message) {
	const messageParsed = message.toString()
	console.log(`message: ${messageParsed}`)

	frontendClient.publish(topic, messageParsed)
})