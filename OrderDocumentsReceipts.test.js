import { TEMPUS_ENABLE_FLAG } from "../../../pages/Checkout/constants";

export const OrderDocumentsReceiptsMock = {
    documentReceiptsItems: [
        {
            name: "Gift receipt",
            btn1: "Email",
            btn2: "Print",
            id: "giftReceipt",
            show: "giftReceipt"
        },
        {
            name: "Customer agreement ",
            btn1: "Email",
            btn2: "Print",
            id: "customerAgreement",
            show: "customerAgreement"
        },
        {
            name: "Device payment agreement ",
            btn1: "Email",
            btn2: "Print",
            id: "devicePaymentAgreement",
            show: "devicePaymentAgreement"
        },
        {
            name: "EdgeUp Buyout Payment Receipt",
            btn1: "View Receipt",
            btn2: "print",
            id: "buyOutPaymentReceipt",
            show: "buyOutPaymentReceipt"
        },
        {
            name: "Purchase receipt",
            btn1: "Email",
            btn2: "Print",
            btn3: "SMS",
            id: "purchaseReceipt",
            show: "purchaseReceipt"
        },
        {
            name: "Trade-In receipt",
            btn1: "",
            btn2: "Print",
            id: "tradeInReceipt",
            show: "tradeInReceipt"
        },
        {
            name: "Ring agreement",
            btn1: "Email",
            btn2: "Print",
            id: "isRingAgreement",
            show: "isRingAgreement"
        },
        {
            name: "QR code",
            btn1: "Email",
            btn2: "Print",
            btn3: "View",
            id: "isQRCode",
            show: "isQRCode"
        },
        {
            name: "Return Label",
            btn1: "View",
            id: "IsReturnLabel",
            show: "IsReturnLabel"
        },
        {
            name: "Phone/Smart Watch trade in shipping label",
            btn1: "Email",
            btn2: "Print",
            id: "upsShippingLabel",
            show: "upsShippingLabel"
        },
        {
            name: "Tablet trade in shipping label",
            btn1: "Email",
            btn2: "Print",
            id: "tabletUpsShippingLabel",
            show: "tabletUpsShippingLabel"
        }
    ],
    viewreceiptpdcContent: {
        viewReceipt: "yes",
        viewReceiptArr: [{
            categoryName: "OrderConfirmation"
        }]
    },
    readOrderViewAndPrintReceipt: {
        "documentsInfo": [
            {
                "documentId": "bG9jYXRpb25Db2RlOjAwMjY5MDF+b3JkZXJOdW06MjE0NDc1MH5vcmRlclR5cGU6SVN+b3JkZXJEYXRlOjEyLzEzLzIwMTJ+cmVjZWlwdFR5cGU6QUF+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDIyMzQwNTgyNi0xfm1vYmlsZU51bWJlcjoyMTQ5ODQwNzAxfmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                "documentName": "tradeInReceipt",
                "receiptType": "AA",
                "orderNumber": "2144750",
                "mtn": "2149840701"
            }]
    },
    listMtnAndAgreementId: [{
        id: "1"
    }],
    tradeInDetail: [{ "trackingNo": "1Z90A26F9000395975", "deviceCategory": "Smart Phone" }, { "trackingNo": "1Z90A26F9000395975", "deviceCategory": "tablet" }],
    OrderConfirmation: {
        "viewReceiptContentPDF": { "cateorgry": "device" },
        "showROViewPrintReceipt": "receipt",
        listMtnAndAgreement: [123, 456],
        OrderConfirmationData: {
            "data": {
                "getConfirmationPage": {
                    "managerApprovalReqInfo": true,
                    "cartId": "1c3b635c-621f-42f7-a016-4edd3d8d3640",
                    "myVerizonInd": false,
                    "paymentReceipt": true,
                    "giftReceipt": true,
                    "devicePaymentAgreement": false,
                    "customerAgreement": true,
                    "orderConfirmation": false,
                    "purchaseReceipt": true,
                    "tradeInReceipt": true,
                    "nextbillSummary": true,
                    "isStandAloneTradein": false,
                    "updateEmailInd": true,
                    "paperFreeEnrollmentInd": true,
                    "isTechInstall": false,
                    "techCoachSMSInd": false,
                    "multiDeviceVerizonProtectionSelected": null,
                    "isVerizonProtectionSelected": null,
                    "tradeInInd": false,
                    "isShowComboOrder": false,
                    "tradeInType": null,
                    "contentTransferUpgradeType": "null",
                    "orderStatus": "CO",
                    "orderNumber": "2144750",
                    "locationCode": "0026901",
                    "emailAddress": "SVZGSVINLLIV8014@VZW.COM",
                    "accountNumber": "0223405826-1",
                    "installationDate": null,
                    "channelID": "OMNI-INDIRECT",
                    "contentTransfer": false,
                    "preOrBackOrder": false,
                    "confirmationNumber": "",
                    "submissionId": "",
                    "orderActivityType": "CLNR",
                    "giftCartBalanceAmount": "0.0",
                    "showGiftCardBalance": false,
                    "generateUpsShipmentLabel": [
                        {
                            "autoPrintShipmentLabel": false
                        }
                    ],
                    "documentsInfo": [
                        {
                            "documentId": "bG9jYXRpb25Db2RlOjAwMjY5MDF+b3JkZXJOdW06MjE0NDc1MH5vcmRlclR5cGU6SVN+b3JkZXJEYXRlOjEyLzEzLzIwMTJ+cmVjZWlwdFR5cGU6QUF+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDIyMzQwNTgyNi0xfm1vYmlsZU51bWJlcjoyMTQ5ODQwNzAxfmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                            "documentName": "tradeInReceipt",
                            "receiptType": "AA",
                            "orderNumber": "2144750",
                            "mtn": "2149840701"
                        },
                        {
                            "documentId": "45HYSDSDCL65DI378347ADFDKIND1",
                            "documentName": "customerAgreement",
                            "receiptType": "CT"
                        },
                        {}
                    ],
                    "loanInfo": [
                        null
                    ],
                    "is5GProfessionalInstall": false,
                    "installAppSelectedDate": {},
                    "assistedContentTransfer": null,
                    "managerApprovalReqInfo": true,
                    "ispuServices": "",
                    "storeinfo": [
                        {
                            "businessName": null,
                            "retailId": null,
                            "netaceLocationCode": null,
                            "storeStatus": null,
                            "storeName": "North Plainfield",
                            "phoneNumber": null,
                            "address1": null,
                            "city": "WARREN",
                            "state": "NJ",
                            "zipCode": "07059",
                            "fipsCode": null,
                            "hoursMon": null,
                            "hoursTue": null,
                            "hoursWed": null,
                            "hoursThu": null,
                            "hoursFri": null,
                            "hoursSat": null,
                            "hoursSun": null,
                            "ispuServices": null,
                            "vendor": "UBREAK",
                            "storePhoneNumber": "9082932108",
                            "addressLine2": null,
                            "streetName": "30 INDEPENDENCE"
                        }
                    ],
                    "isRingAgreement": true,
                    "isQRCode": false,
                    "qRCodeOption": [{ "mtn": "2149840701", "qrCodeType": "PixelQrCodeEnabled" },
                    { "mtn": "4569840701", "qrCodeType": " eSimUpgradeQrCodeEnabled" }],
                    "displayActivationStatus": false,
                    "tradeInOrderNumber": "",
                    "fiosAvailabilityCheckUrl": null,
                    "displayFiosContent": false,
                    "isActivateNow": false,
                    "activateNow": [],
                    "returnLabelTns": [
                        {
                            "mtn": "2149840701"
                        }
                    ],
                    "isPreBackOrderReceipt": false,
                    "d2dFlag": null,
                    "isAutoMessageSent": true,
                    "isGiftPurchase": false,
                    "buyOutPaymentReceipt": false,
                    "isEdgeUp": false,
                    "returnLabels": [],
                    "paymentReceipts": [],
                    "displayPaymentBanner": false,
                    "refundOrderDetails": {
                        "locationCode": null,
                        "orderNum": 0,
                        "creditApplicationNum": 0
                    },
                    "refundCartItems": {
                        "cartItem": [
                            {
                                "manufacturer": null,
                                "sorDeviceCategory": "4G Smartphone",
                                "totalPriceWithDiscount": 0.0,
                                "skuId": "sku2880249",
                                "productId": "dev8520011",
                                "itemCode": "CLNRSAMN950WKIT",
                                "sorId": "CLNRSAMN950WKIT",
                                "cartItemType": "DEVICE",
                                "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                "bundleAccessorySku": null,
                                "bundleProductId": null,
                                "mobileNumber": "2149840701",
                                "minNumber": null,
                                "accountNumber": null,
                                "accountSubNumber": null,
                                "billingSystem": null,
                                "deviceId": "35807108052081",
                                "qty": 1,
                                "simId": null,
                                "itemPrice": null,
                                "buyOutTaxAmountUnbilled": 0.0,
                                "buyOutAmountWithoutTax": 0.0,
                                "smartIMEI": false,
                                "isCustomerProvidedSIM": false,
                                "taxAmount": 0.0,
                                "localTax": null,
                                "stateTax": null,
                                "groupDiscInd": null,
                                "isDropshipItem": null,
                                "dropshipProviderDesc": null,
                                "prodCode1": "LTE",
                                "prodCode2": "SMT",
                                "prodCode3": "DIG",
                                "prodCode4": "CLK",
                                "prodCode5": "FRU",
                                "priceType": null,
                                "taxBasedPriceFlag": null,
                                "mtnOOWReasonCode": null,
                                "ssnOOWReasonCode": null,
                                "bundleSeqNum": 0,
                                "approvingMgrId": null,
                                "mgrIdForDisc": null,
                                "mgrIdForUpgr": null,
                                "rebateEligibilityInd": null,
                                "itemSeqNum": 0,
                                "btaEligible": "false",
                                "newInUnOpenedBox": null,
                                "dipIndicator": null,
                                "upgradeReasonCode": null,
                                "dropShipVendorToken": null,
                                "catalogPrice": null,
                                "depletionType": "F",
                                "unitTaxBasedPrice": null,
                                "itemCost": 0.0,
                                "itemNrpPrice": null,
                                "itemPriceType": "R",
                                "repCapAmount": null,
                                "imageUrlMap": {
                                    "defaultImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW",
                                    "largeImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-lg$",
                                    "mediumImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-med$",
                                    "miniImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-mini$",
                                    "thumbImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-thumb$"
                                },
                                "color": {
                                    "color": null,
                                    "colorDisplayName": null,
                                    "selectableId": null,
                                    "colorId": null,
                                    "selectableType": null,
                                    "description": null,
                                    "colorImage": null
                                },
                                "inventory": null,
                                "deviceDueToday": null,
                                "deviceDueMonthly": null,
                                "make": null,
                                "model": null,
                                "year": 0,
                                "connectedCarEmailAddress": null,
                                "capacity": null,
                                "preBackDate": null,
                                "isNetworkExtender": false,
                                "sedOfferList": null,
                                "rebateOffers": null,
                                "taxDetailsList": [],
                                "discountedPrice": null,
                                "discountedPercentage": null,
                                "customBundleId": null,
                                "qrScanNeededForEsimActivation": false,
                                "deviceDollarApplied": 0.0,
                                "isPreconfigureEnabled": false,
                                "isPreconfigureDuringAddDevice": false,
                                "itemPriceOnDeviceDollarApplied": 0.0,
                                "promoHubOfferList": null,
                                "discounts": [],
                                "scannedItem": false,
                                "ringBell": false,
                                "isEligibleForGift": false,
                                "isSelectedAsGift": false,
                                "byodESimPhone": false,
                                "networkBandwidthType": null,
                                "appleCareAccessoryFlag": false,
                                "financeOptionDetail": null,
                                "esimFlow": null,
                                "esim": null
                            }
                        ]
                    },
                    "clnrInfo": {
                        "appointmentInfo": {
                            "appointmentDate": "2022-05-17",
                            "appointmentTimeFrame": "06:30PM-07:00PM"
                        },
                        "leadId": "8786631"
                    },
                    "serviceInfo": {
                        "primaryUserInfo": {
                            "firstName": "RAVI",
                            "lastName": "WRIGHT",
                            "address": {
                                "firmName": "",
                                "apartmentNo": "3411",
                                "streetNumber": "2140",
                                "streetName": "GUS THOMASSON",
                                "streetType": "RD",
                                "streetDirection": "",
                                "addressLine2": "",
                                "poBoxNo": "",
                                "ruralRouteNo": "",
                                "ruralDelNo": "",
                                "city": "MESQUITE",
                                "state": "TX",
                                "zipCode": "75150",
                                "zipCode4": "0018",
                                "county": "",
                                "countryCode": "",
                                "secondaryAddress": null,
                                "addressLine1": "2140 GUS THOMASSON RD APT 3411",
                                "firstName": "RAVI",
                                "lastName": "WRIGHT",
                                "emailId": "SVZGSVINLLIV8014@VZW.COM",
                                "fipsCode": "4811347892",
                                "attention": null,
                                "phoneNumber": "9999999999",
                                "preferFirstName": null,
                                "preferLastName": null
                            },
                            "emailId": "SVZGSVINLLIV8014@VZW.COM"
                        },
                        "priceType": null,
                        "activationDate": null,
                        "activateLaterInd": null,
                        "mtn": "2149840701",
                        "min": "9727721957",
                        "mea": "VG6",
                        "simCardNumber": null,
                        "oldPricePlanId": "98129",
                        "newPricePlanId": null,
                        "contractTermId": null,
                        "currentDevice": {
                            "oldLteVoraEquipInfo": {
                                "lteVoraDeviceInfo": {
                                    "deviceId": "35807108052081",
                                    "deviceType": "4GE",
                                    "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                    "capacity": null
                                },
                                "iccid": "89148000000719731987"
                            }
                        },
                        "orderDevice": null,
                        "planPrice": null,
                        "selectedFeaturesList": null,
                        "planDiscPrice": null,
                        "pricePlanInfo": null,
                        "newPricePlanInfo": null,
                        "correlationID": null,
                        "lineType": null,
                        "trunkMTN": null,
                        "mldTrunkMTN": null,
                        "numberShareInd": null,
                        "isSharePlanAdded": false,
                        "oldPlanFlag": "A",
                        "isAutoPayEnrolled": null,
                        "isPaperLessEnrolled": null,
                        "isAutoPayPaperLessDiscountEligible": null,
                        "totalEligibleAutoPayPaperLessDiscount": null,
                        "isFreeAppleMusicLoss": "N",
                        "sbdOffer": null,
                        "selectedALPShareList": {
                            "count": 0,
                            "alpShareInfo": [
                                {
                                    "addDeleteInd": "Z",
                                    "servicePlanId": "98129",
                                    "svcPlanCompType": "VD",
                                    "servicePlanDesc": "THE NEW VERIZON PLAN UNLIMITED",
                                    "accessFee": "65.0",
                                    "noOfSharedLines": 1,
                                    "imageUrlMap": {
                                        "defaultImage": "https://ss7.vzw.com/is/image/VerizonWireless/Unlimited_0719"
                                    },
                                    "categoryCode": "60"
                                }
                            ],
                            "newAlpShareInfo": []
                        },
                        "fiveGUpSell": false,
                        "pairingInfo": null,
                        "cart5GAppointment": null,
                        "planDiscount": null,
                        "newPlanFlag": null,
                        "planDetails": null,
                        "serviceAddress": {
                            "firmName": "",
                            "apartmentNo": "3411",
                            "streetNumber": "2140",
                            "streetName": "GUS THOMASSON",
                            "streetType": "RD",
                            "streetDirection": "",
                            "addressLine2": "",
                            "poBoxNo": "",
                            "ruralRouteNo": "",
                            "ruralDelNo": "",
                            "city": "MESQUITE",
                            "state": "TX",
                            "zipCode": "75150",
                            "zipCode4": "0018",
                            "county": "",
                            "countryCode": "",
                            "secondaryAddress": null,
                            "addressLine1": "2140 GUS THOMASSON RD APT 3411",
                            "firstName": "RAVI",
                            "lastName": "WRIGHT",
                            "emailId": "SVZGSVINLLIV8014@VZW.COM",
                            "fipsCode": "4811347892",
                            "attention": null,
                            "phoneNumber": "9999999999",
                            "preferFirstName": null,
                            "preferLastName": null
                        }
                    }
                }
            }
        }
    }
}

