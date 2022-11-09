cp -r ./public/ ./docker/public/
cp -r ./src/ ./docker/src/
cp ./package.json ./docker/
cp ./tsconfig.json ./docker/
cp ./webpack.config.prod.js ./docker/
docker build -t jhordyess/datun ./docker
docker run -d --rm -p 80:80 jhordyess/datun
rm -r docker/public
rm -r docker/src
rm docker/package.json
rm docker/tsconfig.json
rm docker/webpack.config.prod.js