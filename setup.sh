#!/bin/sh

echo "Setting up a new Hyde testing environment..."

# Save the current directory to a variable
ROOT_DIR=$(pwd)
# Save the current timestamp to a variable
TIMESTAMP=$(date +%s)
TIME=$(date)

# Setup log file
# LOGFILE="$ROOT_DIR/temp/hyde-e2e-$TIMESTAMP.log"
LOGFILE="$ROOT_DIR/latest.log"
# Remove the log file if it exists
rm -f $LOGFILE


# Create the log function to log the supplied string
log() {
	echo "$1" | tee -a "$LOGFILE"
}

log "Root directory is: $ROOT_DIR"
log "Time is: $TIME (UNIX: $TIMESTAMP)"
log "Log file is: $LOGFILE"

# Check if the preserve option is set
if [ "$1" = "--preserve" ]; then
	log "Preserving the current Hyde installation..."
	PRESERVE=true
else
	log "Setting up a fresh Hyde installation..."
	PRESERVE=false
fi

# If preserve is false
if [ "$PRESERVE" = false ]; then
		
	if [ -d "hyde" ]; then
		log "Removing old Hyde files..."
		rm -rf hyde
	fi

	log "Cloning Hyde dev-master into ./hyde..."
	git clone https://github.com/hydephp/hyde.git

	log "Changing to hyde directory..."
	cd hyde

	log "Installing the latest Framework version..."
	composer require hyde/framework:dev-master

	# @todo cache dependencies
	log "Installing Hyde dependencies..."
	composer install

	log "Switching back to the root directory..."
	cd ../
fi

log "Changing to hyde directory..."
cd hyde

log "Verifying the installation..."
HYDE_DEBUG_OUTPUT=$(php hyde debug)

log "$HYDE_DEBUG_OUTPUT"

# Fail if the hyde installation failed
if [ "$HYDE_DEBUG_OUTPUT" == "Could not open input file: hyde" ]; then
	log "Hyde installation failed!"
	exit 1
fi
if ! echo "$HYDE_DEBUG_OUTPUT" | grep -q "HydePHP Debug Screen"; then
	log "Hyde installation failed!"
	exit 1
fi