#Authentication Actions

####Authenticating:

    var API_USER = "your api user key here.";
    var API_SECRET = "your api secret key here.";

    var JetApi = require("jet-api");

    var JetConnection;
    JetApi.connect(API_USER, API_SECRET).then(function(connection){ JetConnection = connection; });

#Product Actions

####Creating a product
    var product = {
        "product_title": "My Product",
        "standard_product_codes" : [
            {
                "standard_product_code": "123456789012",
                "standard_product_code_type": "UPC"
            }
        ],
        "multipack_quantity": 1
    };

    var sku = "fedcba9876543210";

    JetConnection.Products.createProduct(product, sku).then(function(){
        /* Will not contain any return object on success. */
    });

####Listing product sku's:

    var skuList;
    JetConnection.Products.listProductSkus().then(function(theSkuList){ skuList = theSkuList; });

####Getting detailed product DTO's:

This has to be called once for each SKU that we need details for.

        var skuList;
        var dtoList;
        JetConnection.Products.listProductSkus().then(function(theSkuList){
            skuList = theSkuList;
            JetConnection.Products.getDetails(skuList).then(function(theDtoList) {
                dtoList = theDtoList;
            });
        });


####Integration Test Setup:

Create a .env file in the root directory. The contents should be as follows. You can get the `TEST_API_USER` and `TEST_API_SECRET`
values from www.partner.jet.com:

    TEST_API_USER=your_api_user_key
    TEST_API_SECRET=your_api_secret