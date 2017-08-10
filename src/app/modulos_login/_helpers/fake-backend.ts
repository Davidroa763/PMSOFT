import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User } from "../_models/user";
import { USERS} from "../_mocks/_mock-user";

    class MockError extends Response implements Error {
        name:any;
        message:any;
    }

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
console.log('Facke 1');
    backend.connections.subscribe((connection: MockConnection) => {
        console.log('Facke 2');
        setTimeout(() => {
            console.log('Facke 3');
        if (connection.request.url.endsWith('/api/authenticate/login') && connection.request.method === RequestMethod.Post) {
            let params = JSON.parse(connection.request.getBody());
                console.log(params)

            // check user credentials and return fake jwt token if valid
            let found: User = USERS.find((user: User) => {
                console.log(user)
                return (params.username === user.username);});
            if (found) {
                if(params.password === found.password) {
                    let user = found[0];
                    console.log(found.firstName)
                    connection.mockRespond(new Response(
                    new ResponseOptions({
                        status: 200, 
                        body: {
                            user: found,
                            token: 'fake-jwt-token'
                        }})
                    ));
                }else{
                    connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 2, message: 'The password does not match '})})));
                }
            } else {
            console.log('Username or password is incorrect')           
            connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 1, message: 'Username does not exists'})})));
            }
        }

        if (connection.request.url.endsWith('/api/authenticate/logout') && connection.request.method === RequestMethod.Post) {
            let params = JSON.parse(connection.request.getBody());
            connection.mockRespond(new Response(
                new ResponseOptions({status: 200, body: true})
            ));
        }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};