export const OrderDocumentsReceiptsemptMock = {
    documentReceiptsItems: [
        {
            name: "Gift receipt",
            btn1: "Email",
            btn2: "Print",
            id: "giftReceipt",
            show: "giftReceipt"
        },
        {
            name: "Customer agreement ",
            btn1: "Email",
            btn2: "Print",
            id: "customerAgreement",
            show: "customerAgreement"
        },
        {
            name: "Device payment agreement ",
            btn1: "Email",
            btn2: "Print",
            id: "devicePaymentAgreement",
            show: "devicePaymentAgreement"
        },
        {
            name: "EdgeUp Buyout Payment Receipt",
            btn1: "View Receipt",
            btn2: "print",
            id: "buyOutPaymentReceipt",
            show: "buyOutPaymentReceipt"
        },
        {
            name: "Purchase receipt",
            btn1: "Email",
            btn2: "Print",
            btn3: "SMS",
            id: "purchaseReceipt",
            show: "purchaseReceipt"
        },
        {
            name: "Trade-In receipt",
            btn1: "",
            btn2: "Print",
            id: "tradeInReceipt",
            show: "tradeInReceipt"
        },
        {
            name: "Ring agreement",
            btn1: "Email",
            btn2: "Print",
            id: "isRingAgreement",
            show: "isRingAgreement"
        },
        {
            name: "QR code",
            btn1: "Email",
            btn2: "Print",
            btn3: "View",
            id: "isQRCode",
            show: "isQRCode"
        },
        {
            name: "Return Label",
            btn1: "View",
            id: "IsReturnLabel",
            show: "IsReturnLabel"
        },
        {
            name: "Phone/Smart Watch trade in shipping label",
            btn1: "Email",
            btn2: "Print",
            id: "upsShippingLabel",
            show: "upsShippingLabel"
        },
        {
            name: "Tablet trade in shipping label",
            btn1: "Email",
            btn2: "Print",
            id: "tabletUpsShippingLabel",
            show: "tabletUpsShippingLabel"
        }
    ],
    viewreceiptpdcContent: {
        viewReceipt: "yes",
        viewReceiptArr: [{
            categoryName: "OrderConfirmation"
        }]
    },
    readOrderViewAndPrintReceipt: {
        "documentsInfo": [
            {
                "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmNyZWRpdEFwcGxpY2F0aW9uTnVtYmVyOjUwNTg1ODY0N35vcmRlck51bTo1MDU4NTg2NDc=",
                "documentName": "customerAgreement",
                "receiptType": "CON"
            },
            {
                "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmluc3RhbGxtZW50TnVtOjE1ODc3NTYzMDR+b3JkZXJOdW06bnVsbA==",
                "documentName": "devicePaymentAgreement",
                "receiptType": "WA"
            },
            {
                "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                "documentName": "buyOutPaymentReceipt"
            },
            {
                "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                "documentName": "isRingAgreement"
            },
            {}
        ]

    },
    listMtnAndAgreementId: [{
        id: "1"
    }],
    tradeInDetail: [{ "trackingNo": "1Z90A26F9000395975", "deviceCategory": "Smart Phone" }, { "trackingNo": "1Z90A26F9000395975", "deviceCategory": "tablet" }],
    OrderConfirmation: {
        "viewReceiptContentPDF": { "cateorgry": "device" },
        "showROViewPrintReceipt": "receipt",
        listMtnAndAgreement: [123, 456],
        OrderConfirmationData: {
            "data": {
                "getConfirmationPage": {
                    "preOrBackOrder": true,
                    "managerApprovalReqInfo": true,
                    "cartId": "1c3b635c-621f-42f7-a016-4edd3d8d3640",
                    "myVerizonInd": false,
                    "paymentReceipt": true,
                    "giftReceipt": true,
                    "devicePaymentAgreement": false,
                    "customerAgreement": true,
                    "orderConfirmation": false,
                    "purchaseReceipt": true,
                    "tradeInReceipt": true,
                    "nextbillSummary": true,
                    "isStandAloneTradein": false,
                    "updateEmailInd": true,
                    "paperFreeEnrollmentInd": true,
                    "isTechInstall": false,
                    "techCoachSMSInd": false,
                    "multiDeviceVerizonProtectionSelected": null,
                    "isVerizonProtectionSelected": null,
                    "tradeInInd": false,
                    "isShowComboOrder": false,
                    "tradeInType": null,
                    "contentTransferUpgradeType": "null",
                    "orderStatus": "CO",
                    "orderNumber": "2144750",
                    "locationCode": "0026901",
                    "emailAddress": "SVZGSVINLLIV8014@VZW.COM",
                    "accountNumber": "0223405826-1",
                    "installationDate": null,
                    "channelID": "OMNI-INDIRECT",
                    "contentTransfer": false,
                    "preOrBackOrder": true,
                    "confirmationNumber": "",
                    "submissionId": "",
                    "orderActivityType": "CLNR",
                    "giftCartBalanceAmount": "0.0",
                    "showGiftCardBalance": false,
                    "generateUpsShipmentLabel": [
                        {
                            "autoPrintShipmentLabel": false
                        }
                    ],
                    "documentsInfo": [
                        {
                            "documentName": "buyOutPaymentReceipt"
                        }
                    ],
                    "loanInfo": [
                        null
                    ],
                    "is5GProfessionalInstall": false,
                    "installAppSelectedDate": {},
                    "assistedContentTransfer": null,
                    "managerApprovalReqInfo": true,
                    "ispuServices": "",
                    "storeinfo": [
                        {
                            "businessName": null,
                            "retailId": null,
                            "netaceLocationCode": null,
                            "storeStatus": null,
                            "storeName": "North Plainfield",
                            "phoneNumber": null,
                            "address1": null,
                            "city": "WARREN",
                            "state": "NJ",
                            "zipCode": "07059",
                            "fipsCode": null,
                            "hoursMon": null,
                            "hoursTue": null,
                            "hoursWed": null,
                            "hoursThu": null,
                            "hoursFri": null,
                            "hoursSat": null,
                            "hoursSun": null,
                            "ispuServices": null,
                            "vendor": "UBREAK",
                            "storePhoneNumber": "9082932108",
                            "addressLine2": null,
                            "streetName": "30 INDEPENDENCE"
                        }
                    ],
                    "isRingAgreement": true,
                    "isQRCode": false,
                    "qRCodeOption": [{ "mtn": "2149840701", "qrCodeType": "PixelQrCodeEnabled" },
                    { "mtn": "4569840701", "qrCodeType": " eSimUpgradeQrCodeEnabled" }],
                    "displayActivationStatus": false,
                    "tradeInOrderNumber": "",
                    "fiosAvailabilityCheckUrl": null,
                    "displayFiosContent": false,
                    "isActivateNow": false,
                    "activateNow": [],
                    "returnLabelTns": [
                        {
                            "mtn": "2149840701"
                        }
                    ],
                    "isPreBackOrderReceipt": false,
                    "d2dFlag": null,
                    "isAutoMessageSent": true,
                    "isGiftPurchase": false,
                    "buyOutPaymentReceipt": false,
                    "isEdgeUp": false,
                    "returnLabels": [],
                    "paymentReceipts": [],
                    "displayPaymentBanner": false,
                    "refundOrderDetails": {
                        "locationCode": null,
                        "orderNum": 0,
                        "creditApplicationNum": 0
                    },
                    "refundCartItems": {
                        "cartItem": [
                            {
                                "manufacturer": null,
                                "sorDeviceCategory": "4G Smartphone",
                                "totalPriceWithDiscount": 0.0,
                                "skuId": "sku2880249",
                                "productId": "dev8520011",
                                "itemCode": "CLNRSAMN950WKIT",
                                "sorId": "CLNRSAMN950WKIT",
                                "cartItemType": "DEVICE",
                                "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                "bundleAccessorySku": null,
                                "bundleProductId": null,
                                "mobileNumber": "2149840701",
                                "minNumber": null,
                                "accountNumber": null,
                                "accountSubNumber": null,
                                "billingSystem": null,
                                "deviceId": "35807108052081",
                                "qty": 1,
                                "simId": null,
                                "itemPrice": null,
                                "buyOutTaxAmountUnbilled": 0.0,
                                "buyOutAmountWithoutTax": 0.0,
                                "smartIMEI": false,
                                "isCustomerProvidedSIM": false,
                                "taxAmount": 0.0,
                                "localTax": null,
                                "stateTax": null,
                                "groupDiscInd": null,
                                "isDropshipItem": null,
                                "dropshipProviderDesc": null,
                                "prodCode1": "LTE",
                                "prodCode2": "SMT",
                                "prodCode3": "DIG",
                                "prodCode4": "CLK",
                                "prodCode5": "FRU",
                                "priceType": null,
                                "taxBasedPriceFlag": null,
                                "mtnOOWReasonCode": null,
                                "ssnOOWReasonCode": null,
                                "bundleSeqNum": 0,
                                "approvingMgrId": null,
                                "mgrIdForDisc": null,
                                "mgrIdForUpgr": null,
                                "rebateEligibilityInd": null,
                                "itemSeqNum": 0,
                                "btaEligible": "false",
                                "newInUnOpenedBox": null,
                                "dipIndicator": null,
                                "upgradeReasonCode": null,
                                "dropShipVendorToken": null,
                                "catalogPrice": null,
                                "depletionType": "F",
                                "unitTaxBasedPrice": null,
                                "itemCost": 0.0,
                                "itemNrpPrice": null,
                                "itemPriceType": "R",
                                "repCapAmount": null,
                                "imageUrlMap": {
                                    "defaultImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW",
                                    "largeImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-lg$",
                                    "mediumImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-med$",
                                    "miniImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-mini$",
                                    "thumbImage": "https://ss7.vzw.com/is/image/VerizonWireless/Great_Black_VZW?$device-thumb$"
                                },
                                "color": {
                                    "color": null,
                                    "colorDisplayName": null,
                                    "selectableId": null,
                                    "colorId": null,
                                    "selectableType": null,
                                    "description": null,
                                    "colorImage": null
                                },
                                "inventory": null,
                                "deviceDueToday": null,
                                "deviceDueMonthly": null,
                                "make": null,
                                "model": null,
                                "year": 0,
                                "connectedCarEmailAddress": null,
                                "capacity": null,
                                "preBackDate": null,
                                "isNetworkExtender": false,
                                "sedOfferList": null,
                                "rebateOffers": null,
                                "taxDetailsList": [],
                                "discountedPrice": null,
                                "discountedPercentage": null,
                                "customBundleId": null,
                                "qrScanNeededForEsimActivation": false,
                                "deviceDollarApplied": 0.0,
                                "isPreconfigureEnabled": false,
                                "isPreconfigureDuringAddDevice": false,
                                "itemPriceOnDeviceDollarApplied": 0.0,
                                "promoHubOfferList": null,
                                "discounts": [],
                                "scannedItem": false,
                                "ringBell": false,
                                "isEligibleForGift": false,
                                "isSelectedAsGift": false,
                                "byodESimPhone": false,
                                "networkBandwidthType": null,
                                "appleCareAccessoryFlag": false,
                                "financeOptionDetail": null,
                                "esimFlow": null,
                                "esim": null
                            }
                        ]
                    },
                    "clnrInfo": {
                        "appointmentInfo": {
                            "appointmentDate": "2022-05-17",
                            "appointmentTimeFrame": "06:30PM-07:00PM"
                        },
                        "leadId": "8786631"
                    },
                    "serviceInfo": {
                        "primaryUserInfo": {
                            "firstName": "RAVI",
                            "lastName": "WRIGHT",
                            "address": {
                                "firmName": "",
                                "apartmentNo": "3411",
                                "streetNumber": "2140",
                                "streetName": "GUS THOMASSON",
                                "streetType": "RD",
                                "streetDirection": "",
                                "addressLine2": "",
                                "poBoxNo": "",
                                "ruralRouteNo": "",
                                "ruralDelNo": "",
                                "city": "MESQUITE",
                                "state": "TX",
                                "zipCode": "75150",
                                "zipCode4": "0018",
                                "county": "",
                                "countryCode": "",
                                "secondaryAddress": null,
                                "addressLine1": "2140 GUS THOMASSON RD APT 3411",
                                "firstName": "RAVI",
                                "lastName": "WRIGHT",
                                "emailId": "SVZGSVINLLIV8014@VZW.COM",
                                "fipsCode": "4811347892",
                                "attention": null,
                                "phoneNumber": "9999999999",
                                "preferFirstName": null,
                                "preferLastName": null
                            },
                            "emailId": "SVZGSVINLLIV8014@VZW.COM"
                        },
                        "priceType": null,
                        "activationDate": null,
                        "activateLaterInd": null,
                        "mtn": "2149840701",
                        "min": "9727721957",
                        "mea": "VG6",
                        "simCardNumber": null,
                        "oldPricePlanId": "98129",
                        "newPricePlanId": null,
                        "contractTermId": null,
                        "currentDevice": {
                            "oldLteVoraEquipInfo": {
                                "lteVoraDeviceInfo": {
                                    "deviceId": "35807108052081",
                                    "deviceType": "4GE",
                                    "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                    "capacity": null
                                },
                                "iccid": "89148000000719731987"
                            }
                        },
                        "orderDevice": null,
                        "planPrice": null,
                        "selectedFeaturesList": null,
                        "planDiscPrice": null,
                        "pricePlanInfo": null,
                        "newPricePlanInfo": null,
                        "correlationID": null,
                        "lineType": null,
                        "trunkMTN": null,
                        "mldTrunkMTN": null,
                        "numberShareInd": null,
                        "isSharePlanAdded": false,
                        "oldPlanFlag": "A",
                        "isAutoPayEnrolled": null,
                        "isPaperLessEnrolled": null,
                        "isAutoPayPaperLessDiscountEligible": null,
                        "totalEligibleAutoPayPaperLessDiscount": null,
                        "isFreeAppleMusicLoss": "N",
                        "sbdOffer": null,
                        "selectedALPShareList": {
                            "count": 0,
                            "alpShareInfo": [
                                {
                                    "addDeleteInd": "Z",
                                    "servicePlanId": "98129",
                                    "svcPlanCompType": "VD",
                                    "servicePlanDesc": "THE NEW VERIZON PLAN UNLIMITED",
                                    "accessFee": "65.0",
                                    "noOfSharedLines": 1,
                                    "imageUrlMap": {
                                        "defaultImage": "https://ss7.vzw.com/is/image/VerizonWireless/Unlimited_0719"
                                    },
                                    "categoryCode": "60"
                                }
                            ],
                            "newAlpShareInfo": []
                        },
                        "fiveGUpSell": false,
                        "pairingInfo": null,
                        "cart5GAppointment": null,
                        "planDiscount": null,
                        "newPlanFlag": null,
                        "planDetails": null,
                        "serviceAddress": {
                            "firmName": "",
                            "apartmentNo": "3411",
                            "streetNumber": "2140",
                            "streetName": "GUS THOMASSON",
                            "streetType": "RD",
                            "streetDirection": "",
                            "addressLine2": "",
                            "poBoxNo": "",
                            "ruralRouteNo": "",
                            "ruralDelNo": "",
                            "city": "MESQUITE",
                            "state": "TX",
                            "zipCode": "75150",
                            "zipCode4": "0018",
                            "county": "",
                            "countryCode": "",
                            "secondaryAddress": null,
                            "addressLine1": "2140 GUS THOMASSON RD APT 3411",
                            "firstName": "RAVI",
                            "lastName": "WRIGHT",
                            "emailId": "SVZGSVINLLIV8014@VZW.COM",
                            "fipsCode": "4811347892",
                            "attention": null,
                            "phoneNumber": "9999999999",
                            "preferFirstName": null,
                            "preferLastName": null
                        }
                    }
                }
            }
        }
    }
}

