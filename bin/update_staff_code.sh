set -e

BROWSER_DOWNLOAD_URL=$(curl  \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Sagittal/staff-code/releases/latest \
  | jq -r '.assets[0].browser_download_url'
)
echo "$BROWSER_DOWNLOAD_URL"

wget -P dist "$BROWSER_DOWNLOAD_URL"
7z e dist/StaffCodeBBCode.zip -odist -y

node bin/checkExisting.js
node bin/uploadNew.js
