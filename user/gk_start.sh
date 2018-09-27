#!/usr/bin/env bash

# This script will run when STARTING the project ""
# Here you might want to cd into your project directory, activate virtualenvs, etc.

# The currently active project is available via $GK_ACTIVE_PROJECT

alias start_web_server="curd=$PWD && cd $GK_ACTIVE_HOME/../grav && php -S localhost:8000 system/router.php; cd $curd"

alias update_cms="cd $GK_ACTIVE_HOME/../grav/ && bin/gpm self-upgrade; cd $curd"
alias update_plugins="cd $GK_ACTIVE_HOME/../grav/ && bin/gpm update; cd $curd"

alias gpm="cd $GK_ACTIVE_HOME/../grav && bin/gpm; cd $curd"

# Directories
alias cdt="cd $GK_ACTIVE_HOME/themes/"
alias cdp="cd $GK_ACTIVE_HOME/pages/"
alias cdpl="cd $GK_ACTIVE_HOME/plugins/"
alias cddt="cd $GK_ACTIVE_HOME/data/"
alias cdc="cd $GK_ACTIVE_HOME/config/" 
