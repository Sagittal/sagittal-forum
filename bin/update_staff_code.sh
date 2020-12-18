set -e

BROWSER_DOWNLOAD_URL=$(curl  \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Sagittal/staff-code/releases/latest \
  | jq -r '.assets[0].browser_download_url'
)
echo "$BROWSER_DOWNLOAD_URL"

rm dist/StaffCodeBBCode.tar.gz || true
wget -P dist "$BROWSER_DOWNLOAD_URL"
tar -xvzf dist/StaffCodeBBCode.tar.gz -C dist

node bin/checkExisting.js
node bin/uploadNew.js
