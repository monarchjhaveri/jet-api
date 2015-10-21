#Introduction

This project contains an API Client for Jet.com's API. You can include it in another project by using npm.

#Installation

Step 1: Install Node v4.1.2 from https://nodejs.org/en/

Step 2: Install NPM if it hasn't already been installed. https://www.npmjs.com/

Step 3: Run `npm install` from the root directory of this project.

P.S.: You can include a local repository in your package.json [ like this. ][1]

#Integration Test Setup:

Currently, the best way to test the library is by debugging while running `npm run integration-test`

Create a .env file in the root directory of this project. The file has been gitignored already. The contents should be
as follows:

    TEST_API_USER=your_api_user_key
    TEST_API_SECRET=your_api_secret

You can get the `TEST_API_USER` and `TEST_API_SECRET` values from www.partner.jet.com.

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


[1]: http://stackoverflow.com/questions/14381898/local-dependency-in-package-json