module.exports = {
    URL: {
        ROOT: "merchant-api.jet.com",
        TOKEN: "/api/Token",
        PRODUCT: {
            LIST: "/api/merchant-skus",
            CREATE: "/api/merchant-skus/{id}",
            GET_DETAILS: "/api/merchant-skus/{id}",
            INVENTORY: "/api/merchant-skus/{id}/inventory",
            PRICE: "/api/merchant-skus/{id}/price",
            VARIATION: "/api/merchant-skus/{id}/variation"
        },
        ORDER: {
            LIST_BY_STATUS: "/api/orders/{status}",
            GET_DETAILS: "/api/orders/withoutShipmentDetail/{id}",
            ACKNOWLEDGE: "/api/orders/{id}/acknowledge",
            SHIPPED: "/api/orders/{id}/shipped"
        },
        TAXONOMY: {
            LIST_NODES: "/api/taxonomy/links/{version}?offset={offset}&limit={limit}",
            GET_NODE: "/api/taxonomy/nodes/{id}",
            GET_NODE_ATTRIBUTES: "/api/taxonomy/nodes/{id}/attributes"
        },
        MERCHANT: {
            FULFILLMENT_NODES: "/api/fulfillmentnodesbymerchantid"
        },
        RETURN: {
            LIST_BY_STATUS: "/api/returns/{status}",
            GET_DETAILS: "/api/returns/state/{id}",
            COMPLETE: "/api/returns/{id}/complete"
        },
        REFUND: {
            LIST_BY_STATUS: "/api/refunds/{status}",
            GET_DETAILS: "/api/refunds/state/{id}",
            POST_REFUND: "/api/refunds/{order_id}/{alt_refund_id}"
        },
        FILE_UPLOAD: {
            GET_UPLOAD_TOKEN: "/api/files/uploadToken",
            FILES_UPLOADED: "/api/files/uploaded",
            FILE_UPLOAD_STATUS: "/api/files/{id}"
        }
    },
    ORDER_STATUS: {
        COMPLETE: "complete",
        IN_PROGRESS: "inprogress",
        ACKNOWLEDGED: "acknowledged",
        READY: "ready",
        CREATED: "created",
        DIRECTED_CANCEL: "directedCancel"
    },
    RETURN_STATUS: {
        JET_REFUNDED: "jetRefunded",
        COMPLETED_BY_MERCHANT: "completedByMerchant",
        REFUND_CUSTOMER_WITHOUT_RETURN: "refundCustomerWithoutReturn",
        ACKNOWLEDGED: "acknowledged",
        CREATED: "created"
    },
    REFUND_STATUS: {
        REJECTED_CUSTOMER_CARD_INVALID: "rejected - customer card not valid",
        REJECTED_CONFLICTS_WITH_RETURN_POLICY: "rejected - refund conflicts with returns policy",
        ACCEPTED: "accepted",
        PROCESSING: "processing",
        CREATED: "created"
    }
};