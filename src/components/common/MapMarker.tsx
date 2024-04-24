type MapMarkerProps = {
    lat: number;
    lng: number;
};

export const MapMarker = (_: MapMarkerProps): JSX.Element => {
    return (
        <img
            src="/static/images/map-pin.png"
            style={{
                width: 24,
                height: 'auto'
            }}
        />
    );
};
