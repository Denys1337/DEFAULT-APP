/* global jQuery, google */
const $maps = jQuery('.map-canvas');

if ($maps.length && theme.googleMapsApiKey) {
    setTimeout(function() {
        let script = document.createElement('script');
        const src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=' + theme.googleMapsApiKey;

        script.setAttribute('src', src);
        script.async = true;
        document.body.appendChild(script);
    }, 2000);

    global.initMap = () => {
        $maps.each((index, element) => {
            const $map = jQuery(element);

            const markerIcon = $map.data('icon');
            const mapZoom = $map.data('zoom');
            const map = new google.maps.Map(element, {
                zoom: mapZoom || 17,
                center: { lat: -34.397, lng: 150.644 },
                disableDefaultUI: true,
            });

            new google.maps.Marker({
                position,
                map,
                icon: markerIcon || ''
            });
        });
    };
}