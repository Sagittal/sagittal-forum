set -e

node bin/checkExisting.js
# TODO: BBCODE GITHUB RELEASE, GET
node bin/uploadNew.js

# TODO: MAKE SAGITTAL-SCRIPTS-FORUM BE ALL IT CAN BE
# Could also programmatically update the sagittal.pak Smileys config
