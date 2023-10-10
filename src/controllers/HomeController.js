require('dotenv').config();


let getHomePage = (req, res) => {
  return res.render("homepage.ejs")
};
let postWebhook = (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {

      let webhook_event = entry.messaging[0];
      console.log(webhook_event)

      let sender_psid = webhook_event.sender.id;
      console.log('sender_psid', sender_psid)

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }

    });
    res.status(200).send("EVENT_RECEIVED")
  } else {
    res.sendStatus(404)
  }
};

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("webhook verify");
      res.status(200).send(challenge)
    } else {
      res.sendStatus(403)
    }
  }
};

function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {
    response = {
      "text": `You send the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url
    response = {
      "attachment": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Is this the right picture?",
          "subtitle": "Tap a button to answer.",
          "image_url": attachment_url,
          "buttons": [
            {
              "type": "postback",
              "title": 'Yes!',
              "payload": "Yes!"
            },
            {
              "type": "postback",
              "title": 'No!',
              "payload": "No!"
            }
          ],
        }]
      }
    }
  }
  callSendAPI(sender_psid, response)
}

function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  callSendAPI(sender_psid, response)
}

function callSendAPI(sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "methot": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log("message sent!")
    } else {
      console.error("Unable to send message" + err)
    }
  })
}

module.exports = {
  getHomePage: getHomePage,
  postWebhook: postWebhook,
  getWebhook: getWebhook,

}