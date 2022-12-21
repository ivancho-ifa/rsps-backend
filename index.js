const bodyParser = require('body-parser')
const express = require('express')
const mqtt = require('mqtt')
const path = require('path')


const mqtt_client = mqtt.connect({
	port: 1883,
	host: 'test.mosquitto.org',
	protocol: 'mqtt'
})

const PORT = process.env.PORT || 3333

let db = {
	latitude: 0,
	longitude: 0,
	altitude: 0,
	speed: 0,
	locked: false
}


mqtt_client.on('message', function (_topic, message) {
	const message_parsed = message.toString()
	console.log(`message: ${message_parsed}`)

	db = JSON.parse(message_parsed)
	console.log('database:', db)
})


const app = express()
const server = app
	.use(bodyParser.json())                         // for parsing application/json
	.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'jsx')
	.engine('jsx', require('express-react-views').createEngine())
	.get('/', function (request, response) {
		response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
		response.render('Index')
	})
	.get('/tracker', function (request, response) {
		mqtt_client.subscribe(`rsps/trackers/rsps-tracker-${request.query['tracker-id']}`)
		setTimeout(function () {
			response.render('TrackerInfo', db)
		}, 3000)
	})
	.listen(PORT, function () {
		app.locals.address = server.address().address
		app.locals.port = server.address().port
		console.log(`Listening on ${app.locals.address}:${app.locals.port}`)
	})

module.exports = app