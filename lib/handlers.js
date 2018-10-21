/*
*Request handlers
*
*/

//Dependencies
const helpers = require('./helpers');
const config = require('./config');
const util = require('util');

const debug = util.debuglog('server/handlers');

let handlers = {};

/*
* HTML APP HANDLERS
*
*/
handlers.index = async (data, callback) => {
    //Accept only GET
    if(data.method == 'get'){
        console.log('entered get /');
        //Prepare the data for interpolation - head.title, head.description, body.class, body.description
        let templateData = {
            'head-title' : 'Welcome to The Church of the Well-Hatted!',
            'head-description' : 'The online community that seeks to join with the Eternal Hat',
            'body-title': 'Under construction',
            'body-class' : 'index'
        };
        //Read in the index template as a string
        try{
            let template = await helpers.getTemplate('index', templateData);
            //The interpolation funciton adds the globals automatically
            let pageData = await helpers.addUniversalTemplates(template, templateData);
            callback(200, pageData, 'html');
        } catch (error) {
            //@TODO - Add an error page?
            callback(500, undefined, 'html');
        }
    } else {
        callback(405, undefined, 'html');
    }
};