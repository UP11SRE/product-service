const { getChannel } = require('../config/rabbitmq');
const productService = require('./service/productService');

(async () => {
  const channel = getChannel();
  channel.consume('orderQueue', async (message) => {
    if (message !== null) {
      const content = JSON.parse(message.content.toString());
      console.log(`Received message: ${JSON.stringify(content)}`);
      await handleMessage(content);
      channel.ack(message);
    }
  });
})();

async function handleMessage(content) {
  try {
    const { action, data } = content;
    
    switch (action) {
      case 'productStatus':
        await productService.productQuantityUpdate(data);
        break;
      case 'orderCancelation':
        await productService.orderCancelation(data);
        break;
      default:
        console.error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error(`Error processing message: ${error.message}`);
  }
}
