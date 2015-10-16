#CODEFOG


## Requirements

* [NodeJs](http://nodejs.org)
* [mongodb](http://mongodb.org)
* [imagemagick](http://www.imagemagick.org/script/index.php)

## Install


$ npm install
```


If you want to use image uploads, don't forget to set env variables for the
imager config.

```sh
$ export IMAGER_S3_KEY=AWS_S3_KEY
$ export IMAGER_S3_SECRET=AWS_S3_SECRET
$ export IMAGER_S3_BUCKET=AWS_S3_BUCKET
```

then

```sh
$ npm start
```

(Note: When you do npm start, `NODE_PATH` variable is set from package.json start script. If you are doing `node server.js`, you need to make sure to set this)

Then visit [http://localhost:8080/](http://localhost:8080/)

## Tests

```sh
$ npm test
```

## License

MIT
# expedianode
