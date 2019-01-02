const thirdPartyMap = {
  facebook: {
    description: `<p>
          After you design and test your workspace, you can launch your Messenger bot
        </p>
        <ol>
          <li>Get your Facebook Page Access Token and insert it in the field below.</li>
          <li>Create your own Verify Token (can be any string).</li>
          <li>Click 'START' below.</li>
          <li>Use the Callback URL and Verify Token to create an event in the Facebook Messenger
            Webhook Setup.
          </li>
        </ol>`,
    icon: `/assets/icons/social/icn-facebook-messenger.png`,
    title: 'Facebook'
  },
  telegram: {
    description: `<p>When your workspace is ready, follow these instructions to connect it to your Telegram bot:</p>
        <ul>
          <li>Get a Telegram access token from BotFather and insert it in the ‘Telegram Token’ field.</li>
          <li>Click 'START' below.</li>
        </ul>`,
    icon: `/assets/icons/social/icn-telegram.svg`,
    title: 'Telegram'
  },
  websdk: {
    description: `<p>WebSDK Description goes here:</p>`,
    icon: `/assets/icons/social/icn-web-app.svg`,
    title: 'Web SDK'
  },
  line: {
    description: `<p>Build an intelligent conversational LINE bot.</p>
      <p>When your workspace is ready, follow these instructions to connect it to a LINE Channel:</p>
              <ul>
                  <li>If you don’t have a LINE@ account, <a href="https://developers.line.me/messaging-api/getting-started#create_lineat" target="_blank">create a LINE@ account with the Messaging API enabled</a>.</li>
                  <li>If you already have a LINE@ account, <a href="https://developers.line.me/messaging-api/getting-started#apply_messagingapi" target="_blank">enable Messaging API for your LINE@ account</a>.</li>
                  <li>In the <a href="http://admin-official.line.me/" target="_blank">LINE@ Manager</a>, go to Settings &gt; Bot Settings from the left side menu.</li>
                  <li>On the Bot Settings page, in the ‘Request Settings’ section, set ‘Allow’ for ‘Use webhooks’.</li>
                  <li>Go to your LINE@ account page in the <a href="https://business.line.me/" target="_blank">LINE Business Center</a>.</li>
                  <li>In the ‘Messaging API’ section, click ‘LINE Developers’ to go to the Channel Console.</li>
                  <li>Copy Channel ID and Channel Secret and paste into the respective fields below.</li>
                  <li>Click ‘ISSUE’ for the ‘Channel access token’ item and paste its value to the respective field below.</li>
                  <li>Click ‘EDIT’ and set the Webhook URL for your Channel by copying and pasting its value from the field below. Then click ‘SAVE’ and ‘VERIFY’.</li>
                  <li>Click the ‘START’ button below.</li>
              </ul>`,
    icon: `/assets/icons/social/icn-line.svg`,
    title: 'Line'
  }
}
export default thirdPartyMap
