/**
 * The Router
 */

import Navigo from 'navigo';
import {
    env
} from 'process';

const Router = {
    router: null,
    getRouter() {
        if (!this.router) {
            let rootUrl;
            rootUrl = '/'
            if (env === 'prod') {
                rootUrl = `${window.location.protocol}//${window.location.host}`;
            }
            this.router = new Navigo('/', false);
        }
        return this.router;
    },
};

export default Router;