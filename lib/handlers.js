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
            'head-description' : 'The online community that seeks truth and meaning by way of Hat',
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

handlers.favicon = async (data, callback) => {
    if(data.method == 'get'){
        // Read in the favicon data
        try{
            let faviconData = await helpers.getStaticAsset('favicon.ico');
            callback(200, faviconData, 'favicon');
        } catch (error){
            callback(500);
        }
    } else {
        callback(405);
    }
};

handlers.public = async (data, callback) => {
    if(data.method == 'get'){
        // Read in the favicon data
        let trimmedAssetName = data.trimmedPath.replace('public/', '').trim();

        if(trimmedAssetName.length > 0){
            try{
                let staticAsset = await helpers.getStaticAsset(trimmedAssetName);
                // Determine the content type, default to plain text
                let contentType = 'plain';
                contentType = trimmedAssetName.endsWith('.css') ? 'css' : contentType;
                contentType = trimmedAssetName.endsWith('.png') ? 'png' : contentType;
                contentType = trimmedAssetName.endsWith('.jpg') ? 'jpg' : contentType;
                contentType = trimmedAssetName.endsWith('.ico') ? 'favicon' : contentType;
    
                callback(200, staticAsset, contentType);
            } catch (error){
                if(error.code == 'ENOENT'){
                    callback(404);
                } else {
                    callback(500);
                } 
            }
        } else {
            callback(404);
        }

    } else {
        callback(405);
    }
};

module.exports = handlers;