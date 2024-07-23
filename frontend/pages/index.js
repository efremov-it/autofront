import { useEffect, useState } from 'react'

const Home = () => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const host = window.location.hostname
		const apiHost = host.replace(/^my-app/, 'my-api')
		const apiUrl = `http://${apiHost}:8080`

		console.log('API URL:', apiUrl) // Debugging

		fetch(apiUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				return response.text()
			})
			.then(data => {
				console.log('Data received:', data) // Debugging
				setData(data)
			})
			.catch(error => {
				console.error('Error fetching data:', error) // Debugging
				setError(error)
			})
	}, [])

	return (
		<div>
			<h1>Client Info</h1>
			{error && <p style={{ color: 'red' }}>{error.message}</p>}
			<pre>{data ? data : 'Loading...'}</pre>
		</div>
	)
}

export default Home;
