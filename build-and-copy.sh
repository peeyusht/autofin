cd /Volumes/MacOSX/Data/Development/autofin_latest/autofin

echo *Removing previous build....
rm ../output/autofin.tar.gz

echo *Building output file....
meteor build ../output/

echo *Copying new build to CRM Server...You will have to enter password for CRM Server user.....
scp ../output/autofin.tar.gz root@101.53.130.179:~

