const Ajv=require("ajv");
const schema={
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "minLength":4,
            "maxLength":30,
        },
        "slug":{
            "type":"string",

        }
    },
    "maxProperties":1,
    "required":["name"]
};

const ajv=new Ajv();
module.exports=ajv.compile(schema)