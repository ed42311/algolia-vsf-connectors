const canEnterPersonalDetails = cart =>
  !cart.customerId && cart.lineItems.length > 0;

const canEnterShipping = cart => cart.customerEmail || cart.customerId;

const canEnterPayment = cart => cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => Boolean(cart.billingAddress);

export default async ({ app }) => {
  const currentPath = app.context.route.fullPath.split("/checkout/")[1];

  if (!currentPath) return;

  // TODO: Get active cart
  const activeCart = null;

  if (!activeCart) return;

  switch (currentPath) {
    case "personal-details":
      if (!canEnterPersonalDetails(activeCart)) {
        app.context.redirect("/checkout/shipping");
      }
      break;
    case "shipping":
      if (!canEnterShipping(activeCart)) {
        app.context.redirect("/");
      }
      break;
    case "payment":
      if (!canEnterPayment(activeCart)) {
        app.context.redirect("/");
      }
      break;
    case "order-review":
      if (!canEnterReview(activeCart)) {
        app.context.redirect("/");
      }
      break;
  }
};
