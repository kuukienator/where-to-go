import {
    Client,
    PlaceInputType,
    LatLng,
} from '@googlemaps/google-maps-services-js';
import { PlacesNearbyRanking } from '@googlemaps/google-maps-services-js/dist/places/placesnearby';
import { hardCodedPlaces } from '../../data/places';

const API_KEY = process.env.GOOGLE_MAPS_TOKEN;

const getLocationFromAddress = async (client: Client, address: string) => {
    const location = await client.geocode({
        params: {
            key: API_KEY,
            address,
        },
    });

    return location.data.results[0].geometry.location;
};

const getPlaceDetails = async (client: Client, placeId) => {
    const place = await client.placeDetails({
        params: {
            key: API_KEY,
            place_id: placeId,
            fields: [],
        },
    });
};

const getImageUrl = async (client: Client, entry) => {
    const imageRef = entry.photos[0].photo_reference;
    const image = await client.placePhoto({
        params: {
            key: API_KEY,
            photoreference: imageRef,
            maxwidth: 400,
        },
        responseType: 'arraybuffer',
    });

    return image.request.res.responseUrl;
};

const getLocation = async (client: Client, query): Promise<LatLng> => {
    if (query.lat && query.long) {
        return {
            lat: Number(query.lat),
            lng: Number(query.long),
        };
    } else {
        return await getLocationFromAddress(client, query.adress);
    }
};

export default async (req, res) => {
    /*
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ places: hardCodedPlaces }));

    return;
    */
    const client = new Client({});

    const request = {
        key: API_KEY,
        radius: Number(req.query.radius),
        type: req.query.type || '',
        opennow: true,
        maxprice: Number(req.query.maxPrice),
        minprice: Number(req.query.minPrice),
        // keyword: req.query.keyword || '',
        rankby: PlacesNearbyRanking.prominence,
        location: await getLocation(client, req.query),
    };

    console.log('request', request);
    const places = await client.placesNearby({
        params: request,
    });

    const placesWithImages = await Promise.all(
        places.data.results.map(async (r) => {
            if (Array.isArray(r.photos)) {
                return {
                    ...r,
                    image: await getImageUrl(client, r),
                };
            } else {
                return {
                    ...r,
                    image: null,
                };
            }
        })
    );

    console.log('placesWithImages', placesWithImages.length);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ places: placesWithImages }));
};
