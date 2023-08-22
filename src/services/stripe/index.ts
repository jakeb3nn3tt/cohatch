// import stripeInit from 'stripe';

// const stripe = stripeInit(
//   'sk_test_51NhcqkBf6uI5vbOW9S1kT3RrMZC9tMcMyMFnhEUvK5TSRosmAyk1kl41oBja8ccq7rd3vG3MVaEl5Ks55JeKRGQh00oLLM2AjK',
// );

export const getClientSecret = async () => {
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: 1099,
  //   currency: 'brl',
  //   payment_method_types: ['card'],
  // });
  // return paymentIntent.client_secret;
  return '123';
};
