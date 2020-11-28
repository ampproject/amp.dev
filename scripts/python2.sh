#!/bin/sh

# Some package managers install Python 2.7 as python2
cmds='python2 python'

for cmd in $cmds; do
  # If the command exists
  if command -v "$cmd" >>/dev/null; then
    # Run the command on the script arguments and exit
    $cmd "$@"
    exit
  fi
done

# None of the above commands were available
echo "None of the following commands are available: $cmds"
exit 1
