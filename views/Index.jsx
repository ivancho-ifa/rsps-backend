const React = require("react")

function Index() {
	return (
		<form action="tracker" method="get">
			<label htmlFor="tracker-id">Tracker ID</label>
			<input type="text" name="tracker-id" id="tracker-id" />
			<input type="submit" value="Get tracker ID's data" />
		</form>
	)
}

module.exports = Index
