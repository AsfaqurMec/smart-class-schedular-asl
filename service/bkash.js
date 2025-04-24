
// import axios from "axios"
// import { v4 as uuidv4 } from "uuid";
// import { findBkashToken, saveBkashToken } from "../models/bkashToken";


// export async function createPayment(bkashConfig, paymentDetails) {
//     try {
//         const { amount, callbackURL, orderID, reference } = paymentDetails
//         if (!amount) {
//             return {
//                 statusCode: 2065,
//                 statusMessage: 'amount required'
//             }
//         } else {
//             if (amount < 1) {
//                 return {
//                     statusCode: 2065,
//                     statusMessage: 'minimum amount 1'
//                 }
//             }
//         }

//         if (!callbackURL) {
//             return {
//                 statusCode: 2065,
//                 statusMessage: 'callbackURL required'
//             }
//         }

//         const response = await axios.post(
//             `${bkashConfig?.base_url}/tokenized/checkout/create`,
//             {
//                 mode: "0011",
//                 currency: "BDT",
//                 intent: "sale",
//                 amount,
//                 callbackURL,
//                 payerReference: reference || "1",
//                 merchantInvoiceNumber: orderID || "Inv_" + uuidv4().substring(0, 6)
//             },
//             {
//                 headers: await authHeaders(bkashConfig),
//             }
//         )

//         return response?.data
//     } catch (e) {
//         console.error("Create Bkash Payment Error:", e);
//         return e
//     }
// }

// export async function executePayment(bkashConfig, paymentID) {
//     try {
//         const response = await axios.post(`${bkashConfig?.base_url}/tokenized/checkout/execute`,
//             {
//                 paymentID,
//             },
//             {
//                 headers: await authHeaders(bkashConfig),
//             }
//         )

//         return response?.data
//     } catch (error) {
//         console.log("Error from bkash exectePayment: ", error)
//         return null
//     }
// }

// const authHeaders = async (bkashConfig) => {
//     return {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         authorization: await grantToken(bkashConfig),
//         "x-app-key": bkashConfig?.app_key,
//     }
// }

// const grantToken = async (bkashConfig) => {
//     try {
//         const findToken = await findBkashToken();

//         if (!findToken || findToken.updatedAt < new Date(Date.now() - 3600000)) { // 1 hour
//             return await setToken(bkashConfig)
//         }

//         return findToken.auth_token
//     } catch (e) {
//         console.log(e)
//         return null
//     }
// }

// const setToken = async (bkashConfig) => {
//     const response = await axios.post(
//         `${bkashConfig?.base_url}/tokenized/checkout/token/grant`,
//         tokenParameters(bkashConfig),
//         {
//             headers: tokenHeaders(bkashConfig),
//         }
//     )
//     if (response?.data?.id_token) {
//         const findToken = await findBkashToken();
//         if (findToken) {
//             findToken.auth_token = response?.data?.id_token
//             await findToken.save()
//         } else {
//             await saveBkashToken(
//                 {
//                     auth_token: response?.data?.id_token
//                 }
//             )
//         }
//     }
//     return response?.data?.id_token
// }

// const tokenParameters = (bkashConfig) => {
//     return {
//         app_key: bkashConfig?.app_key,
//         app_secret: bkashConfig?.app_secret,
//     }
// }

// const tokenHeaders = (bkashConfig) => {
//     return {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         username: bkashConfig?.username,
//         password: bkashConfig?.password,
//     }
// }
