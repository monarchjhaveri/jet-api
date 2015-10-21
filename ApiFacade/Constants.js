module.exports = {
    URL: {
        ROOT: "merchant-api.jet.com",
        TOKEN: "/api/Token",
        PRODUCT: {
            LIST: "/api/merchant-skus",
            CREATE: "/api/merchant-skus/{id}",
            GET_DETAILS: "/api/merchant-skus/{id}"
        },
        TAXONOMY: {
            LIST_NODES: "/api/taxonomy/links/{version}?offset={offset}&limit={limit}",
            GET_NODE: "/api/taxonomy/nodes/{id}",
            GET_NODE_ATTRIBUTES: "/api/taxonomy/nodes/{id}/attributes"
        }
    }
};