# Script to install the project after a git clone

# Download latest grav
repoName=${PWD##*/}

# Downlaod lastest Grav
wget -O grav.zip https://getgrav.org/download/core/grav/latest

# Unzip Grav
unzip grav.zip
rm -rf grav.zip

# Remove user directory frmo grav install
rm -r grav/user

# Move Grav next to the current directory
mv grav ../

# Move to grav directory and create symlink
cd ../grav
ln -s ../$repoName user
# CD back to repo
cd ../$repoName
