set -e

BROWSER_DOWNLOAD_URL=$(curl \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Sagittal/staff-code/releases/latest \
  | jq -r '.assets[0].browser_download_url'
)
VERSION=$(curl \
  -X GET \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Sagittal/staff-code/releases/latest \
  | jq -r '.tag_name'
)

printf "%s" "$VERSION" > "./tmp/staffCodeVersion.txt"

rm dist/StaffCodeBBCode.zip || true # If you don't, wget suffixes downloads .1, .2, etc. so nothing updates
wget -P dist "$BROWSER_DOWNLOAD_URL"
7z e dist/StaffCodeBBCode.zip -odist -y
