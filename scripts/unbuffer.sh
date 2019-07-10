#!/bin/sh

# See: https://superuser.com/questions/742121/unbuffer-swallows-the-exit-status-of-killed-process/805309#805309

# -*- tcl -*-
# The next line is executed by /bin/sh, but not tcl \
exec tclsh "$0" ${1+"$@"}

package require Expect


# -*- tcl -*-
# Description: unbuffer stdout of a program
# Author: Don Libes, NIST

if {[string compare [lindex $argv 0] "-p"] == 0} {
    # pipeline
    set stty_init "-echo"
    eval [list spawn -noecho] [lrange $argv 1 end]
    close_on_eof -i $user_spawn_id 0
    interact {
	eof {
	    # flush remaining output from child
	    expect -timeout 1 -re .+
	    return
	}
    }
} else {
    set stty_init "-opost"
    set timeout -1
    eval [list spawn -noecho] $argv
    expect
    set result [wait]
    if { [llength $result] == 4 } {
        exit [lindex $result 3]
    } else {
        exit 1
    }
}
