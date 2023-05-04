import GooglePayButton from "@google-pay/button-react";

function CreditCardWidget({ totalPrice, merchantId="01234567890123456789", merchantName="sonice" , currencyCode = "GBP", countryCode = "GB" }) {
    console.log("merchantId", merchantId);
    return (
        <div >
            <GooglePayButton
                environment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: "CARD",
                            parameters: {
                                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                allowedCardNetworks: ["MASTERCARD", "VISA"]
                            },
                            tokenizationSpecification: {
                                type: "PAYMENT_GATEWAY",
                                parameters: {
                                    gateway: "example",
                                    gatewayMerchantId: "exampleGatewayMerchantId"
                                }
                            }
                        }
                    ],
                    merchantInfo: {
                        merchantId: merchantId,
                        merchantName: merchantName
                    },
                    transactionInfo: {
                        totalPriceStatus: "FINAL",
                        totalPriceLabel: "Total",
                        totalPrice: String(totalPrice),
                        currencyCode: currencyCode,
                        countryCode: countryCode
                    },
                    shippingAddressRequired: true,
                    callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"]
                }}
                onLoadPaymentData={(paymentRequest) => {
                    console.log("Success", paymentRequest);
                }}
                onPaymentAuthorized={(paymentData) => {
                    console.log("Payment Authorised Success", paymentData);
                    return { transactionState: "SUCCESS" };
                }}
                onPaymentDataChanged={(paymentData) => {
                    console.log("On Payment Data Changed", paymentData);
                    return {};
                }}
                existingPaymentMethodRequired="false"
                buttonColor="black"
                buttonType="checkout"
            />
        </div>);
}

export default CreditCardWidget;
