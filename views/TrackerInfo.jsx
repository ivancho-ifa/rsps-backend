const React = require('react')

function TrackerInfo(props) {
	return (
		<html>
			<head>
				<style dangerouslySetInnerHTML={{__html: `
					#map {
						height: 400px;
						width: 400px;
					}
				`}} />
			</head>
			<body>
				<div id="map"></div>
				<table>
					<tr> <th>Latitude </th> <td>{props.latitude}</td> </tr>
					<tr> <th>Longitude</th> <td>{props.longitude}</td> </tr>
					<tr> <th>Altitude </th> <td>{props.altitude}</td> </tr>
					<tr> <th>Speed    </th> <td>{props.speed}</td> </tr>
					<tr> <th>Locked   </th> <td>{props.locked ? "true" : "false"}</td> </tr>
				</table>

				<script dangerouslySetInnerHTML={{__html: `
					function initMap() {
						let location = {
							lat: ${props.latitude},
							lng: ${props.longitude}
						}

						let map = new google.maps.Map(document.getElementById('map'), {
							zoom: 15,
							center: location
						})
						let marker = new google.maps.Marker({
							position: location,
							map: map
						})
					}
				`}} />
				<script
					defer
					src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2_BXuIm1kSqoLvUaKHGr8LNAleYO___M&callback=initMap">
				</script>
			</body>
		</html>
	)
}

module.exports = TrackerInfo
