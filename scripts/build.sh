ROOT_DIR="$PWD"

mkdir -p "$ROOT_DIR/dist"
cp "$ROOT_DIR/index.js" "$ROOT_DIR/dist"
cp "$ROOT_DIR/package.json" "$ROOT_DIR/dist"
mkdir -p "$ROOT_DIR/dist/rules"
cp $ROOT_DIR/rules/*.js "$ROOT_DIR/dist/rules"