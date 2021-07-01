const validateKey = (req, res, next) => {
    //Where is the API key expected to be?
    let host = req.headers.origin;
    let api_key = req.query.key; //version 1 with the querystring
    //let api_key = req.params.apikey; //version 2 with the URL params
    //let api_key = req.header('x-api-key'); //version 3 using a header
    // find() returns an object or undefined
    //good match
    //check the usage
    let account = users.find(
        (user) => user.host == host && user.api_key == api_key
    );
    if (usageIndex >= 0) {
        //already used today
        if (account.usage[usageIndex].count >= MAX) {
            //stop and respond
            res.status(429).send({
                error: {
                    code: 429,
                    message: 'Max API calls exceeded.',
                },
            });
        } else {
            //have not hit todays max usage
            account.usage[usageIndex].count++;
            console.log('Good API call', account.usage[usageIndex]);
            next();
        }
    } else {
        //not today yet
        account.usage.push({
            date: today,
            count: 1
        });
        //ok to use again
        next();
    }
};