//Map that pins chosen cities

const Map = () => {
    const L = window.L;
    const map = L.map('map').setView([47.25226423917134, -122.43897440286382], 13);

    var container = L.DomUtil.get('map');
    if(container != null){
    container._leaflet_id = null;}

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

}

export default Map;