export const initialState = {
    OrderConfirmation: {
        "viewReceiptContentPDF": {
            "cateorgry": "SIM",
            "viewReceipt": "yes",
            "viewReceiptArr": [{
                "categoryName": "GR"
            }]
        },
        readOrderViewAndPrintReceipt: {
            "documents": [
                {
                    "documentId": "bG9jYXRpb25Db2RlOkUxMTE3MDF+b3JkZXJUeXBlOlBTfm9yZGVyRGF0ZTowNy8xNS8yMDIyfnJlY2VpcHRUeXBlOkNPTn5yZWNlaXB0U2VxTm86MDF+YWNjb3VudE51bWJlcjowfm1vYmlsZU51bWJlcjo1NDA2NzY3NDgxfmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzp+Y3JlZGl0QXBwbGljYXRpb25OdW1iZXI6NTA1ODU4NjQ3fm9yZGVyTnVtOjUwNTg1ODY0Nw==",
                    "documentName": "customerAgreement",
                    "receiptType": "CON",
                    "orderType": "PS",
                    "orderNumber": "505858647",
                    "mtn": "5406767481"
                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOkUxMTE3MDF+b3JkZXJUeXBlOlBTfm9yZGVyRGF0ZTowNy8xNS8yMDIyfnJlY2VpcHRUeXBlOldBfnJlY2VpcHRTZXFObzowMX5hY2NvdW50TnVtYmVyOjB+bW9iaWxlTnVtYmVyOjU0MDY3Njc0ODF+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOn5pbnN0YWxsbWVudE51bToxNTg3NzU2MzA0fm9yZGVyTnVtOjU1NTQ5",
                    "documentName": "devicePaymentAgreement",
                    "receiptType": "WA",
                    "orderType": "PS",
                    "orderNumber": "55549",
                    "mtn": "5406767481"
                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                    "documentName": "buyOutPaymentReceipt"
                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                    "documentName": "purchaseReceipt",
                }
            ],
            "orderConfirmationReceiptFlags": null,
            "upsShipmentLabelDetails": null,
            "paymentAgreement": false,
            "devicePaymentAgreement": true,
            "purchaseReceipt": false,
            "customerAgreement": true,
            "paymentReceipts": [
                {
                    "mobileNumber": "8644195446",
                    "labelType": "buyout"
                }
            ],
            "returnLabels": [
                {
                    "mobileNumber": "8644195446"
                }
            ],
            "isEdgeUp": false,
        },
        OrderConfirmationData: {
            "data": {
                "getConfirmationPage": {
                    "managerApprovalReqInfo": true,
                    "cartId": "e404d341-fbd6-4983-9281-70e1eeea4eff",
                    "myVerizonInd": false,
                    "paymentReceipt": false,
                    "giftReceipt": true,
                    "devicePaymentAgreement": true,
                    "customerAgreement": true,
                    "orderConfirmation": false,
                    "purchaseReceipt": false,
                    "tradeInReceipt": false,
                    "nextbillSummary": true,
                    "isStandAloneTradein": false,
                    "updateEmailInd": true,
                    "paperFreeEnrollmentInd": true,
                    "isTechInstall": false,
                    "techCoachSMSInd": true,
                    "multiDeviceVerizonProtectionSelected": false,
                    "isVerizonProtectionSelected": false,
                    "tradeInInd": false,
                    "isShowComboOrder": false,
                    "tradeInType": null,
                    "contentTransferUpgradeType": "Apple iOS to Apple iOS",
                    "orderStatus": "CO",
                    "orderNumber": "55549",
                    "creditApplicationNum": "505858647",
                    "locationCode": "E111701",
                    "emailAddress": "BSETTLES1994@GMAIL.COM",
                    "accountNumber": "0325909023-1",
                    "installationDate": null,
                    "channelID": "OMNI-INDIRECT",
                    "contentTransfer": true,
                    "preOrBackOrder": false,
                    "confirmationNumber": "",
                    "submissionId": "",
                    "orderActivityType": "EUP",
                    "giftCartBalanceAmount": "0.0",
                    "showGiftCardBalance": false,
                    "generateUpsShipmentLabel": null,
                    "documentsInfo": [
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmNyZWRpdEFwcGxpY2F0aW9uTnVtYmVyOjUwNTg1ODY0N35vcmRlck51bTo1MDU4NTg2NDc=",
                            "documentName": "customerAgreement",
                            "receiptType": "CON"
                        },
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmluc3RhbGxtZW50TnVtOjE1ODc3NTYzMDR+b3JkZXJOdW06bnVsbA==",
                            "documentName": "devicePaymentAgreement",
                            "receiptType": "WA"
                        },
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                            "documentName": "buyOutPaymentReceipt"
                        },
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                            "documentName": "isRingAgreement"
                        },
                        {}
                    ],
                    "loanInfo": [
                        {
                            "installmentLoanNumber": "1587756304",
                            "mobileNumber": "5406767481",
                            "loanStatus": "A"
                        }
                    ],
                    "is5GProfessionalInstall": false,
                    "installAppSelectedDate": {},
                    "assistedContentTransfer": [
                        {
                            "techCoachUrl": "https://my.asurion.com/mobile-device-setup?mxclient=verizon&uuid=609ab784-3348-436e-8a95-05463cd91136&cid=vzw_online",
                            "techCoachSMSInd": "Success",
                            "vzCloudNotification": "",
                            "mtn": "5406767481",
                            "oldDeviceOs": "Apple iOS",
                            "oldDeviceOem": "Apple",
                            "newDeviceOs": "Apple iOS",
                            "newDeviceOem": "Apple"
                        }
                    ],
                    "managerApprovalReqInfo": null,
                    "ispuServices": "",
                    "storeinfo": [
                        {
                            "businessName": null,
                            "retailId": null,
                            "netaceLocationCode": null,
                            "storeStatus": null,
                            "storeName": "Cellular Sales Vinton",
                            "phoneNumber": null,
                            "address1": null,
                            "city": null,
                            "state": "VA",
                            "zipCode": "24179",
                            "fipsCode": "5116181280",
                            "hoursMon": null,
                            "hoursTue": null,
                            "hoursWed": null,
                            "hoursThu": null,
                            "hoursFri": null,
                            "hoursSat": null,
                            "hoursSun": null,
                            "ispuServices": null,
                            "vendor": null,
                            "storePhoneNumber": null,
                            "addressLine2": null,
                            "streetName": null
                        }
                    ],
                    "isRingAgreement": true,
                    "isQRCode": true,
                    "qRCodeOption": [{ "mtn": "2149840701", "qrCodeType": "PixelQrCodeEnabled" },
                    { "mtn": "4659840701", "qrCodeType": " eSimUpgradeQrCodeEnabled " }],
                    "displayActivationStatus": true,
                    "tradeInOrderNumber": "",
                    "fiosAvailabilityCheckUrl": null,
                    "displayFiosContent": false,
                    "isActivateNow": false,
                    "activateNow": [],
                    "returnLabelTns": [],
                    "isPreBackOrderReceipt": false,
                    "d2dFlag": "N",
                    "isAutoMessageSent": false,
                    "isGiftPurchase": false,
                    "buyOutPaymentReceipt": true,
                    "isEdgeUp": true,
                    "returnLabels": [
                        {
                            "mobileNumber": "5406767481"
                        }
                    ],
                    "paymentReceipts": [
                        {
                            "mobileNumber": "5406767481",
                            "labelType": "EdgeUp"
                        }
                    ],
                    "displayPaymentBanner": false,
                    "refundOrderDetails": {
                        "locationCode": null,
                        "orderNum": 0,
                        "creditApplicationNum": 0
                    },
                    "refundCartItems": {},
                    "clnrInfo": {
                        "appointmentInfo": null,
                        "leadId": null
                    },
                    "serviceInfo": {
                        "primaryUserInfo": {
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "address": {
                                "firmName": "",
                                "apartmentNo": "",
                                "streetNumber": "11317",
                                "streetName": "LEESVILLE",
                                "streetType": "RD",
                                "streetDirection": "",
                                "addressLine2": "",
                                "poBoxNo": "",
                                "ruralRouteNo": "",
                                "ruralDelNo": "",
                                "city": "EVINGTON",
                                "state": "VA",
                                "zipCode": "24550",
                                "zipCode4": "4432",
                                "county": "",
                                "countryCode": "",
                                "secondaryAddress": null,
                                "addressLine1": "11317 LEESVILLE RD",
                                "firstName": "BRANDON",
                                "lastName": "SETTLES",
                                "emailId": "BSETTLES1994@GMAIL.COM",
                                "fipsCode": "5103100000",
                                "attention": null,
                                "phoneNumber": "5406767481",
                                "preferFirstName": null,
                                "preferLastName": null
                            },
                            "emailId": "BSETTLES1994@GMAIL.COM"
                        },
                        "priceType": null,
                        "activationDate": null,
                        "activateLaterInd": null,
                        "mtn": "5406767481",
                        "min": "5405889505",
                        "mea": "VRK",
                        "simCardNumber": null,
                        "oldPricePlanId": "50430",
                        "newPricePlanId": null,
                        "contractTermId": "48",
                        "currentDevice": {
                            "oldLteVoraEquipInfo": {
                                "lteVoraDeviceInfo": {
                                    "deviceId": "35807108052081",
                                    "deviceType": "4GE",
                                    "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                    "capacity": null
                                },
                                "lteEqpt": {
                                    "iccid": "89148000008261035343"
                                }
                            }
                        },
                        "planPrice": null,
                        "selectedFeaturesList": {
                            "featuresCount": 50,
                            "visFeature": []
                        },
                        "planDiscPrice": null,
                        "pricePlanInfo": null,
                        "newPricePlanInfo": null,
                        "correlationID": "110500000103783491",
                        "lineType": null,
                        "trunkMTN": null,
                        "mldTrunkMTN": null,
                        "numberShareInd": null,
                        "isSharePlanAdded": false,
                        "oldPlanFlag": "L",
                        "isAutoPayEnrolled": null,
                        "isPaperLessEnrolled": null,
                        "isAutoPayPaperLessDiscountEligible": null,
                        "totalEligibleAutoPayPaperLessDiscount": null,
                        "isFreeAppleMusicLoss": "N",
                        "sbdOffer": null,
                        "selectedALPShareList": null,
                        "fiveGUpSell": false,
                        "pairingInfo": {},
                        "cart5GAppointment": null,
                        "planDiscount": null,
                        "newPlanFlag": null,
                        "planDetails": null,
                        "serviceAddress": {
                            "firmName": "",
                            "apartmentNo": "",
                            "streetNumber": "11317",
                            "streetName": "LEESVILLE",
                            "streetType": "RD",
                            "streetDirection": "",
                            "addressLine2": "",
                            "poBoxNo": "",
                            "ruralRouteNo": "",
                            "ruralDelNo": "",
                            "city": "EVINGTON",
                            "state": "VA",
                            "zipCode": "24550",
                            "zipCode4": "4432",
                            "county": "",
                            "countryCode": "",
                            "secondaryAddress": null,
                            "addressLine1": "11317 LEESVILLE RD",
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "emailId": "BSETTLES1994@GMAIL.COM",
                            "fipsCode": "5103100000",
                            "attention": null,
                            "phoneNumber": "5406767481",
                            "preferFirstName": null,
                            "preferLastName": null
                        }
                    },
                    "errorCode": ""
                }
            }

        },
        showROViewPrintReceipt: true,
    },
    isLoading: false,
    error: null,
    emailList: "",
    OrderConfirmationData: "",
    remark: "",
    oldEmail: "",
    newEmail: "",
    printerDevices: [],
    isGetDevicesLoading: false,
    listMtnAndAgreement: [],
    pushNotificationStatus: "",
    smsNotificationStatus: "",
    vzCloudSMSStatus: "",
    techCoachSMSStatus: false,
    emailSetupGuidStatus: "",
    contantTransferArr: [],
    contantTransferData: [],
    showTandCModal: false,
    showActivationButton: false,
    showActivationStatus: false,
    ocActivationData: {},
    showActivationStatusModal: false,
    showExitOrderModal: false,
    orderConfirmationSendLovLinkStatus: false,
    ocLovRemarkStatus: false,
    showROViewPrintReceipt: true,
    autoTradeInShipmentFlag: false,
    clearRedisFlag: false,
    preOrderDetails: "",
    emailAddress: "",
    updatedSalesRepId: "",
    showIndirectLoanDetail: false,
    refreshActivationStatus: []
};

