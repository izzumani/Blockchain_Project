#! /bin/bash

#Add Dotdeb to apt sources
printf "deb http://packages.dotdeb.org squeeze all\ndeb-src http://packages.dotdeb.org squeeze all" > /etc/apt/sources.list.d/dotdeb.org.list

#Auth the Dotdeb repo with public key
wget -q -O - http://www.dotdeb.org/dotdeb.gpg | apt-key add -

#Update the Apt package cache
apt-get update

#Install Redis
apt-get install redis-server

#Setup Redis config
rm /etc/redis/redis.conf
wget -q -O /etc/redis/redis.conf http://bit.ly/redisconfig

#Set this up as a slave of the passed in redis server
if [ "$1" = "slaveof" ]
then
  echo "Setting redis as slave of $2:$3..."
  sed -i -e "s/#slaveof 127.0.0.1 6379/$1 $2 $3/g" /etc/redis/redis.conf
fi

#Set this up on a specific ip and port passed into the script
if [ "$1" = "listenon" ]
then
  echo "Setting redis to listen on $2:$3..."
  sed -i -e "s/port 6379/port $3/g" /etc/redis/redis.conf
  sed -i -e "s/bind 127.0.0.1/bind $2/g" /etc/redis/redis.conf
fi

#Restart redis server with new config
/etc/init.d/redis-server restart

#Setup firewall for ssh and redis. Thanks @DataChomp :)
sudo ufw allow 22
sudo ufw allow 6379
sudo ufw enable