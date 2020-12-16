set -e

node bin/checkExisting.js
# TODO: here, get the release from GitHub
node bin/uploadNew.js