export const orderDocumentsReceiptProps = {
    viewreceiptpdcContent: "sss",
    OrderConfirmation: {
        showEMailModal: true,
        "showViewModal": true,
        showLabelModal: true,
        printerDevices: [],
        readOrderViewAndPrintReceipt: {
            "documents": [
                {
                    "documentId": "bG9jYXRpb25Db2RlOkUxMTE3MDF+b3JkZXJUeXBlOlBTfm9yZGVyRGF0ZTowNy8xNS8yMDIyfnJlY2VpcHRUeXBlOkNPTn5yZWNlaXB0U2VxTm86MDF+YWNjb3VudE51bWJlcjowfm1vYmlsZU51bWJlcjo1NDA2NzY3NDgxfmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzp+Y3JlZGl0QXBwbGljYXRpb25OdW1iZXI6NTA1ODU4NjQ3fm9yZGVyTnVtOjUwNTg1ODY0Nw==",
                    "documentName": "customerAgreement",
                    "receiptType": "CON",
                    "orderType": "PS",
                    "orderNumber": "505858647",
                    "mtn": "5406767481"
                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOkUxMTE3MDF+b3JkZXJUeXBlOlBTfm9yZGVyRGF0ZTowNy8xNS8yMDIyfnJlY2VpcHRUeXBlOldBfnJlY2VpcHRTZXFObzowMX5hY2NvdW50TnVtYmVyOjB+bW9iaWxlTnVtYmVyOjU0MDY3Njc0ODF+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOn5pbnN0YWxsbWVudE51bToxNTg3NzU2MzA0fm9yZGVyTnVtOjU1NTQ5",
                    "documentName": "devicePaymentAgreement",
                    "receiptType": "WA",
                    "orderType": "PS",
                    "orderNumber": "55549",
                    "mtn": "5406767481"
                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                    "documentName": "buyOutPaymentReceipt",
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",

                },
                {
                    "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                    "documentName": "purchaseReceipt",
                },
                {
                    "barCode": "89504e470d0a1a0a0000000d49484452000000c4000000270100000000780ddaea0000002c49444154785e63f87fbac24f3dc45ad8452d357da6515a647b885e4e8ce751fb0f0ca332a332a332c352060037978c01f31fbd2c0000000049454e44ae426082",
                    "documentName": "giftReceipt",
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjAwMjYzMDF+b3JkZXJOdW06NjI5NTIwOH5vcmRlclR5cGU6UFN+b3JkZXJEYXRlOjA4LzA4LzIwMTV+cmVjZWlwdFR5cGU6R1J+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDIxMzYyNTIzNS0xfm1vYmlsZU51bWJlcjo4MDM1MDkwMzY2fmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                    "receiptData": "****************************************\n    E Q U I P M E N T   R E C E I P T     \n****************************************\n\n\n                 Verizon                  \n             6814 Tilton Rd               \n    Egg Harbor Township, NJ 08234-4490    \n              (609) 383-2100              \n         www.verizonwireless.com          \n\n    ***********Gift Receipt***********    \n\nOrder Number:                      6295208\nOrder Location:                   00263 01\nReceive Location:                 00263 01\nReceipt Date/Time:     02/23/2023 10:08 ET\nRegister:                    tabmgr  ENC01\n\nItem                            \t\t\t\n------------------------------------------\nMPVH3LL/A  iPhone 14\n\nUNIVESIM5G-SA-S  5G SA soft SIM by ST\n\nBUYOUTPMT  motorola edge 5G UW 256GB \nin Nebula Blue\n\n------------------------------------------\n\n\n      Customer Recycling Disclosure:      \n\nElectronic waste should be recycled or \ndisposed of properly. Contact http://\nwww.state.nj.us/dep/dshw/ewaste/\nindex.html or 866-DEPKNOW  for \ninformation.\n\n\n              Return Policy:              \n\n\nYou may return or exchange wireless\ndevices and accessories purchased from\nVerizon Wireless within 30 days of\npurchase (within 30 days of purchase for\nMajor Account Agreement (MAA)\ncustomers). Gift cards are not eligible\nfor return or exchange, except as\nrequired by law.  A restocking fee of\n$50 applies to any return or exchange of\na wireless device (excluding Hawaii);\nfor MAA customers in Hawaii $50\nrestocking fee applies. You may exchange\nyour device one time. If you received\nyour merchandise through a \"Buy One, Get\nOne Free\" or similar offer and return\nonly one of the items, your promotional\noffer will be canceled and a charge will\nappear on your next month's bill for any\npromotional benefit associated with the\noffer. If a device purchased as part of\na BOGO offer Is being exchanged for the\nsame make and model, only the item that\nis being exchanged needs to be returned.\nFor additional information, please see\nthe terms and conditions of the\npromotional offer. See\nverizonwireless.com/returnpolicy for\ncomplete details; (MAA customers, see\nwww.verizonwireless.com/businessreturns).\r\r\n\n                Thank You!                ",
                    "receiptType": "GR", "orderType": "RF",
                    "orderNumber": "979266", "mtn": "9704028276"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjI0NzkyMDF+b3JkZXJOdW06OTYWNjb3VudE51bWJlcjowOTcyMTU2MTgwLTAwMDAxfm1vYmlsZU51bWJlcjo5NzA0MDI4Mjc2fmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                    "documentName": "PurchaseReceipt",
                    "receiptType": "GR", "orderType": "RF",
                    "orderNumber": "979266", "mtn": "9704028276"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjI0NzkyMDF+b3JkZXJOdW06OTYWNjb3VudE51bWJlcjowOTcyMTU2MTgwLTAwMDAxfm1vYmlsZU51bWJlcjo5NzA0MDI4Mjc2fmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                    "documentName": "tabletUpsShippingLabel",
                    "receiptType": "GR", "orderType": "RF",
                    "orderNumber": "979266", "mtn": "9704028276"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjI0NzkyMDF+b3JkZXJOdW06OTYWNjb3VudE51bWJlcjowOTcyMTU2MTgwLTAwMDAxfm1vYmlsZU51bWJlcjo5NzA0MDI4Mjc2fmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                    "documentName": "upsShippingLabel",
                    "receiptType": "GR", "orderType": "RF",
                    "orderNumber": "979266", "mtn": "9704028276"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjI0NzkyMDF+b3JkZXJOdW06OTYWNjb3VudE51bWJlcjowOTcyMTU2MTgwLTAwMDAxfm1vYmlsZU51bWJlcjo5NzA0MDI4Mjc2fmJpbGxpbmdTeXN0ZW06bnVsbH5zc240Om51bGx+cGF5bWVudFR5cGU6fnBheW1lbnRUeXBlRGVzYzo=",
                    "documentName": "IsReturnLabel",
                    "receiptType": "GR", "orderType": "RF",
                    "orderNumber": "979266", "mtn": "9704028276"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjE0MjY1MDF+b3JkZXJOdW06MTU3OTkyNn5vcmRlclR5cGU6UFN+b3JkZXJEYXRlOjAxLzAyLzIwMjN+cmVjZWlwdFR5cGU6VFJ+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDQ2MDg3NzUwNi0wMDAwMX5tb2JpbGVOdW1iZXI6MzEwNDg3NzM4Nn5iaWxsaW5nU3lzdGVtOm51bGx+c3NuNDpudWxsfnBheW1lbnRUeXBlOn5wYXltZW50VHlwZURlc2M6",
                    "documentName": "tradeInReceipt", "receiptType": "TR",
                    "orderType": "PS", "orderNumber": "1579926", "mtn": "3104877386"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjE0MjY1MDF+b3JkZXJOdW06MTU3OTkyNn5vcmRlclR5cGU6UFN+b3JkZXJEYXRlOjAxLzAyLzIwMjN+cmVjZWlwdFR5cGU6VFJ+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDQ2MDg3NzUwNi0wMDAwMX5tb2JpbGVOdW1iZXI6MzEwNDg3NzM4Nn5iaWxsaW5nU3lzdGVtOm51bGx+c3NuNDpudWxsfnBheW1lbnRUeXBlOn5wYXltZW50VHlwZURlc2M6",
                    "documentName": "isQRCode", "receiptType": "TR",
                    "orderType": "PS", "orderNumber": "1579926", "mtn": "3104877386"
                },
                {
                    "encryptedDocumentId": "bG9jYXRpb25Db2RlOjE0MjY1MDF+b3JkZXJOdW06MTU3OTkyNn5vcmRlclR5cGU6UFN+b3JkZXJEYXRlOjAxLzAyLzIwMjN+cmVjZWlwdFR5cGU6VFJ+cmVjZWlwdFNlcU5vOjAxfmFjY291bnROdW1iZXI6MDQ2MDg3NzUwNi0wMDAwMX5tb2JpbGVOdW1iZXI6MzEwNDg3NzM4Nn5iaWxsaW5nU3lzdGVtOm51bGx+c3NuNDpudWxsfnBheW1lbnRUeXBlOn5wYXltZW50VHlwZURlc2M6",
                    "documentName": "isRingAgreement", "receiptType": "TR",
                    "orderType": "PS", "orderNumber": "1579926", "mtn": "3104877386"
                }
            ],
            "orderConfirmationReceiptFlags": null,
            "upsShipmentLabelDetails": [
                {
                    "tahTrackingNumber": "1Z90A26F9000395975",
                    "isPrintShipLabelAllowed": true,
                    "upsShipmentLabel": { "viewReceiptArr": [{ "categoryName": "GR" }], "data": "R0lGODlheAUgA/c7U8QpFddX7RGX1KUoHdPVVMGOlNShEb5VJVV17jW5WX4uyFT9ggw3LS2N35TVZyfhz9lloo5V2WmqrtfZabLPVdltuu/X2W3DDFXdccss191x001V3XXaxZfa7duOVd15667X3Xnzz1Xdffvv191+AAxaYv3dzCggAOw==" }
                }
            ],
            "paymentAgreement": false,
            "devicePaymentAgreement": true,
            "purchaseReceipt": false,
            "customerAgreement": true,
            "paymentReceipts": [
                {
                    "mobileNumber": "8644195446",
                    "labelType": "buyout"
                }
            ],
            "returnLabels": [
                {
                    "mobileNumber": "8644195446"
                }
            ],
            "isEdgeUp": false,
        },
        OrderConfirmationData: {
            "data": {
                "getConfirmationPage": {
                    "managerApprovalReqInfo": true,
                    "managerApprovalReqInfo": true,
                    "cartId": "e404d341-fbd6-4983-9281-70e1eeea4eff",
                    "myVerizonInd": false,
                    "paymentReceipt": false,
                    "giftReceipt": true,
                    "buyOutPaymentReceipt": true,
                    "devicePaymentAgreement": true,
                    "customerAgreement": true,
                    "isQRCode": true,
                    "IsReturnLabel": true,
                    "purchaseReceipt": true,
                    "tradeInReceipt": true,
                    "isEdgeUp": false,
                    "nextbillSummary": true,
                    "orderConfirmation": false,
                    "isStandAloneTradein": false,
                    "updateEmailInd": true,
                    "paperFreeEnrollmentInd": true,
                    "isTechInstall": false,
                    "techCoachSMSInd": true,
                    "multiDeviceVerizonProtectionSelected": false,
                    "isVerizonProtectionSelected": false,
                    "tradeInInd": false,
                    "isShowComboOrder": false,
                    "tradeInType": null,
                    "contentTransferUpgradeType": "Apple iOS to Apple iOS",
                    "orderStatus": "CO",
                    "orderNumber": "55549",
                    "creditApplicationNum": "505858647",
                    "locationCode": "E111701",
                    "emailAddress": "BSETTLES1994@GMAIL.COM",
                    "accountNumber": "0325909023-1",
                    "installationDate": null,
                    "channelID": "OMNI-INDIRECT",
                    "contentTransfer": true,
                    "preOrBackOrder": false,
                    "confirmationNumber": "",
                    "submissionId": "",
                    "orderActivityType": "EUP",
                    "giftCartBalanceAmount": "0.0",
                    "showGiftCardBalance": false,
                    "generateUpsShipmentLabel": null,
                    "documentsInfo": [
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmNyZWRpdEFwcGxpY2F0aW9uTnVtYmVyOjUwNTg1ODY0N35vcmRlck51bTo1MDU4NTg2NDc=",
                            "documentName": "customerAgreement",
                            "receiptType": "CON"
                        },
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJUeXBlOm51bGx+b3JkZXJEYXRlOm51bGx+cmVjZWlwdFR5cGU6bnVsbH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTpudWxsfnBheW1lbnRUeXBlRGVzYzpudWxsfmluc3RhbGxtZW50TnVtOjE1ODc3NTYzMDR+b3JkZXJOdW06bnVsbA==",
                            "documentName": "devicePaymentAgreement",
                            "receiptType": "WA"
                        },
                        {
                            "documentId": "bG9jYXRpb25Db2RlOm51bGx+b3JkZXJOdW06bnVsbH5vcmRlclR5cGU6bnVsbH5vcmRlckRhdGU6bnVsbH5yZWNlaXB0VHlwZTpidXlPdXRQYXltZW50UmVjZWlwdH5yZWNlaXB0U2VxTm86bnVsbH5hY2NvdW50TnVtYmVyOm51bGx+bW9iaWxlTnVtYmVyOm51bGx+YmlsbGluZ1N5c3RlbTpudWxsfnNzbjQ6bnVsbH5wYXltZW50VHlwZTp+cGF5bWVudFR5cGVEZXNjOg==",
                            "documentName": "buyOutPaymentReceipt"
                        },
                        {}
                    ],
                    lineInfo: [{ "cartItems": { "cartItem": [{ "itemCode": "EDGEUPPMT", "totalPriceWithDiscount": 0, "sorId": "EDGEUPPMT", "cartItemType": "SOFT_SKU", "mobileNumber": "3092531770", "description": "Device Upgrade Pmt", "qty": 1, "bundleSeqNum": 0, "itemPrice": '0.0' }, { "itemCode": "DEVICE", "totalPriceWithDiscount": 0, "sorId": "EDGEUPPMT", "cartItemType": "SOFT_SKU", "mobileNumber": "3092531770", "description": "Device Upgrade Pmt", "qty": 1, "bundleSeqNum": 0, "itemPrice": '20.0' }] } }],
                    "loanInfo": [
                        {
                            "installmentLoanNumber": "1587756304",
                            "mobileNumber": "5406767481",
                            "loanStatus": "A"
                        }
                    ],
                    "is5GProfessionalInstall": false,
                    "installAppSelectedDate": {},
                    "assistedContentTransfer": [
                        {
                            "techCoachUrl": "https://my.asurion.com/mobile-device-setup?mxclient=verizon&uuid=609ab784-3348-436e-8a95-05463cd91136&cid=vzw_online",
                            "techCoachSMSInd": "Success",
                            "vzCloudNotification": "",
                            "mtn": "5406767481",
                            "oldDeviceOs": "Apple iOS",
                            "oldDeviceOem": "Apple",
                            "newDeviceOs": "Apple iOS",
                            "newDeviceOem": "Apple"
                        }
                    ],
                    "managerApprovalReqInfo": null,
                    "ispuServices": "",
                    "storeinfo": [
                        {
                            "businessName": null,
                            "retailId": null,
                            "netaceLocationCode": null,
                            "storeStatus": null,
                            "storeName": "Cellular Sales Vinton",
                            "phoneNumber": null,
                            "address1": null,
                            "city": null,
                            "state": "VA",
                            "zipCode": "24179",
                            "fipsCode": "5116181280",
                            "hoursMon": null,
                            "hoursTue": null,
                            "hoursWed": null,
                            "hoursThu": null,
                            "hoursFri": null,
                            "hoursSat": null,
                            "hoursSun": null,
                            "ispuServices": null,
                            "vendor": null,
                            "storePhoneNumber": null,
                            "addressLine2": null,
                            "streetName": null
                        }
                    ],
                    "isRingAgreement": true,
                    "qRCodeOption": [{ "mtn": "123", "qrCodeType": "PixelQrCodeEnabled" },
                    { "mtn": "456", "qrCodeType": " eSimUpgradeQrCodeEnabled " }],
                    "displayActivationStatus": true,
                    "tradeInOrderNumber": "",
                    "fiosAvailabilityCheckUrl": null,
                    "displayFiosContent": false,
                    "isActivateNow": false,
                    "activateNow": [],
                    "returnLabelTns": [],
                    "isPreBackOrderReceipt": false,
                    "d2dFlag": "N",
                    "isAutoMessageSent": false,
                    "isGiftPurchase": false,
                    "returnLabels": [
                        {
                            "mobileNumber": "5406767481"
                        }
                    ],
                    "paymentReceipts": [
                        {
                            "mobileNumber": "5406767481",
                            "labelType": "EdgeUp"
                        }
                    ],
                    "displayPaymentBanner": false,
                    "refundOrderDetails": {
                        "locationCode": null,
                        "orderNum": 0,
                        "creditApplicationNum": 0
                    },
                    "refundCartItems": {},
                    "clnrInfo": {
                        "appointmentInfo": null,
                        "leadId": null
                    },
                    "serviceInfo": {
                        "primaryUserInfo": {
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "address": {
                                "firmName": "",
                                "apartmentNo": "",
                                "streetNumber": "11317",
                                "streetName": "LEESVILLE",
                                "streetType": "RD",
                                "streetDirection": "",
                                "addressLine2": "",
                                "poBoxNo": "",
                                "ruralRouteNo": "",
                                "ruralDelNo": "",
                                "city": "EVINGTON",
                                "state": "VA",
                                "zipCode": "24550",
                                "zipCode4": "4432",
                                "county": "",
                                "countryCode": "",
                                "secondaryAddress": null,
                                "addressLine1": "11317 LEESVILLE RD",
                                "firstName": "BRANDON",
                                "lastName": "SETTLES",
                                "emailId": "BSETTLES1994@GMAIL.COM",
                                "fipsCode": "5103100000",
                                "attention": null,
                                "phoneNumber": "5406767481",
                                "preferFirstName": null,
                                "preferLastName": null
                            },
                            "emailId": "BSETTLES1994@GMAIL.COM"
                        },
                        "priceType": null,
                        "activationDate": null,
                        "activateLaterInd": null,
                        "mtn": "5406767481",
                        "min": "5405889505",
                        "mea": "VRK",
                        "simCardNumber": null,
                        "oldPricePlanId": "50430",
                        "newPricePlanId": null,
                        "contractTermId": "48",
                        "currentDevice": {
                            "oldLteVoraEquipInfo": {
                                "lteVoraDeviceInfo": {
                                    "deviceId": "35807108052081",
                                    "deviceType": "4GE",
                                    "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                    "capacity": null
                                },
                                "lteEqpt": {
                                    "iccid": "89148000008261035343"
                                }
                            }
                        },
                        "planPrice": null,
                        "selectedFeaturesList": {
                            "featuresCount": 50,
                            "visFeature": []
                        },
                        "planDiscPrice": null,
                        "pricePlanInfo": null,
                        "newPricePlanInfo": null,
                        "correlationID": "110500000103783491",
                        "lineType": null,
                        "trunkMTN": null,
                        "mldTrunkMTN": null,
                        "numberShareInd": null,
                        "isSharePlanAdded": false,
                        "oldPlanFlag": "L",
                        "isAutoPayEnrolled": null,
                        "isPaperLessEnrolled": null,
                        "isAutoPayPaperLessDiscountEligible": null,
                        "totalEligibleAutoPayPaperLessDiscount": null,
                        "isFreeAppleMusicLoss": "N",
                        "sbdOffer": null,
                        "selectedALPShareList": null,
                        "fiveGUpSell": false,
                        "pairingInfo": {},
                        "cart5GAppointment": null,
                        "planDiscount": null,
                        "newPlanFlag": null,
                        "planDetails": null,
                        "serviceAddress": {
                            "firmName": "",
                            "apartmentNo": "",
                            "streetNumber": "11317",
                            "streetName": "LEESVILLE",
                            "streetType": "RD",
                            "streetDirection": "",
                            "addressLine2": "",
                            "poBoxNo": "",
                            "ruralRouteNo": "",
                            "ruralDelNo": "",
                            "city": "EVINGTON",
                            "state": "VA",
                            "zipCode": "24550",
                            "zipCode4": "4432",
                            "county": "",
                            "countryCode": "",
                            "secondaryAddress": null,
                            "addressLine1": "11317 LEESVILLE RD",
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "emailId": "BSETTLES1994@GMAIL.COM",
                            "fipsCode": "5103100000",
                            "attention": null,
                            "phoneNumber": "5406767481",
                            "preferFirstName": null,
                            "preferLastName": null
                        }
                    },
                    "errorCode": ""
                }
            }

        },
        "viewReceiptContentPDF": {
            "viewReceipt": "here's the receipt",
            "viewreceiptpdcContent": {
                viewReceipt: "yes",
                "viewReceiptArr": [{
                    "categoryName": "GR"
                }]
            },
            "viewReceiptArr": [{ "categoryName": "GR" }], "length": 2, "isNext": true, "isPrev": true
        },
        showROViewPrintReceipt: true,
        listMtnAndAgreement: [{
            "response": [
                {
                    "mtn": "8329343434",
                    "agreement": "23453045"
                },
                {
                    "mtn": "8329343454",
                    "agreement": "23453045"
                },
                {
                    "mtn": "832934334343",
                    "agreement": "23453045"
                }
            ]
        }],
        refreshActivationStatus: [{
            mobileNumber: 3019565262,
            activationMessage: "Active"
        }],
        documentReceiptsItems: [
            {
                name: "Ring agreement",
                btn1: "Email",
                btn2: "Print",
                id: "isRingAgreement",
                show: "isRingAgreement"
            },
            {
                name: "QR code",
                btn1: "Email",
                btn2: "Print",
                btn3: "View",
                id: "isQRCode",
                show: "isQRCode"
            },
            {
                name: "Return Label",
                btn1: "View",
                id: "IsReturnLabel",
                show: "IsReturnLabel"
            },
            {
                name: "Phone/Smart Watch trade in shipping label",
                btn1: "Email",
                btn2: "Print",
                id: "upsShippingLabel",
                show: "upsShippingLabel"
            },
            {
                name: "Tablet trade in shipping label",
                btn1: "Email",
                btn2: "Print",
                id: "tabletUpsShippingLabel",
                show: "tabletUpsShippingLabel"
            },
            {
                name: "Gift receipt",
                btn1: "Email",
                btn2: "Print",
                id: "giftReceipt",
                show: "giftReceipt"
            },
            {
                name: "Customer agreement ",
                btn1: "Email",
                btn2: "Print",
                id: "customerAgreement",
                show: "customerAgreement"
            },
            {
                name: "Device payment agreement ",
                btn1: "Email",
                btn2: "Print",
                id: "devicePaymentAgreement",
                show: "devicePaymentAgreement"
            },
            {
                name: "EdgeUp Buyout Payment Receipt",
                btn1: "View Receipt",
                id: "buyOutPaymentReceipt",
                show: "buyOutPaymentReceipt"
            },
            {
                name: "Purchase receipt",
                btn1: "Email",
                btn2: "Print",
                btn3: "sms",
                id: "purchaseReceipt",
                show: "purchaseReceipt"
            },
            {
                name: "Trade-In receipt",
                btn1: "",
                btn2: "Print",
                id: "tradeInReceipt",
                show: "tradeInReceipt"
            }

        ],
    },
    OrderReview: {
        "store": {
            "cart": {
                "lineDetails": {
                    "lineInfo": [{
                        "itemsInfo": [{
                            "depletionType": "L",
                            "attention": "TOM MANNING",
                            "shipping": {
                                "shipToCustomerAddress": false
                            },
                        }
                        ]
                    }
                    ]
                }
            }
        }
    },
    tradeInDetails: [{ "trackingNo": "1Z90A26F9000395975", "deviceCategory": "Smart Phone" }, { "trackingNo": "1Z90A26F9000395975", "deviceCategory": "tablet" }],
    landing: {
        "customerInfo": { "locationSubType": "RX" },
        "cartDetails": {}
    },

    "App": { "CustomerType": "N" },
    isLoading: false,
    error: null,
    OrderConfirmationData: "",
    showActivationStatusModal: false,
    activationStatus: [{
        mobileNumber: 9083322646,
        contractAcceptanceStatusCode: "A"
    }],
}

