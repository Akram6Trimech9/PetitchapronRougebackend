const  fs =require('fs') ;
const ziti=require('@openziti/ziti-sdk-nodejs')
const jwt = require("jsonwebtoken");
let ziti_enroll = async (jwt_path) => {
    return new Promise((resolve, reject) => {
        let rc = ziti.ziti_enroll(jwt_path, (data) => {
            if (data.identity) {
                resolve(data);
            } else {
                reject(data);
            }
        });
    });
};

let jwt_path = process.argv[2];

console.log('Specified Enrollment JWT is (%o)' , jwt_path);

let data =   ziti_enroll(jwt_path).catch((data) => {
    console.log('Enroll failed with error (%o)', data);
});

if (data) {
    console.log("data is:\n\n%s", data);

    if (data.identity) {
        fs.writeFileSync('identity.json', data.identity);
    }
}
module.exports=ziti_enroll ;     
process.exit(0);
