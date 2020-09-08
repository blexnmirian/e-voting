const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../model/Vote')

var pusher = new Pusher({
  appId: '1068353',
  key: '661e8e1a18279265ceab',
  secret: '809f82e347fd915032ab',
  cluster: 'mt1',
});

router.get('/', (req, res) => {
 Vote.find()
 .then(votes => res.json({
   success: true,
   votes
 }))
});

router.post('/', (req, res)=>{
  const newVote = {
    os: req.body.os,
    points: 1
  };
  new Vote(newVote).save()
  .then((vote) => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });
    
    return res.json({success: true, message: 'Thank you for voting'});
  }).catch((err) => {
    console.log(err)
  });
 
 
});

module.exports = router;