export const orderDocumentsReceiptRerenderProps = {
    viewreceiptpdcContent: {
        viewReceipt: "yes",
        "viewReceiptArr": [{
            categoryName: "G"
        }]
    },
    OrderConfirmation: {
        showEMailModal: true,
        "showViewModal": true,
        showLabelModal: true,
        printerDevices: [],
        readOrderViewAndPrintReceipt: {
            "documents": [],
            "orderConfirmationReceiptFlags": null,
            "upsShipmentLabelDetails": [
                {
                    "tahTrackingNumber": "1Z90A26F9000395975",
                    "isPrintShipLabelAllowed": true,
                    "upsShipmentLabel": { "viewReceiptArr": [{ "categoryName": "GR" }], "data": "R0lGODlheAUgA/c7U8QpFddX7RGX1KUoHdPVVMGOlNShEb5VJVV17jW5WX4uyFT9ggw3LS2N35TVZyfhz9lloo5V2WmqrtfZabLPVdltuu/X2W3DDFXdccss191x001V3XXaxZfa7duOVd15667X3Xnzz1Xdffvv191+AAxaYv3dzCggAOw==" }
                }
            ],
            "paymentAgreement": false,
            "devicePaymentAgreement": true,
            "purchaseReceipt": false,
            "customerAgreement": true,
            "paymentReceipts": [
                {
                    "mobileNumber": "8644195446",
                    "labelType": "buyout"
                }
            ],
            "returnLabels": [
                {
                    "mobileNumber": "8644195446"
                }
            ],
            "isEdgeUp": false,
        },
        OrderConfirmationData: {
            "data": {
                "getConfirmationPage": {
                    "managerApprovalReqInfo": true,
                    "cartId": "e404d341-fbd6-4983-9281-70e1eeea4eff",
                    "myVerizonInd": false,
                    "paymentReceipt": false,
                    "giftReceipt": true,
                    "buyOutPaymentReceipt": true,
                    "devicePaymentAgreement": true,
                    "customerAgreement": true,
                    "isQRCode": true,
                    "IsReturnLabel": true,
                    "purchaseReceipt": true,
                    "tradeInReceipt": true,
                    "isEdgeUp": false,
                    "nextbillSummary": true,
                    "orderConfirmation": false,
                    "isStandAloneTradein": false,
                    "updateEmailInd": true,
                    "paperFreeEnrollmentInd": true,
                    "isTechInstall": false,
                    "techCoachSMSInd": true,
                    "multiDeviceVerizonProtectionSelected": false,
                    "isVerizonProtectionSelected": false,
                    "tradeInInd": false,
                    "isShowComboOrder": false,
                    "tradeInType": null,
                    "contentTransferUpgradeType": "Apple iOS to Apple iOS",
                    "orderStatus": "CO",
                    "orderNumber": "55549",
                    "creditApplicationNum": "505858647",
                    "locationCode": "E111701",
                    "emailAddress": "BSETTLES1994@GMAIL.COM",
                    "accountNumber": "0325909023-1",
                    "installationDate": null,
                    "channelID": "OMNI-INDIRECT",
                    "contentTransfer": true,
                    "preOrBackOrder": false,
                    "confirmationNumber": "",
                    "submissionId": "",
                    "orderActivityType": "EUP",
                    "giftCartBalanceAmount": "0.0",
                    "showGiftCardBalance": false,
                    "generateUpsShipmentLabel": null,
                    "managerApprovalReqInfo": true,
                    "documentsInfo": [

                    ],
                    "loanInfo": [
                        {
                            "installmentLoanNumber": "1587756304",
                            "mobileNumber": "5406767481",
                            "loanStatus": "A"
                        }
                    ],
                    "is5GProfessionalInstall": false,
                    "installAppSelectedDate": {},
                    "assistedContentTransfer": [
                        {
                            "techCoachUrl": "https://my.asurion.com/mobile-device-setup?mxclient=verizon&uuid=609ab784-3348-436e-8a95-05463cd91136&cid=vzw_online",
                            "techCoachSMSInd": "Success",
                            "vzCloudNotification": "",
                            "mtn": "5406767481",
                            "oldDeviceOs": "Apple iOS",
                            "oldDeviceOem": "Apple",
                            "newDeviceOs": "Apple iOS",
                            "newDeviceOem": "Apple"
                        }
                    ],
                    "managerApprovalReqInfo": true,
                    "ispuServices": "",
                    "storeinfo": [
                        {
                            "businessName": null,
                            "retailId": null,
                            "netaceLocationCode": null,
                            "storeStatus": null,
                            "storeName": "Cellular Sales Vinton",
                            "phoneNumber": null,
                            "address1": null,
                            "city": null,
                            "state": "VA",
                            "zipCode": "24179",
                            "fipsCode": "5116181280",
                            "hoursMon": null,
                            "hoursTue": null,
                            "hoursWed": null,
                            "hoursThu": null,
                            "hoursFri": null,
                            "hoursSat": null,
                            "hoursSun": null,
                            "ispuServices": null,
                            "vendor": null,
                            "storePhoneNumber": null,
                            "addressLine2": null,
                            "streetName": null
                        }
                    ],
                    "isRingAgreement": true,
                    "qRCodeOption": [{ "mtn": "123", "qrCodeType": "PixelQrCodeEnabled" },
                    { "mtn": "456", "qrCodeType": " eSimUpgradeQrCodeEnabled " }],
                    "displayActivationStatus": true,
                    "tradeInOrderNumber": "",
                    "fiosAvailabilityCheckUrl": null,
                    "displayFiosContent": false,
                    "isActivateNow": false,
                    "activateNow": [],
                    "returnLabelTns": [],
                    "isPreBackOrderReceipt": false,
                    "d2dFlag": "N",
                    "isAutoMessageSent": false,
                    "isGiftPurchase": false,
                    "returnLabels": [
                        {
                            "mobileNumber": "5406767481"
                        }
                    ],
                    "paymentReceipts": [
                        {
                            "mobileNumber": "5406767481",
                            "labelType": "EdgeUp"
                        }
                    ],
                    "displayPaymentBanner": false,
                    "refundOrderDetails": {
                        "locationCode": null,
                        "orderNum": 0,
                        "creditApplicationNum": 0
                    },
                    "refundCartItems": {},
                    "clnrInfo": {
                        "appointmentInfo": null,
                        "leadId": null
                    },
                    "serviceInfo": {
                        "primaryUserInfo": {
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "address": {
                                "firmName": "",
                                "apartmentNo": "",
                                "streetNumber": "11317",
                                "streetName": "LEESVILLE",
                                "streetType": "RD",
                                "streetDirection": "",
                                "addressLine2": "",
                                "poBoxNo": "",
                                "ruralRouteNo": "",
                                "ruralDelNo": "",
                                "city": "EVINGTON",
                                "state": "VA",
                                "zipCode": "24550",
                                "zipCode4": "4432",
                                "county": "",
                                "countryCode": "",
                                "secondaryAddress": null,
                                "addressLine1": "11317 LEESVILLE RD",
                                "firstName": "BRANDON",
                                "lastName": "SETTLES",
                                "emailId": "BSETTLES1994@GMAIL.COM",
                                "fipsCode": "5103100000",
                                "attention": null,
                                "phoneNumber": "5406767481",
                                "preferFirstName": null,
                                "preferLastName": null
                            },
                            "emailId": "BSETTLES1994@GMAIL.COM"
                        },
                        "priceType": null,
                        "activationDate": null,
                        "activateLaterInd": null,
                        "mtn": "5406767481",
                        "min": "5405889505",
                        "mea": "VRK",
                        "simCardNumber": null,
                        "oldPricePlanId": "50430",
                        "newPricePlanId": null,
                        "contractTermId": "48",
                        "currentDevice": {
                            "oldLteVoraEquipInfo": {
                                "lteVoraDeviceInfo": {
                                    "deviceId": "35807108052081",
                                    "deviceType": "4GE",
                                    "description": "SAMSUNG NOTE 8 MIDNIGHT BLACK",
                                    "capacity": null
                                },
                                "lteEqpt": {
                                    "iccid": "89148000008261035343"
                                }
                            }
                        },
                        "planPrice": null,
                        "selectedFeaturesList": {
                            "featuresCount": 50,
                            "visFeature": []
                        },
                        "planDiscPrice": null,
                        "pricePlanInfo": null,
                        "newPricePlanInfo": null,
                        "correlationID": "110500000103783491",
                        "lineType": null,
                        "trunkMTN": null,
                        "mldTrunkMTN": null,
                        "numberShareInd": null,
                        "isSharePlanAdded": false,
                        "oldPlanFlag": "L",
                        "isAutoPayEnrolled": null,
                        "isPaperLessEnrolled": null,
                        "isAutoPayPaperLessDiscountEligible": null,
                        "totalEligibleAutoPayPaperLessDiscount": null,
                        "isFreeAppleMusicLoss": "N",
                        "sbdOffer": null,
                        "selectedALPShareList": null,
                        "fiveGUpSell": false,
                        "pairingInfo": {},
                        "cart5GAppointment": null,
                        "planDiscount": null,
                        "newPlanFlag": null,
                        "planDetails": null,
                        "serviceAddress": {
                            "firmName": "",
                            "apartmentNo": "",
                            "streetNumber": "11317",
                            "streetName": "LEESVILLE",
                            "streetType": "RD",
                            "streetDirection": "",
                            "addressLine2": "",
                            "poBoxNo": "",
                            "ruralRouteNo": "",
                            "ruralDelNo": "",
                            "city": "EVINGTON",
                            "state": "VA",
                            "zipCode": "24550",
                            "zipCode4": "4432",
                            "county": "",
                            "countryCode": "",
                            "secondaryAddress": null,
                            "addressLine1": "11317 LEESVILLE RD",
                            "firstName": "BRANDON",
                            "lastName": "SETTLES",
                            "emailId": "BSETTLES1994@GMAIL.COM",
                            "fipsCode": "5103100000",
                            "attention": null,
                            "phoneNumber": "5406767481",
                            "preferFirstName": null,
                            "preferLastName": null
                        }
                    },
                    "errorCode": ""
                }
            }

        },
        "viewReceiptContentPDF": {
            "viewReceipt": "here's the receipt",
            "viewreceiptpdcContent": {
                viewReceipt: "yes",
                "viewReceiptArr": [{
                    "categoryName": "GR"
                }]
            },
            "viewReceiptArr": [{ "categoryName": "GR" }], "length": 2, "isNext": true, "isPrev": true
        },
        showROViewPrintReceipt: true,
        listMtnAndAgreement: [{
            "response": [
                {
                    "mtn": "8329343434",
                    "agreement": "23453045"
                },
                {
                    "mtn": "8329343454",
                    "agreement": "23453045"
                },
                {
                    "mtn": "832934334343",
                    "agreement": "23453045"
                }
            ]
        }],
        refreshActivationStatus: [{
            mobileNumber: 3019565262,
            activationMessage: "Active"
        }],
        documentReceiptsItems: [
            {
                name: "Ring agreement",
                btn1: "Email",
                btn2: "Print",
                id: "isRingAgreement",
                show: "isRingAgreement"
            },
            {
                name: "QR code",
                btn1: "Email",
                btn2: "Print",
                btn3: "View",
                id: "isQRCode",
                show: "isQRCode"
            },
            {
                name: "Return Label",
                btn1: "View",
                id: "IsReturnLabel",
                show: "IsReturnLabel"
            },
            {
                name: "Phone/Smart Watch trade in shipping label",
                btn1: "Email",
                btn2: "Print",
                id: "upsShippingLabel",
                show: "upsShippingLabel"
            },
            {
                name: "Tablet trade in shipping label",
                btn1: "Email",
                btn2: "Print",
                id: "tabletUpsShippingLabel",
                show: "tabletUpsShippingLabel"
            },
            {
                name: "Gift receipt",
                btn1: "Email",
                btn2: "Print",
                id: "giftReceipt",
                show: "giftReceipt"
            },
            {
                name: "Customer agreement ",
                btn1: "Email",
                btn2: "Print",
                id: "customerAgreement",
                show: "customerAgreement"
            },
            {
                name: "Device payment agreement ",
                btn1: "Email",
                btn2: "Print",
                id: "devicePaymentAgreement",
                show: "devicePaymentAgreement"
            },
            {
                name: "EdgeUp Buyout Payment Receipt",
                btn1: "View Receipt",
                id: "buyOutPaymentReceipt",
                show: "buyOutPaymentReceipt"
            },
            {
                name: "Purchase receipt",
                btn1: "Email",
                btn2: "Print",
                btn3: "sms",
                id: "purchaseReceipt",
                show: "purchaseReceipt"
            },
            {
                name: "Trade-In receipt",
                btn1: "",
                btn2: "Print",
                id: "tradeInReceipt",
                show: "tradeInReceipt"
            }

        ],
    },
    OrderReview: {
        "store": {
            "cart": {
                "lineDetails": {
                    "lineInfo": [{
                        "itemsInfo": [{
                            "depletionType": "L",
                            "attention": "TOM MANNING",
                            "shipping": {
                                "shipToCustomerAddress": false
                            },
                        }
                        ]
                    }
                    ]
                }
            }
        }
    },
    tradeInDetails: [{ "trackingNo": "1Z90A26F9000395975", "deviceCategory": "Smart Phone" }, { "trackingNo": "1Z90A26F9000395975", "deviceCategory": "tablet" }],
    landing: { "customerInfo": { "locationSubType": "RX" }, "cartDetails": { "lineDetails": { "lineInfo": ["itemsInf"] } } },
    "App": { "CustomerType": "N" },
    isLoading: false,
    error: null,
    OrderConfirmationData: "",
    showActivationStatusModal: false,
    activationStatus: [{
        mobileNumber: 9083322646,
        contractAcceptanceStatusCode: "A"
    }],
}
