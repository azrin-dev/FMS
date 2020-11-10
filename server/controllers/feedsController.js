const express = require('express');
const axios = require('axios');

exports.youtubeTrending = async(req, res) => {

   const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&part=player%2C%20status&chart=mostPopular&maxResults=10&regionCode=MY&key=${process.env.YOUTUBE_API_KEY}`;
   const options = {
       Authorization: `Bearer ${process.env.YOUTUBE_API_KEY}`,
       Accept: 'application/json'
   };

   const list = await axios.get(url, options);
   if(list){       
      var datas = list.data.items;
      var date = list.headers.date;
      res.json({datas, date});
   } 
   
   
}