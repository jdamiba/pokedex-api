#!/bin/bash

# Navigate to the images directory
cd "$(dirname "$0")/images" || exit

# Loop through all PNG files
for file in *.png; do
    # Skip if no PNG files are found
    [ -e "$file" ] || continue
    
    # Remove leading zeros from the filename
    newname=$(echo "$file" | sed -E 's/^0+([1-9])/\1/')
    
    # Rename the file if the name has changed
    if [ "$file" != "$newname" ]; then
        mv "$file" "$newname"
        echo "Renamed $file to $newname"
    fi
done

echo "Renaming complete!"