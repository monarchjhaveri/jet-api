module.exports = {
    URL: {
        ROOT: "merchant-api.jet.com",
        TOKEN: "/api/Token",
        PRODUCT: {
            LIST: "/api/merchant-skus",
            CREATE: "/api/merchant-skus/{id}",
            GET_DETAILS: "/api/merchant-skus/{id}"
        },
        ORDER: {
            LIST_BY_STATUS: "/api/orders/{status}",
            GET_DETAILS: "/api/orders/withoutShipmentDetail/{id}"
        },
        TAXONOMY: {
            LIST_NODES: "/api/taxonomy/links/{version}?offset={offset}&limit={limit}",
            GET_NODE: "/api/taxonomy/nodes/{id}",
            GET_NODE_ATTRIBUTES: "/api/taxonomy/nodes/{id}/attributes"
        }
    },
    ORDER_STATUS: {
        COMPLETE: "complete",
        IN_PROGRESS: "inprogress",
        ACKNOWLEDGED: "acknowledged",
        READY: "ready",
        CREATED: "created"
    }
};