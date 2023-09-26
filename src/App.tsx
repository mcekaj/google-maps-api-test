import { useCallback, useState } from "react";
import "./App.css";
import {
	GoogleMap,
	useJsApiLoader,
	MarkerClusterer,
	MarkerF,
	InfoWindowF,
} from "@react-google-maps/api";

const center = {
	lat: -3.745,
	lng: -38.523,
};

const locations1 = [
	{ lat: -31.56391, lng: 147.154312, name: "Loc1" },
	{ lat: -33.718234, lng: 150.363181, name: "Loc2" },
	{ lat: -33.727111, lng: 150.371124, name: "Loc3" },
	{ lat: -33.848588, lng: 151.209834, name: "Loc4" },
	{ lat: -33.851702, lng: 151.216968, name: "Loc5" },
	{ lat: -34.671264, lng: 150.863657, name: "Loc6" },
	{ lat: -35.304724, lng: 148.662905, name: "Loc7" },
	{ lat: -36.817685, lng: 175.699196, name: "Loc8" },
	{ lat: -36.828611, lng: 175.790222, name: "Loc9" },
	{ lat: -37.75, lng: 145.116667, name: "Loc10" },
	{ lat: -37.759859, lng: 145.128708, name: "Loc11" },
	{ lat: -37.765015, lng: 145.133858, name: "Loc12" },
	{ lat: -37.770104, lng: 145.143299, name: "Loc13" },
	{ lat: -37.7737, lng: 145.145187, name: "Loc14" },
];

function App() {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
	});
	const [activeMarker, setActiveMarker] = useState<number | null>(null);
	const onLoad = useCallback((map: google.maps.Map) => {
		// Create an empty LatLngBounds object to store the bounds of all markers
		const bounds = new window.google.maps.LatLngBounds();

		// Loop through the marker positions and extend the bounds for each position
		locations1.forEach((loc) => {
			bounds.extend(loc);
		});

		// Fit the map to the calculated bounds
		map.fitBounds(bounds);
	}, []);

	return isLoaded ? (
		<GoogleMap
			center={center}
			zoom={10}
			onLoad={onLoad}
			mapContainerStyle={{ width: 500, height: 500 }}
		>
			<MarkerClusterer
				options={{ minimumClusterSize: 2, enableRetinaIcons: true }}
			>
				{(clusterer) => (
					<div>
						{locations1.map((loc, i) => (
							<MarkerF
								key={i}
								position={loc}
								clusterer={clusterer}
								onClick={() => {
									setActiveMarker(i);
								}}
							>
								{activeMarker === i && (
									<InfoWindowF
										onCloseClick={() => {
											setActiveMarker(null);
										}}
									>
										<>
											<h3>Name: {loc.name}</h3>
											<p>Lat: {loc.lat}</p>
											<p>Lng: {loc.lng}</p>
										</>
									</InfoWindowF>
								)}
							</MarkerF>
						))}
					</div>
				)}
			</MarkerClusterer>
		</GoogleMap>
	) : (
		<></>
	);
}

export default App;
