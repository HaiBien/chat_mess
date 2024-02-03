require('dotenv').config();
const request = require('request');
const axios = require('axios');


let getHomePage = (req, res) => {
  return res.render("homepage.ejs")
};

let getWebhook = (req, res) => {
  console.log('getWebhook')
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN
  // Parse the query params
  let data = req.query
  console.log('datadatadatadata', data)
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

let postWebhook = (req, res) => {
  console.log('postWebhook')
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log('webhook_event', webhook_event);
      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      let page_id = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      console.log('recipient:', webhook_event)
      console.log('Trà sữa Wigo: 220566801136562')
      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};



// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {
    response = {
      "text": `You sent the message: "${received_message.text}"!`
    }
  }
  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  console.log('sender_psid:', sender_psid)
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v18.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}




let getPageList = async (req, res) => {
  try {
    const { token } = req.query
    const response = await axios.get(`https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`);
    const fanpages = response.data;
    res.status(200).json(fanpages)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể lấy danh sách Fanpage.' });
  }
}

module.exports = {
  getHomePage: getHomePage,
  postWebhook: postWebhook,
  getWebhook: getWebhook,
  getPageList: getPageList,
}