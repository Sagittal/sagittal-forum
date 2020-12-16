set -e

node bin/checkExisting.js
# TODO: here, get the release from GitHub
node bin/uploadNew.js

# TODO: could also programmatically update the sagittal.pak Smileys config
