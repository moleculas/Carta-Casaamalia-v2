let rutaApi, rutaServer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    rutaApi = "http://localhost/api_casaamalia_v2/";
    rutaServer = "http://localhost/api_casaamalia_v2/";
} else {
    const preRutaServer = window.location.protocol + "//" + window.location.host + "/test/gestio";
    rutaApi = preRutaServer + "/api/";
    rutaServer = preRutaServer + "/api/";
};

const subdirectoriProduccio = '/test/gestio';
//afegir a package.json: "homepage": "https://carta.casaamalia.com/gestio",

const Constantes = {
    SUBDIRECTORI_PRODUCCIO: subdirectoriProduccio,
    RUTA_SERVER: rutaServer,
    RUTA_API: rutaApi,
    ALERGENS: [
        'No',
        'Cereals que contenen gluten',
        'Crustacis i productes amb crustacis',
        'Ous i productes derivats',
        'Peix i productes amb peix',
        'Cacauets i derivats',
        'Soja i productes amb soja',
        'Llet i derivats, inclosa la lactosa',
        'Fruits secs i derivats',
        'Api i derivats',
        'Mostassa i derivats',
        'Grans de sèsam i productes que el contenen',
        'Diòxid de sofre i sulfits',
        'Mol·luscs i derivats',
        'Tramussos i derivats'
    ],
    TIPUS_CARTA: [
        'nadal',
        'normal'
    ],
    PUNTUACIO: [
        {
            value: '0',
            label: 'No',
        },
        {
            value: '90',
            label: '90 punts',
        },
        {
            value: '91',
            label: '91 punts',
        },
        {
            value: '92',
            label: '92 punts',
        },
        {
            value: '93',
            label: '93 punts',
        },
        {
            value: '94',
            label: '94 punts',
        },
        {
            value: '94_2',
            label: '94+ punts',
        },
        {
            value: '95',
            label: '95 punts',
        },
        {
            value: '96',
            label: '96 punts',
        },
        {
            value: '97',
            label: '97 punts',
        }
    ]
};
export default Constantes;