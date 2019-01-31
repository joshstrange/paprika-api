# paprika-api

You can use Typescript or just javascript to import the library.

Typescript:

````typescript
import {PaprikaApi} from 'paprika-api';
````

Javascript:

````javascript 1.8
let PaprikaApi = require('paprika-api').PaprikaApi;
````

## Initialize

Use your email and password you use for [Paprika Sync](https://paprikaapp.com/account/forgot_password/)


````typescript
let paprikaApi = new PaprikaApi('email@example.com', 'myPassword');
````

## Use

````typescript
paprikaApi.recipes().then((recipes) => {
    paprikaApi.recipe(recipes[0].uid).then((recipe) => {
        console.log(recipe);
    });
});
````

You can see all of the endpoints and examples of what they return in [lib/index.ts](https://github.com/joshstrange/paprika-api/blob/master/lib/index.ts)
