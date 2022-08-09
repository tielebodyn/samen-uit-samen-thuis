/**
 * The Router
 */

import Navigo from 'navigo';
import { ENV } from './core/consts';

const Router = {
    router: null,
    getRouter() {
        if (!this.router) {
            let rootUrl;
            rootUrl = '/'
            if (ENV === 'prod') {
                rootUrl = `${window.location.protocol}//${window.location.host}`;
            }
            this.router = new Navigo('/', false);
        }
        return this.router;
    },
};

export default Router;