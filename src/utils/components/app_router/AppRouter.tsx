import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Route from './RouteWithSubRoutes';
import { IAppRouter } from './custom_types';

const AppRouter: React.FC<IAppRouter> = ({
    test,
    routes,
    defaultRedirect,
    privateRedirect,
    lazy,
    template,
    user,
    show,
}) => {
    return (
        <BrowserRouter>
            <Switch>
                {!show && <Redirect to="/login/" />}
                {routes.map((route, i) => {
                    if (route.routes) route.exact = false;
                    return (
                        <Route
                            key={`route_global_${i}`}
                            defaultRedirect={defaultRedirect}
                            privateRedirect={privateRedirect}
                            lazy={lazy}
                            template={template}
                            user={user}
                            test={test}
                            {...route}
                        />
                    );
                })}
            </Switch>
        </BrowserRouter>
    );
};

AppRouter.defaultProps = {
    defaultRedirect: '/',
    privateRedirect: '/login/',
    lazy: false,
    test: false,
    show: true,
};

export default AppRouter;
