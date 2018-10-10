# flatAsync 
`flatAsync` a simple wrapper to use Async/Await calls without try/catch blocks. 
Flat style pattern to handle errors.

## Install
`npm i flatasync --save`

## Use
### ES6/7
`import flatAsync from 'flatasync'`

### NodeJs
`const flatAsync = require('flatasync');`

## Example
```
import flatAsync from 'flatasync'

const [err, response] = await flatAsync(AsyncCall(...));
if(err) return console.error(err);
if (!response) return console.console('Not Found');

// use response here
```

### Before
You must use try/catch in Javascript's `await` calls to handle errors from promise.

```js
try {
  const user = await ajaxAPICall('/users/1');
  if(!user) return cb(null, 'User not found');
} catch(e) {
  return cb(e, 'Unexpected error occurred');
}
// another call based on user's data
try {
  const post = await ajaxAPICall(`/posts/${user.postId}`);
  if(!post) return cb(null, 'Post not found for user ${user.name}');
  else return return cb(null, post);
} catch(e) {
  return cb(e, 'Unexpected error occurred');
}
```

### After
`flatAsync` wraps your await Promise or Method and returns errors/results in array `[err, results]`.

```js
import flatAsync from 'flatasync';
...

let user, post, err;

[err, user] = await flatAsync(AjaxCall('/user/1'));
if(err || !user) return cb(err, 'User not found');

[err, post] = await flatAsync(AjaxCall(`/posts/${user.postId}`));
if(err || !post) return cb(err, 'Post not found');

return cb(null, post);

```

