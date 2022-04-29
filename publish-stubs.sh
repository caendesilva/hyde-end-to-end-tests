#!/bin/sh

echo "Publishing test stubs"

echo "Files to publish:"
find stubs/ -type f ! -empty

echo "Copying files to ./hyde"
cp -R ./stubs/* ./hyde/

echo "Verifying Hyde files:"
find hyde/_* -type f ! -empty

echo "Done"