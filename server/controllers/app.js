'use strict';

module.exports = {
    index: {
        handler: (req, reply) => {
            reply.view('index');
        }
    },
    assets: {
        handler: {
            directory: {
                path: './client/'
            }
        }
    }
};
