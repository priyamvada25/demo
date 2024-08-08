import React, { Component, Fragment } from "react";
import withRouterV6 from "../hoc/withRouterV6";
import { MapTo } from "@adobe/cq-react-editable-components";
import "../OrderConfirmation/OrderConfirmation.css";
import PrimaryButton, { SecondaryButton } from "@vz-soe-utils/button";
import Modal from "@vz-soe-utils/modal";
import withPeripherals from "@vz-soe-utils/withperipherals";
import isEmptyObj  from "lodash/isEmpty";
import pdf2base64 from "pdf-to-base64";
// import { Input } from "@vz-soe-utils/form";
import get from "lodash/get";
import { Input as VdsInput } from "@vds/inputs";
import { connect } from "react-redux";
import Icon from "@vzrf/react-icon";
import Table, {
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  Cell,
} from "@vzrf/react-table";
import { compose } from "redux";
import { has, isEmpty } from "lodash";
import { isIpad } from "../../services/dom.service";
import * as constants from "../OrderConfirmation/constants";
import * as actions from "../OrderConfirmation/actions";
import confirmationSaga from "../OrderConfirmation/saga";
import PageHeader from "../common/PageHeader";
import * as appMessageActions from "../common/AppMessage/actions";
import * as domService from "../../services/dom.service";
import { makeSelectLanding } from "../../pages/Landing/selectors";
import { regenerateReceipts } from "../../pages/Checkout/actions";
import { onKeyPressEvent } from "../../utils/validation";
import BuyoutReturnLabelModel from "./BuyoutReturnLabelModel"
import injectSaga from "../../utils/injectSaga";
import saga from "../../pages/Checkout/saga";

const key = "Checkout";
const confirmKey = "OrderConfirmation";

const OrderDocumentsReceiptsEditConfig = {
  emptyLabel: "Document & Receipts",

  isEmpty() {
    return true;
  },
};

export class OrderDocumentsReceipts extends Component {
  state = {
    showPrint: false,
    // showListMtnModel: false,
    showEdit: [],
    device: this.props.deviceManager && this.props.deviceManager.getInstance(),
    emailList: [],
    saveEmailList: [],
    showIndirectBuyoutDetail :false,
    showRetunLabelDetail :false,
    buyoutEmailId: "",
    returnLabelEmailId: "",
    dpEmailId: "",
    customerAgreementData: ""
  };

  componentDidMount() {
    if (this.props.showViewAndPrintReceipt) {
      this.props.getReadOrderData();
    }
    const showEditCheck = [];
    const emailCheck = [];
    const saveEmailCheck = [];
    if (
      this.props.documentReceiptsItems
      && this.props.documentReceiptsItems.length > 0
    ) {
      this.props.documentReceiptsItems.map((item, i) => {
        showEditCheck.push({
          showEdit: false,
        });
        emailCheck.push({
          emailId: this.props.emailId,
        });
        saveEmailCheck.push({
          emailId: this.props.emailId,
        });
      });
    }
    this.setState({
      showEdit: showEditCheck,
      emailList: emailCheck,
      saveEmailList: saveEmailCheck,
    });
  }

  componentDidUpdate(prevProps) {
    const categoryName = get(this.props, "viewreceiptpdcContent.viewReceiptArr[0].categoryName", "");
    if (
      !isIpad()
      && prevProps.viewreceiptpdcContent !== this.props.viewreceiptpdcContent
      && categoryName === "GR"
    ) {
      this.printDirectThermalPrint();
    }
    if( prevProps.regeneratedReceiptEnabled !== this.props?.regeneratedReceiptEnabled) {
      this.props.getReadOrderData();
    }
    if((this.props.isCostco || this?.props?.isDistributionAgent) && isIpad()
      && prevProps.viewreceiptpdcContent !== this.props.viewreceiptpdcContent
      && !isEmpty(this.props.viewreceiptpdcContent) && typeof this.props.viewreceiptpdcContent == 'string'){
        //CXTDT-372212 : DP agreement not printing
        const shellParams = {
          receiptData: this.props.viewreceiptpdcContent,
          selectedDirectPrinter: {
            printerIP: "",
            printerName: "",
          },
          otherDirectPrinters: [],
        }
        this.props.executeShellFunction("Printer", "directPrint", "none", shellParams);
    }
  }

  // componentWillReceiveProps = (nextProps) => {
  // if(!this.props.readOrderViewAndPrintReceipt) {
  //   if(nextProps.readOrderViewAndPrintReceipt !== this.props.readOrderViewAndPrintReceipt) {
  //     this.setState({
  //       showListMtnModel: !this.state.showListMtnModel,
  //     });
  //   }
  // }
  // else {
  //   this.setState({
  //     showListMtnModel: !this.state.showListMtnModel,
  //   });
  // }
  // }

  printDirectThermalPrint = () => {
    const receiptText = this.props.viewreceiptpdcContent.viewReceipt;
    const copies = "01";
    const popDrawer = "FALSE";
    // barcode info
    const confPageInfo = this.props.orderConfirmationData && this.props.orderConfirmationData.data && this.props.orderConfirmationData.data.getConfirmationPage || null;
    const orderNumber = confPageInfo && confPageInfo.orderNumber || "";
    const location = confPageInfo && confPageInfo.locationCode || "";
    const barcodeParams = {
      orderNumber,
      location,
      hasSignature: false
    }
    if (this.state.device && this.state.device.thermalPrint) {
      this.state.device.thermalPrint.connect(receiptText, copies, popDrawer, barcodeParams);
    }
  };

  sendEmailReceipt = (element, email,roTradeInDetail) => {
    const channelID = sessionStorage.getItem("channel");  
    const { readOrderViewAndPrintReceipt } = this.props;
    console.log("readOrderViewAndPrintReceipt", readOrderViewAndPrintReceipt);
    let shippingLabelData = "";
    let tahTrackingNumber = "";
    readOrderViewAndPrintReceipt
      && readOrderViewAndPrintReceipt.documents?.map((document) => {
        if (element.id === document.documentName) {
          console.log("readOrderViewAndPrintReceipt", document);
          const data = {
            document,
            email,
          };
          this.props.sentEmailRequest(data);
        }
      });
    
    if (element.id === "upsShippingLabel"||element.id==="tabletUpsShippingLabel")
    {
      roTradeInDetail && roTradeInDetail.map(item =>
      {
        if (item.isPrintShipLabelAllowed){
          if (
            (item.deviceCategory === "tablet" &&
              element.id === "tabletUpsShippingLabel") ||
            (item.deviceCategory !== "tablet" &&
              element.id === "upsShippingLabel")
          ) {
            tahTrackingNumber = item.tahTrackingNumber;
            shippingLabelData = item.upsShipmentLabel;
          }
        }
      })
      const data = {
        email,
        shippingLabelData,
        tahTrackingNumber
      };
      this.props.sendUPSEmailReceipt(data);
    }
    if (element.id === "returnLabel")
    {
      if(channelID?.includes("OMNI-INDIRECT") && this.props.readorder )
      {
        const document = {documentName: "returnLabel"} 
        const data = {
          document,
          email,
        };
        this.props.sentEmailRequest(data);
      }
      
    }
  };

  showModal = (element) => {
    this.props.toggleEmailModal(element);
  };

  QRview = (element) => {
    if (isIpad()) {
      this.props.toggleViewModal(element);
    }
    const qrCode = has(
      this.props.orderConfirmationData,
      "data.getConfirmationPage.qRCodeOption",
    )
      ? this.props.orderConfirmationData.data.getConfirmationPage
        .qRCodeOption[0].qrCodeType
      : "";
    this.props.history.navigatePage(
      `${domService.getUIContextPath()}${
        constants.QRCODE_VIEW
      }?type=${qrCode}`,
    );
    // window.open(`${constants.QRCODE_VIEW}?type=${qrCode}`,"_blank");
  };

  onHide = (data) => {
    if (this.props.readorder || data === "indirect") {
      this.props.showROrViewAndPrintReceipt();
      // this.setState({
      //   showListMtnModel: false,
      // });
    }
    this.setState({ showPrint: false });
  };
  openBuyoutPrintModal(element, emailId) {
    const channelID = sessionStorage.getItem("channel");  
 if ((this.props.channel || channelID)?.includes("OMNI-INDIRECT")){

    if(element.id === "buyOutPaymentReceipt" || (element.id === "isEdgeUp" && element.name && element.name.toLowerCase() ==="edgeup buyout payment receipt")) {
      this.setState({showIndirectBuyoutDetail: true, buyoutEmailId: emailId});
      return;
    }
    if(element.name === "Return Label") {
      this.setState({showRetunLabelDetail: true, returnLabelEmailId: emailId});
      return;
    }
  }
}

  openPrint = (element, roTradeInDetail, emailId) => {
    const channelID = sessionStorage.getItem("channel");    
    if (
      isIpad()
      && !this.props.printerDevices.length
      && !this.props.isGetDevicesLoading
      && !(this.props.channel?.includes("OMNI-INDIRECT"))
    ) {
      this.props.retrievePrinterDevices();
    }
    console.log("############################################", element);
    if (element.id === "customerAgreement") {
      let documentData;
      if (this.props.readorder)
      {
        const documentsInfo = this.props.readOrderViewAndPrintReceipt
          && this.props.readOrderViewAndPrintReceipt.documents
          && this.props.readOrderViewAndPrintReceipt.documents.filter(
            (obj) => obj.documentName === element.id,
          );
  
         documentData = documentsInfo
          && documentsInfo.find((item) => item.documentName && element.id);

      } else{ 
        const documents = get(
          this.props,
          "orderConfirmationData.data.getConfirmationPage.documentsInfo",
        );
        console.log("###################################Priiii>>", this.props.orderConfirmationData.data);
         documentData = documents.find(
          ({ documentName }) => documentName && documentName === element.id,
        );
      }         
      if ((this.props.channel || channelID)?.includes("OMNI-INDIRECT")) {
        this.props.getIndirectViewReceipt(documentData);
        if(!isIpad()){
          this.props.toggleViewModal(element);
        }
        return;
      } else if (isIpad()) {
        //CXTDT-372212 : costco CA not printing
        if(this.props.isCostco || this?.props?.isDistributionAgent){
          let shellParams = {
            receiptData: "",
            selectedDirectPrinter: {
              printerIP: "",
              printerName: "",
            },
            otherDirectPrinters: [],
          }
          if(this.state.customerAgreementData) {
            shellParams.receiptData = this.state.customerAgreementData;
            this.props.executeShellFunction("Printer", "directPrint", "none", shellParams);
          } else {
            pdf2base64(constants.CUSTOMER_AGREEMENT).then(
              (response) => {
                console.log(response);
                shellParams.receiptData = response;
                this.props.executeShellFunction("Printer", "directPrint", "none", shellParams);
                this.setState({ customerAgreementData: (response !== "" && typeof response !== "undefined") ? response : "" });
              },
            ).catch(
              (error) => {
                console.log(error);
              },
            );
          }
        } else{
          this.props.toggleViewModal(element);
        }
        return;
      } else {
        window.open(constants.CUSTOMER_AGREEMENT, "_blank");
        return;
      }
    }
    if (element.id === "isRingAgreement") {
      if (isIpad()) {
        this.props.toggleViewModal(element);
        return;
      }
      window.open(constants.RING_AGREEMENT, "_blank");
      return;
    }
    if (element.id === "upsShippingLabel"||element.id==="tabletUpsShippingLabel")
    { 
      let upsShippingLabel = "";
      let tahTrackingNumber = [];
      roTradeInDetail && roTradeInDetail.map(item =>
      {
        if (item.isPrintShipLabelAllowed){
          if (
            (item.deviceCategory === "tablet" &&
              element.id === "tabletUpsShippingLabel") ||
            (item.deviceCategory !== "tablet" &&
              element.id === "upsShippingLabel")
          ) {
            tahTrackingNumber.push({
              trackingNumber: item.tahTrackingNumber
            });
            upsShippingLabel = item.upsShipmentLabel;
          }
        }
      })
        let req = {
          upsShippingLabelReceipt: upsShippingLabel,
          tahTrackingNumber: tahTrackingNumber
        };
        this.props.printTradeInReceiptRO(req);        
        this.props.toggleViewModal(element);
        return
    }
      if (element.id === "devicePaymentAgreement") {
        if ((channelID || this.props.channel)?.includes("OMNI-INDIRECT")) {
          this.props.showIndirectLoanDetail();
          this.setState({dpEmailId: emailId});
         // this.props.showROrViewAndPrintReceipt();
          // this.setState({
          //   showListMtnModel: !this.state.showListMtnModel
          // });
          //this.props.getListOfLineAndAgreement();
          // this.props.toggleViewModal(element);
          return;
        } else if (this.props.readorder) {
          // this.onHide();
          const { locationCode, installmentContractInfo } = this.props;
          const req = {
            data: {
              locationCode,
              installmentDetails: installmentContractInfo
            }
          };
          this.props.getRODPReceipt(req);
          this.props.toggleViewModal(element);
          return;
        } else {
          this.props.getDevicePaymentReceipt();
          this.props.toggleViewModal(element);
          return;
        }
      }
    if (element.id === "isQRCode") {
      const qrCode = has(
        this.props.orderConfirmationData,
        "data.getConfirmationPage.qRCodeOption",
      )
        ? this.props.orderConfirmationData.data.getConfirmationPage
          .qRCodeOption[0].qrCodeType
        : "";
      this.props.history.navigatePage(
        `${domService.getUIContextPath()}${
          constants.QRCODE_VIEW
        }?type=${qrCode}`,
      );
      return;
    }
    console.log('ordrconf>> ',this.props.orderConfirmationData.orderConfirmationData);
      const documents = get(
        this.props,
        "orderConfirmationData.data.getConfirmationPage.documentsInfo",
      );
      let documentData;
     console.log(documents +'   documents');
      const { readOrderViewAndPrintReceipt } = this.props;
      console.log("readOrderViewAndPrintReceipt", readOrderViewAndPrintReceipt);
      if (this.props.readorder) {
        const documentsInfo = this.props.readOrderViewAndPrintReceipt
          && this.props.readOrderViewAndPrintReceipt.documents
          && this.props.readOrderViewAndPrintReceipt.documents.filter(
            (obj) => obj.documentName === element.id,
          );
        documentData = documentsInfo
          && documentsInfo.find((item) => item.documentName && element.id);
                if (element.id === "giftReceipt" || element.id === "tradeInReceipt") {
                  if (!isIpad()) {
                    this.props.getViewReceipt(documentData);
                    this.props.setPrintElement(element);
                    if(element.id === "tradeInReceipt" && (this.props.channel||channelID)?.includes("OMNI-INDIRECT")) {
                      this.props.toggleViewModal(element);
                    }
                    return;
                  }
                }
      } else if (
        element.id === "giftReceipt"
        || element.id === "tradeInReceipt"
      ) {
        documentData = documents.filter(
          ({ documentName }) => documentName && documentName === element.id,
        );
        if (!isIpad()) {
          this.props.getViewReceipt(documentData);
          this.props.setPrintElement(element);
          if(element.id === "tradeInReceipt" && (this.props.channel||channelID)?.includes("OMNI-INDIRECT")) {
            this.props.toggleViewModal(element);
          }
          return;
        }
      } else {
        console.log('Prrrrrrrr>>'+documents+'name+   '+element.id);
        documentData = documents.find(
          ({ documentName }) => documentName && documentName === element.id,
        );
      }
      console.log("OrderDocumentsReceipts -> toggle modal");
      this.props.toggleViewModal(element);
      const selfProps = this.props;
      if(this.props.channel?.includes("OMNI-INDIRECT") && element.id === "paymentReceipt") {
        this.props.getIndirectViewReceipt(documentData);
        return;
      }
      if(this.props?.channel?.includes('OMNI-RETAIL')){
      setTimeout(() => {
        console.log("OrderDocumentsReceipts -> viewreceipt");
        selfProps.getViewReceipt(documentData);
      }, 100);
      }
    if( element.id === "buyOutPaymentReceipt"|| element.id === "isEdgeUp"){

      const documents = (this.props.readorder && channelID?.includes("OMNI-INDIRECT") && this.props.showListMtnModel && this.props.readOrderViewAndPrintReceipt?.documents) ? this.props.readOrderViewAndPrintReceipt?.documents : this.props.orderConfirmationData?.data?.getConfirmationPage?.documentsInfo;
      let documentData;

      documentData = documents && documents.filter(
        ({ documentName }) => documentName && documentName === "buyOutPaymentReceipt",
      );
      if(documentData?.length > 0){
          documentData[0].mtn = element.mtn;
      }
        this.props.getViewReceipt(documentData);
        this.props.setPrintElement(element);
        // this.props.toggleViewModal(element);
        this.closeBuyoutModal();
        return;      
    }
    else if( element.id === "returnLabel"){

      if(this.props.readorder && channelID.includes("OMNI-INDIRECT") && this.props.showListMtnModel) {
        if (!isIpad()) {
          this.props.getLabelReceipt(element);
          this.props.setPrintElement(element);
          return;
        }
        this.props.getLabelReceipt(element);
        this.props.toggleViewModal(element);
        this.closeReturnModal(); 
        return;
      }
      if (!isIpad() && channelID.includes("OMNI-INDIRECT")) {
        this.props.getLabelReceipt(element);
        this.props.setPrintElement(element);
        return;
      }
      this.props.getLabelReceipt(element);
      setTimeout(()=>{
        this.props.toggleViewModal(element);
      },10);
      return;
    }
  };

  openSMS = (element) => {
    this.props.toggleSMSModal(element);
  };

  openLabel = (element) => {
    this.props.toggleLABELModal(element);
  };

  documentName = (element,roTradeInDetail) => {
    const channelID = sessionStorage.getItem("channel");    
    if (this.props.readorder) {
      let isValid = false;
      this.props.readOrderViewAndPrintReceipt
        && this.props.readOrderViewAndPrintReceipt.documents
        && this.props.readOrderViewAndPrintReceipt.documents.map((obj) => {
          if (obj.documentName === element.id) {
            isValid = true;
          }
        });
      roTradeInDetail && roTradeInDetail.length > 0 && roTradeInDetail.map((item) =>
      {
        if (((item.deviceCategory === "tablet" && element.id === "tabletUpsShippingLabel") || (item.deviceCategory!== "tablet" && element.id === "upsShippingLabel")) && item.isPrintShipLabelAllowed)
        {
          isValid = true
        }
      })

      if(element.id === "IsReturnLabel" && channelID?.includes("OMNI-INDIRECT") && this.props.readorder && this.props.showListMtnModel && this.props.readOrderViewAndPrintReceipt && this.props.readOrderViewAndPrintReceipt.returnLabels && this.props.readOrderViewAndPrintReceipt.returnLabels.length > 0)
      {
        isValid = true
      }
      return isValid;
    }
    const preOrBackOrder = this.props.orderConfirmationData?.data?.getConfirmationPage?.preOrBackOrder;
    if(this.props.channel?.indexOf('INDIRECT') > -1 && element.id !== "devicePaymentAgreement" && this.props.depletionType === "F" && !preOrBackOrder && !this.props.isReadOrder && !this.has5GOr4GLTELines() && !this.props.shipToCustomerAddress) {
      return false;
     }
     console.log('this.props.orderConfirmationData?.data?.getConfirmationPage' +this.props.orderConfirmationData);
     // When we have both edgeup and buyout , will show only EdgeUp
    if(this.props.channel?.indexOf('INDIRECT') > -1 && element.id === "buyOutPaymentReceipt" && this.props.orderConfirmationData?.data?.getConfirmationPage &&
     this.props.orderConfirmationData.data.getConfirmationPage[element.id]
     && this.props.orderConfirmationData.data.getConfirmationPage.isEdgeUp && !this.nonZeroBuyOutAmt()){
       return false;
     }
    if (
      this.props.orderConfirmationData
      && this.props.orderConfirmationData.data
      && this.props.orderConfirmationData.data.getConfirmationPage
      && this.props.orderConfirmationData.data.getConfirmationPage[element.id]
        === true
    ) {
      return true;
    }
    return false;
  };

  // Commenting below code as its not required
  // b64toBlob = (content, contentType) => {
  //   contentType = contentType || "";
  //   const sliceSize = 512;
  //   // method which converts base64 to binary
  //   const byteCharacters = window.atob(content);

  //   const byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);
  //     const byteNumbers = new Array(slice.length);
  //     for (let i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   const blob = new Blob(byteArrays, {
  //     type: contentType
  //   }); // statement which creates the blob
  //   return blob;
  // };

  updateEmailAddress = (value, index) => {
    const emailListData = this.state.emailList;
    emailListData[index].emailId = value;
    this.setState({
      emailList: emailListData,
    });
  };

  handleOnBlurEmailId = (value, index) => {
    const emailListData = this.state.emailList;
    emailListData[index].emailId = value.replace(/\s/g, '');
    this.setState({
      emailList: emailListData,
    });
  };

  showModalForPrint = (data) => {
    const element = {
      name: "Device payment agreement ",
      id: "devicePaymentAgreement",
    };
    this.props.retrieveOCIndirectDpAgreementRequest(data);
    /**
     * For indirect ipad we need to call shell function to print DP agreement
     */
    if (!(isIpad() && this.props.channel?.includes('OMNI-INDIRECT'))) {
      this.props.toggleViewModal(element);
    }
  };

  refreshStatus = (installmentLoanNumber) => {
    this.props.refreshActivationStatus(installmentLoanNumber);
  };

  edit = (i) => {
    // debugger
    const temp = this.state.showEdit;
    temp[i].showEdit = !temp[i].showEdit;
    this.setState({
      showEdit: temp,
    });
  };

  save = (i) => {
    window.store.dispatch(appMessageActions.clearAppMessages());
    const email = this.state.emailList[i].emailId;
    const isValid = email && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!isValid) {
      this.props.addAppMessage("Enter a valid email address", "error");
    } else {
      const temp = this.state.showEdit;
      temp[i].showEdit = !temp[i].showEdit;
      const emailListData = this.state.saveEmailList;
      emailListData[i].emailId = this.state.emailList[i].emailId;
      this.setState({
        showEdit: temp,
        saveEmailList: emailListData,
      });
    }
  };

  closeDpModal = () => {
    this.props.showIndirectLoanDetail()
    this.onHide();
  }
  nonZeroBuyOutAmt = () =>{
    
    let { lineInfo } = this.props;
    console.log('>>>> nonzer11o'+this.props.lineInfo);
    let edgeUpAmt = lineInfo && lineInfo[0]?.itemsInfo[0]?.cartItems?.cartItem?.filter(item => {
      return item.itemCode === "EDGEUPPMT"
    });
    console.log('PRIYA >>>>'+edgeUpAmt[0]);
    return edgeUpAmt && edgeUpAmt[0].itemPrice > 0;
  }
  has5GOr4GLTELines = () => {
    let { lineInfo } = this.props;
    let fivegOr4GInternet = lineInfo && lineInfo[0]?.itemsInfo[0]?.cartItems?.cartItem?.filter(item => {
      return item.networkBandwidthType === "LTE" || item.networkBandwidthType === "MMW" || item.networkBandwidthType === "CBD"
    });
    return fivegOr4GInternet && fivegOr4GInternet.length > 0;
  }
  closeBuyoutModal = () => {
    this.setState({showIndirectBuyoutDetail:false});
    this.onHide();
  }
  closeReturnModal = () => {
    this.setState({showRetunLabelDetail:false});
    this.onHide();
  }

  getActivationStatus = (list) => {
    const { activationStatus } = this.props;
    let refreshStatus = list?.loanStatus === "A" ? "Approved" : list?.loanStatus === "C" ? "Cancelled" : list?.loanStatus === "P" ? "Pending" : "Nothing Received";
    if (activationStatus?.length > 0) {
      const { installmentLoanNumber = "" } = list;
      const status = installmentLoanNumber && activationStatus.find(loan => loan.loanNumber === installmentLoanNumber);
      if (status?.contractAcceptanceStatusCode === 'A') {
        refreshStatus = 'Approved'; 
      }
    }
    return refreshStatus;
  }

  roDisplayErrorMeesage = () => {
    return (
      <div className="bold u-paddingLeftLarge u-paddingY28 u-marginTop10 u-borderBottomGray" tabIndex="0">
        <Icon
          lineColor="#ffbc3d"
          name="info"
          size="24"
          style={{
            marginRight: "5px",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
        There was an issue while generating the receipt. Please&nbsp;
        <span
          className="u-colorInfo u-textUnderline u-cursorPointer u-textBold" tabIndex="0" role="button"
          onClick={() => this.props.regenerateReceipts(this.props.history)} onKeyPress={(e)=>onKeyPressEvent(e) && this.props.regenerateReceipts(this.props.history)}
        >
          click here
        </span>
        &nbsp;to generate receipt
      </div>
    )
  }
  render() {
    const { viewPrintContent, channel, listMtnAndAgreementId, showIndirectDpDetail, viewDpAgreement, isReadOrder ,depletionType} = this.props;
    const channelID = sessionStorage.getItem("channel");
    const {showIndirectBuyoutDetail, showRetunLabelDetail} = this.state;
    const { showListMtnModel } = this.props;
    const ncdisabled = (this.props.customerType && this.props.customerType === "N" && channel === "OMNI-TELESALES") ? true : false
    const isDoorToDoor = (channel && channel.indexOf("OMNI-D2D") >-1)?true:false;
    const preOrBackOrder = this.props.orderConfirmationData
      && this.props.orderConfirmationData.data
      && this.props.orderConfirmationData.data.getConfirmationPage.preOrBackOrder;
    const isRfexFlow = sessionStorage.getItem("refundexchange");
    const isRetail = sessionStorage.getItem("channel") && sessionStorage.getItem("channel").includes("OMNI-RETAIL");

    let renderFlag = true;
    let tradeInDetail = this.props.tradeInDetail;
    //let nonZeroBO = this.nonZeroBuyOutAmt();
    let is5GLine = this.has5GOr4GLTELines();
    let roTradeInDetail = has(this.props.readOrderViewAndPrintReceipt, "upsShipmentLabelDetails") ? this.props.readOrderViewAndPrintReceipt.upsShipmentLabelDetails : [];
    const intendTypeADEX =  sessionStorage.getItem("intentType");
    tradeInDetail && tradeInDetail.length > 0 && tradeInDetail.map((item,index) =>
        {
          roTradeInDetail && roTradeInDetail.length > 0 && roTradeInDetail.map((ro,indx) =>
          {
            if ((item.trackingNo === ro.tahTrackingNumber) && ro.isPrintShipLabelAllowed)
            {
              roTradeInDetail[indx].deviceCategory = item.deviceCategory && item.deviceCategory.toLowerCase();
            }
          })
    })
    console.log("roTradeInDetail", roTradeInDetail);
    
    const renderDocuments = () => {
      if (preOrBackOrder && !channel?.includes("OMNI-INDIRECT")) {
        // needs to display documents for INDIRECT
        renderFlag = false;
      }
      if (
        channel?.includes("OMNI-INDIRECT") &&
        (this.props?.orderConfirmationData?.data?.getConfirmationPage
            ?.documentsInfo?.length === 0)
      ) {
        // needs to hide documents for INDIRECT if docInfo is empty.
        renderFlag = false;
      }
      if (channel?.includes("OMNI-INDIRECT") && (depletionType === "L" ||
        (depletionType === "F" && isReadOrder && !preOrBackOrder ) || (is5GLine && this.props?.orderConfirmationData?.data?.getConfirmationPage
        ?.documentsInfo?.length !== 0))
      ) {
        renderFlag = true;
      }
      if (
        has(
          this.props,
          "orderConfirmationData.data.getConfirmationPage.managerApprovalReqInfo"
        )
        && this.props.orderConfirmationData.data.getConfirmationPage
          .managerApprovalReqInfo
      ) {
        renderFlag = false;
        console.log("doc hidden");
      }
    };
  renderDocuments();
    // Testing to validate if the respective iframe content is required.
    // if (viewPrintContent && viewPrintContent.receiptData) {
    //   this.printPreview(viewPrintContent.receiptData);
    // }
    console.log(
      "this.props.documentReceiptsItems",
      this.props.documentReceiptsItems,
    );
    let content, IndirectDpContent;
    if (
      showIndirectDpDetail
      && showListMtnModel && this.props.readorder
      && channelID?.includes("OMNI-INDIRECT") && this.props.readOrderViewAndPrintReceipt?.loanInfo 
    ) {
      IndirectDpContent = (
        /**
         * We have an another modal to show on top of this
         * which has the fixed z-index value 999
         * so, reducing the z-index value to 998 here
         * specific to INDIRECT
         */
        <div className="custom-modal" style={{ zIndex: 999 }}>
          <div className="custom-modal-inner">
            <PageHeader
              pageHeaderText={"Device payment agreement"}
              hasCloseButton
              onCloseClick={this.closeDpModal}
            />
            <div className="custom-modal-body u-paddingTop108 u-paddingXLarge">
              {/* <div className="bold u-paddingLeftLarge text-grey u-text20 u-paddingTopExtraLarge u-paddingBottomExtraLarge">
            Device payment agreement
          </div> */}
              <Table className="u-paddingLeftMedium u-paddingTopExtraLarge u-borderAllGray">
                <TableHead className="u-borderTopBlack">
                  {this.props.headerTitle &&
                    this.props.headerTitle.map((label, index) => (
                      <TableHeader key={index} className="u-paddingBottomLarge">
                        <span
                          style={{ background: "none" }}
                          className="u-paddingBottomSmall bold u-cursorPointer"
                        >
                          {label.title ? label.title : "Line #"}
                        </span>
                      </TableHeader>
                    ))}
                </TableHead>
                <TableBody>
                  {this.props.readOrderViewAndPrintReceipt?.loanInfo.map(
                    (list, index) =>
                      !isEmptyObj(list) && (
                        <TableRow key={index}>
                          <Cell>
                            <div className="u-paddingBottomMedium contains-PII">
                              {list.mobileNumber}
                            </div>
                          </Cell>
                          <Cell>
                            <div className="u-paddingBottomMedium contains-PII">
                              {list.installmentLoanNumber}
                            </div>
                          </Cell>
                          <Cell>
                            <div className="u-paddingBottomMedium">
                              {this.getActivationStatus(list)}
                            </div>
                          </Cell>
                          <Cell>
                            <div>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                data-testid={`loanPrint ${list.installmentLoanNumber}`}
                                onClick={() =>
                                  this.showModalForPrint(
                                    list.installmentLoanNumber
                                  )
                                }
                              >
                                Print
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.sendEmailReceipt(
                                    { id: "devicePaymentAgreement", mtn: list.mobileNumber },
                                    this.state.dpEmailId,
                                  )
                                }
                              >
                                {"Email"}
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "150px" }}
                                onClick={() =>
                                  this.refreshStatus(
                                    list?.installmentLoanNumber
                                  )
                                }
                              >
                                {"Refresh"}
                              </SecondaryButton>
                            </div>
                          </Cell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      );
    }
    if (showListMtnModel && this.props.readorder) {
      let isPurchaseReceiptPresent = false;
       if(this.props?.readOrderViewAndPrintReceipt?.documents?.find(rec => rec.documentName === "purchaseReceipt") ) {
        isPurchaseReceiptPresent = true;
       }
      if (!this.props.documentReceiptsItems || this.props?.documentReceiptsItems?.length === 0 ||
        !this.props.readOrderViewAndPrintReceipt || this.props?.readOrderViewAndPrintReceipt?.documents?.length === 0 || !isPurchaseReceiptPresent) {
        content = this.roDisplayErrorMeesage();
      }
    if(this.props?.documentReceiptsItems?.length > 0 && this.props?.readOrderViewAndPrintReceipt?.documents?.length > 0) {
      content =
      <>
      { !isPurchaseReceiptPresent && <div> {this.roDisplayErrorMeesage()}</div>}
        { this.props.documentReceiptsItems.map((element, i) => (
          <div key={i}>
            {this.documentName(element, roTradeInDetail) && (
              <div className="Grid Grid--gapless border-bottom-grey-light u-paddingYLarge u-flexAlignItemsCenter">
                <div
                  className="Col Col--5 bold font-18 u-paddingLeftLarge"
                  tabIndex="0"
                >
                  {element.name}
                </div>
                <div className="Col Col--7 u-paddingXExtraLarge ">
                  {!ncdisabled && !isDoorToDoor &&
                    element.btn2 &&
                    element.btn2.toLowerCase() === "print" && (
                      <SecondaryButton                      
                        data-testid={`${element.id} Print`}
                        size="small"
                        className="font-14 Button--secondary u-marginTopNone u-marginBottomSmall"
                        style={{ width: "170px" }}
                        onClick={() => this.openPrint(element, roTradeInDetail, this.state.saveEmailList[i].emailId)}
                        disabled={ncdisabled}
                      >
                        {element.id === "devicePaymentAgreement" && channelID?.includes("OMNI-INDIRECT") ? viewDpAgreement :element.btn2}
                      </SecondaryButton>
                    )}
                  {/* } */}
                  {(element.id === "devicePaymentAgreement" && channelID?.includes("OMNI-INDIRECT") ? false : true) && element.btn1 && element.btn1.toLowerCase() === "email" && (
                    <SecondaryButton
                      data-testid={`${element.id} Email`}
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomSmall"
                      style={{ width: "170px" }}
                      onClick={() =>
                        this.sendEmailReceipt(
                          element,
                          this.state.saveEmailList[i].emailId,
                          roTradeInDetail
                        )
                      }
                    >
                      {element.btn1}
                    </SecondaryButton>
                  )}
                  {channelID?.includes("OMNI-INDIRECT") && element.btn1 && (element.btn1.toLowerCase() === "view receipt" || element.btn1.toLowerCase() === "view") && (
                    <SecondaryButton
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                      style={ { width: "170px" }}
                      data-testid={`${element?.id + " " + element?.btn1}`}
                      onClick={() => this.openBuyoutPrintModal(element
                        ,this.state.saveEmailList[i].emailId)}
                    >
                      {element.btn1}
                    </SecondaryButton>
                  )}
                  {element && element.id !== "tradeInReceipt" && (
                    <div className="u-textRight">
                      {this.state.showEdit &&
                        this.state.showEdit[i] &&
                        !this.state.showEdit[i].showEdit && (
                          <div>
                            <span className="u-paddingRightSmall  font-18">
                              {this.state.emailList[i] &&
                                this.state.emailList[i].emailId}
                            </span>
                            <span data-testid={`${element.id} Edit`}
                              className="u-textBold u-cursorPointer u-text14 u-textUnderline"
                              onMouseDown={(e) => this.edit(i)}
                            >
                              {" "}
                              Edit{" "}
                            </span>
                          </div>
                        )}
                      {this.state.showEdit &&
                        this.state.showEdit[i] &&
                        this.state.showEdit[i].showEdit && (
                          <div className="u-paddingTopSmall contains-PII">
                            <VdsInput
                              type="text"
                              name="email"
                              iconName="index"
                              value={
                                this.state.emailList[i] &&
                                this.state.emailList[i].emailId
                                  ? this.state.emailList[i].emailId
                                  : ""
                              }
                              onChange={(e) =>
                                this.updateEmailAddress(e.target.value, i)
                              }
                              onBlur={(e) =>
                                this.handleOnBlurEmailId(e.target.value, i)
                              }
                            />
                            <div className="u-paddingTopSmall">
                              <div data-testid={`${element.id} Save`} onMouseDown={() => this.save(i)}>Save</div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        </>
    }
  } else if (
      showIndirectDpDetail
      && this.props.orderConfirmationData
      && this.props.orderConfirmationData.data
      && this.props.orderConfirmationData.data.getConfirmationPage
      && this.props.orderConfirmationData.data.getConfirmationPage.loanInfo
      && channel?.includes("OMNI-INDIRECT")
    ) {
      content = (
        /**
         * We have an another modal to show on top of this
         * which has the fixed z-index value 999
         * so, reducing the z-index value to 998 here
         * specific to INDIRECT
         */
        <div className="custom-modal" style={{ zIndex: 998 }}>
        <div className="custom-modal-inner">
                  <PageHeader
                    pageHeaderText={'Device payment agreement'}
                    hasCloseButton
                    onCloseClick={this.closeDpModal}
                  />
        <div className="custom-modal-body u-paddingTop108 u-paddingXLarge">
          {/* <div className="bold u-paddingLeftLarge text-grey u-text20 u-paddingTopExtraLarge u-paddingBottomExtraLarge">
            Device payment agreement
          </div> */}
          <Table className="u-paddingLeftMedium u-paddingTopExtraLarge u-borderAllGray">
            <TableHead className="u-borderTopBlack">
              {this.props.headerTitle
                && this.props.headerTitle.map((label, index) => (
                  <TableHeader key={index} className="u-paddingBottomLarge">
                    <span
                      style={{ background: "none" }}
                      className="u-paddingBottomSmall bold u-cursorPointer"
                    >
                      {label.title ? label.title : "Line #"}
                    </span>
                  </TableHeader>
                ))}
            </TableHead>
            <TableBody>
              {this.props.orderConfirmationData.data.getConfirmationPage.loanInfo.map(
                    (list, index) =>
                      !isEmptyObj(list) && (
                        <TableRow key={index}>
                          <Cell>
                            <div className="u-paddingBottomMedium contains-PII">
                              {list.mobileNumber}
                            </div>
                          </Cell>
                          <Cell>
                            <div className="u-paddingBottomMedium contains-PII">
                              {list.installmentLoanNumber}
                            </div>
                          </Cell>
                          <Cell>
                            <div className="u-paddingBottomMedium">
                              {this.getActivationStatus(list)}
                            </div>
                          </Cell>
                          <Cell>
                            <div>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                data-testid={`loanPrint ${list?.installmentLoanNumber}`}
                                onClick={() =>
                                  this.showModalForPrint(
                                    list.installmentLoanNumber
                                  )
                                }
                              >
                                Print
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.showModal({
                                    name: "Device payment agreement ",
                                    id: "devicePaymentAgreement",
                                    installmentLoanNumber:
                                      list.installmentLoanNumber,
                                  })
                                }
                              >
                                {"Email"}
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "150px" }}
                                onClick={() => this.refreshStatus(list?.installmentLoanNumber)}
                              >
                                {"Refresh"}
                              </SecondaryButton>
                            </div>
                          </Cell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      );
    }
    else if (
      showIndirectBuyoutDetail
      && this.props.orderConfirmationData?.data?.getConfirmationPage
      && (this.props.orderConfirmationData.data.getConfirmationPage.isEdgeUp || 
        this.props.orderConfirmationData.data.getConfirmationPage.buyOutPaymentReceipt)
      && channel?.includes("OMNI-INDIRECT")
    ) {
      const modalTitle = this.props.orderConfirmationData.data.getConfirmationPage.isEdgeUp ?'isEdgeUp': 'buyOutPaymentReceipt';
      content = (
        /**
         * We have an another modal to show on top of this
         * which has the fixed z-index value 999
         * so, reducing the z-index value to 998 here
         * specific to INDIRECT
         */
        <div className="custom-modal" style={{ zIndex: 998 }}>
        <div className="custom-modal-inner">
                  <PageHeader
                    pageHeaderText={this.props.orderConfirmationData.data.getConfirmationPage.isEdgeUp ?'EdgeUp Buyout Payment Receipt': 'Buyout Payment Receipt'}
                    hasCloseButton
                    onCloseClick={this.closeBuyoutModal}
                  />
        <div className="custom-modal-body u-paddingTop108 u-paddingXLarge">
          {/* <div className="bold u-paddingLeftLarge text-grey u-text20 u-paddingTopExtraLarge u-paddingBottomExtraLarge">
            Device payment agreement
          </div> */}
          <Table className="u-paddingLeftMedium u-paddingTopExtraLarge u-borderAllGray">
                <TableHead className="u-borderTopBlack">

                  <TableHeader className="u-paddingBottomLarge">
                    <span
                      style={{ background: "none" }}
                      className="u-paddingBottomSmall bold u-cursorPointer"
                    >
                      {"Line #"}
                    </span>
                  </TableHeader>

                </TableHead>
            <TableBody>
              {this.props.orderConfirmationData.data.getConfirmationPage?.paymentReceipts?.length && 
              this.props.orderConfirmationData.data.getConfirmationPage?.paymentReceipts?.length >0 &&
               this.props.orderConfirmationData.data.getConfirmationPage.paymentReceipts.map(
                    (list, index) =>
                      !isEmptyObj(list) && (
                        <TableRow key={index}>
                          <Cell>
                            <div className="contains-PII">
                             {list.mobileNumber}
                            </div>
                          </Cell>
                          <Cell>
                            <div>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.openPrint({id: modalTitle, mtn: list.mobileNumber})
                                }
                              >
                                Print
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.showModal({
                                    name: modalTitle === "isEdgeUp"? "EdgeUp Buyout Receipt": "Buyout Receipt",
                                    id: modalTitle,
                                    mtn:
                                      list.mobileNumber,
                                  })
                                }
                              >
                                {"Email"}
                              </SecondaryButton>
                             
                            </div>
                          </Cell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      );
    } 
    else if (
      showRetunLabelDetail
      && this.props.orderConfirmationData?.data?.getConfirmationPage?.returnLabels?.length
      && (this.props.orderConfirmationData.data.getConfirmationPage.returnLabels.length >0)
      && channel?.includes("OMNI-INDIRECT")
    ) {
      content = (
        /**
         * We have an another modal to show on top of this
         * which has the fixed z-index value 999
         * so, reducing the z-index value to 998 here
         * specific to INDIRECT
         */
        <div className="custom-modal" style={{ zIndex: 998 }}>
        <div className="custom-modal-inner">
                  <PageHeader
                    pageHeaderText={'Return Label Details'}
                    hasCloseButton
                    onCloseClick={this.closeReturnModal}
                  />
        <div className="custom-modal-body u-paddingTop108 u-paddingXLarge">
          {/* <div className="bold u-paddingLeftLarge text-grey u-text20 u-paddingTopExtraLarge u-paddingBottomExtraLarge">
            Device payment agreement
          </div> */}
          <Table className="u-paddingLeftMedium u-paddingTopExtraLarge u-borderAllGray">
                <TableHead className="u-borderTopBlack">

                  <TableHeader className="u-paddingBottomLarge">
                    <span
                      style={{ background: "none" }}
                      className="u-paddingBottomSmall bold u-cursorPointer"
                    >
                      {"Line #"}
                    </span>
                  </TableHeader>

                </TableHead>
            <TableBody>
              {this.props.orderConfirmationData.data.getConfirmationPage.returnLabels.map(
                    (list, index) =>
                      !isEmptyObj(list) && (
                        <TableRow key={index}>
                          <Cell>
                            <div className="contains-PII">
                             {list.mobileNumber}
                            </div>
                          </Cell>
                          <Cell>  
                            <div>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.openPrint({id: "returnLabel",mtn: list.mobileNumber})
                                }
                              >
                                Print
                              </SecondaryButton>
                              <SecondaryButton
                                size="small"
                                className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                                style={{ width: "140px" }}
                                onClick={() =>
                                  this.showModal({
                                    name: "Return Label",
                                    id: "returnLabel",
                                    documentName : "returnLabel",
                                    mtn:
                                      list.mobileNumber,
                                  })
                                }                           
                              >
                                {"Email"}
                              </SecondaryButton>
                             
                            </div>
                          </Cell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      );
    }else {
      content = this.props
        && this.props.documentReceiptsItems
        && this.props.documentReceiptsItems.map((element, i) => (
          <div key={i}>
            {this.documentName(element) && (
              <div className="Grid Grid--gapless border-bottom-grey-light u-paddingYLarge u-flexAlignItemsCenter">
                <div className="Col Col--5 bold font-18 u-paddingLeftLarge" tabIndex="0">
                  {element.name}
                </div>
                <div className="Col Col--7 u-paddingXExtraLarge ">
                  {(element.id === "devicePaymentAgreement" && channel?.includes("OMNI-INDIRECT") ? false : true) && element.btn1 && element.btn1.toLowerCase() === "email" ? (
                    <SecondaryButton
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                      style={{ width: "170px" }}
                      onClick={() => this.showModal(element)}
                    >
                      {element.btn1}
                    </SecondaryButton>
                  ) : (
                    <Fragment>
                      {element.id === "IsReturnLabel" && (
                        <SecondaryButton
                          size="small"
                          className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                          style={{ width: "170px" }}
                          onClick={() => this.openLabel(element)}
                        >
                          {element.btn1}
                        </SecondaryButton>
                      )}
                      {" "}
                    </Fragment>
                  )}
                  {!ncdisabled && !isDoorToDoor && element.btn2 && element.btn2.toLowerCase() === "print" && (
                    <SecondaryButton
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                      style={element.id === "devicePaymentAgreement" && channel?.includes("OMNI-INDIRECT") ? { width: "auto" } : { width: "170px" }}
                      onClick={() => this.openPrint(element)}
                      data-testid={`${element.id} Print`}
                      disabled={ncdisabled}
                    >
                      {element.id === "devicePaymentAgreement" && channel?.includes("OMNI-INDIRECT") ? viewDpAgreement :element.btn2}
                    </SecondaryButton>
                  )}
                   {!ncdisabled && channel?.includes("OMNI-INDIRECT") && element.btn1 && (element.btn1.toLowerCase() === "view receipt"|| element.btn1.toLowerCase() === "view") && (
                    <SecondaryButton
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                      style={ { width: "170px" }}
                      onClick={() => this.openBuyoutPrintModal(element)}
                      data-testid={`${element.id} view`}
                      disabled={ncdisabled}
                    >
                      {element.btn1}
                    </SecondaryButton>
                  )}
                  {element.btn3 && element.btn3.toLowerCase() === "sms" ? (
                    <SecondaryButton
                      size="small"
                      className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                      style={{ width: "170px" }}
                      onClick={() => this.openSMS(element)}
                    >
                      {element.btn3}
                    </SecondaryButton>
                  ) : (
                    <Fragment>
                      {element.id === "isQRCode" && (
                        <SecondaryButton
                          size="small"
                          data-testid="QR code Print"
                          className="font-14 Button--secondary u-marginTopNone u-marginBottomNone"
                          style={{ width: "170px" }}
                          onClick={() => this.QRview(element)}
                        >
                          {element.btn3}
                        </SecondaryButton>
                      )}{" "}
                    </Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
        ));
    }
    const isCLNRFlow = sessionStorage.getItem("isCLNRFlow") || false;

    return (
      <>
     { renderFlag && (isCLNRFlow ? isCLNRFlow && !this.props.isDeviceRepaireEligible : true) && <div className="Grid Grid--gapless u-marginTopSmall u-marginBottomSmall Bar Bar--primary u-paddingTopMedium" data-testid="ORheading">
            <div className="Col Col--12">
              <div className="font-22 bold u-paddingLeftLarge PaddingRight36" tabIndex="0">
                {this.props.title}
              </div>
            </div>
          </div>
  }
          <div />
      {renderFlag && (isCLNRFlow ? isCLNRFlow && !this.props.isDeviceRepaireEligible : true) &&(
        <div data-testid="ORBody">
          {!showListMtnModel && !this.props.readorder && content}

          {showListMtnModel
            && listMtnAndAgreementId
            && listMtnAndAgreementId.length > 0 && (
            <Modal
              showModal={showListMtnModel}
              showModalChanged={() => this.onHide("indirect")}
              children={content}
              className="customerAgreementModal u-paddingY0 height-100 u-positionFixed"
              ariaLabel=""
            />
          )}        

          { (showIndirectBuyoutDetail || showRetunLabelDetail) && this.props.readorder && channelID?.includes("OMNI-INDIRECT") && showListMtnModel &&
            <BuyoutReturnLabelModel 
            showModal={showIndirectBuyoutDetail || showRetunLabelDetail}
            className="customerAgreementModal u-paddingY0 height-100 u-positionFixed"
            readorder = {this.props.readorder}
            showListMtnModel = {showListMtnModel}
            showIndirectBuyoutDetail = {showIndirectBuyoutDetail}
            showRetunLabelDetail = {showRetunLabelDetail}
            closeReturnModal = {this.closeReturnModal}
            closeBuyoutModal={this.closeBuyoutModal}
            readOrderViewAndPrintReceipt = {this.props.readOrderViewAndPrintReceipt}
            returnLabelEmailId={this.state.returnLabelEmailId}
            buyoutEmailId={this.state.buyoutEmailId}
            openPrint={this.openPrint}
            sendEmailReceipt={this.sendEmailReceipt}
          />
          }        

          {showIndirectDpDetail && this.props.readorder && channelID?.includes("OMNI-INDIRECT") && showListMtnModel && this.props.readOrderViewAndPrintReceipt?.loanInfo &&
          <Modal
            showModal={showIndirectDpDetail}
            children={IndirectDpContent}
            className="customerAgreementModal u-paddingY0 height-100 u-positionFixed"
          />
          }   
          
          {showListMtnModel && this.props.readorder && (
            <div data-testid="read-order-documents">
              <div className="custom-modal" ariaLabel="Upgrade Modal" style={{ zIndex: 998 }}>
                <div className="custom-modal-inner">
                  <PageHeader
                    pageHeaderText={this.props.viewAndPrintModalTitle}
                    hasCloseButton
                    onCloseClick={(isRetail && isRfexFlow && this.props.readorder) ? this.props.hideViewPrintReceipt : this.onHide}
                  />
                  <div className="custom-modal-body">
                    <div className="bold u-paddingLeftLarge u-paddingY28 u-marginTop10 u-borderBottomGray">
                      {this.props.orderNumberLabel}
                      {" "}
                      <span className="lite u-marginLeftSmall contains-PII">
                        {this.props.orderNo}
                      </span>
                    </div>
                    {content}
                  </div>
                  <div className="u-textCenter u-paddingTopLarge">
                    <PrimaryButton 
                    data-track="Done" onClick={(isRetail && isRfexFlow && this.props.readorder) ? this.props.hideViewPrintReceipt : () => this.onHide()}>
                      Done
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </>
    );
  }
}

OrderDocumentsReceipts.defaultProps = {
  headerTitle: [
    {
      title: "Line #"
    },
    {
      title: "Agreement #"
    },
    {
      title: "Refresh Status"
    }
  ],
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
      id: "buyOutPaymentReceipt",
      show: "buyOutPaymentReceipt"
    },
    {
      name: "Purchase receipt",
      btn1: "Email",
      btn2: "Print",
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
  orderNumberLabel: "Completed order number",
  viewAndPrintModalTitle: "View and print receipt",
  viewDpAgreement : "View DP Agreement"
};

const mapStateToProps = (state) => ({
  orderConfirmationData:
    state
    && state.OrderConfirmation
    && state.OrderConfirmation.OrderConfirmationData
      ? state.OrderConfirmation.OrderConfirmationData
      : "",
  isDeviceRepaireEligible: state.ClnrReview !== undefined &&
  state.ClnrReview.clnrInfo &&
  state.ClnrReview.clnrInfo.transactionType &&
  (state.ClnrReview.clnrInfo.transactionType === "Device Repair")
    ? true
    : false,
  landing: makeSelectLanding(),
  isCostco: state?.landing?.landingCreatCase?.data?.customer?.locationSubType == 'RX' || state?.landing?.customerInfo?.locationSubType == 'RX' || /true/i.test(state?.landing?.cartDetails?.cartHeader?.isCostcoAgent) || false,
  viewreceiptpdcContent:
    state
    && state.OrderConfirmation
    && state.OrderConfirmation.viewReceiptContentPDF
      ? state.OrderConfirmation.viewReceiptContentPDF
      : "",
  listMtnAndAgreementId:
    state
    && state.OrderConfirmation
    && state.OrderConfirmation.listMtnAndAgreement
      ? state.OrderConfirmation.listMtnAndAgreement
      : "",
  channel: has(state,"OrderConfirmation.OrderConfirmationData.data.getConfirmationPage.channelID") ? state.OrderConfirmation.OrderConfirmationData.data.getConfirmationPage.channelID: "",
  readOrderViewAndPrintReceipt:
    state
    && state.OrderConfirmation
    && state.OrderConfirmation.readOrderViewAndPrintReceipt
      ? state.OrderConfirmation.readOrderViewAndPrintReceipt
      : "",
  showROViewAndPrintReceipt:
    state
    && state.OrderConfirmation
    && state.OrderConfirmation.showROViewPrintReceipt
      ? state.OrderConfirmation.showROViewPrintReceipt
      : "",
  showListMtnModel: has(state, "OrderConfirmation.showROViewPrintReceipt")
    ? state.OrderConfirmation.showROViewPrintReceipt
    : false,
  activationStatus: has(state,'OrderConfirmation.refreshActivationStatus') ? state.OrderConfirmation.refreshActivationStatus : [],
  printerDevices: get(state, "OrderConfirmation.printerDevices"),
  isGetDevicesLoading: get(state, "OrderConfirmation.isGetDevicesLoading"),
  customerType: state.App && state.App.CustomerType ? state.App.CustomerType : "",
  showIndirectDpDetail: has(state, "OrderConfirmation.showIndirectLoanDetail") ? state.OrderConfirmation.showIndirectLoanDetail :false,
  isReadOrder: has(state,'ReadOrder.store.data.cart.orderDetails.orderType') ? true : false,
  depletionType :has(state, "OrderReview.store.cart.lineDetails.lineInfo[0].itemsInfo[0].depletionType") ? state.OrderReview.store.cart.lineDetails.lineInfo[0].itemsInfo[0].depletionType : "",
  lineInfo :has(state, "landing.cartDetails.lineDetails.lineInfo") ? state.landing.cartDetails.lineDetails.lineInfo : "",
  shipToCustomerAddress :has(state, "OrderReview.store.cart.lineDetails.lineInfo[0].itemsInfo[0].shipping.shipToCustomerAddress") ? state?.OrderReview?.store?.cart?.lineDetails?.lineInfo?.[0]?.itemsInfo?.[0]?.shipping?.shipToCustomerAddress
  : false,
  isDistributionAgent: state?.landing?.landingCreatCase?.data?.customer?.locationSubType == 'GN' || state?.landing?.customerInfo?.locationSubType == 'GN' || false
});

export const mapDispatchToProps = (dispatch) => ({
  getViewReceipt: (documentData) => dispatch(actions.getViewReceipt(documentData)),
  getIndirectViewReceipt: (documentName) => dispatch(actions.getIndirectViewReceipt(documentName)),
  getDevicePaymentReceipt: () => dispatch(actions.getDevicePaymentReceipt()),
  // getListOfLineAndAgreement: () => dispatch(actions.getListOfLineAndAgreement()),
  toggleViewModal: (element) => dispatch(actions.toggleViewModal(element)),
  toggleEmailModal: (element) => dispatch(actions.toggleEmailModal(element)),
  toggleSMSModal: (element) => dispatch(actions.toggleSMSModal(element)),
  getReadOrderData: () => dispatch(actions.roViewAndPrintReceipt()),
  showROrViewAndPrintReceipt: () => dispatch(actions.showROrViewAndPrintReceipt()),
  sentEmailRequest: (element) => dispatch(actions.sentEmailRequest(element)),
  getRODPReceipt: (req) => dispatch(actions.getRODPReceipt(req)),
  retrieveOCIndirectDpAgreementRequest: (payload) => dispatch(actions.retrieveOCIndirectDpAgreementRequest(payload)),
  toggleLABELModal: (element) => dispatch(actions.toggleLABELModal(element)),
  setPrintElement: (element) => dispatch(actions.setPrintElement(element)),
  addAppMessage: (message, type) => dispatch(appMessageActions.addAppMessage(message, type)),
  retrievePrinterDevices: () => dispatch(actions.retrievePrinterDevicesRequest()),
  printTradeInReceiptRO: (req) => dispatch(actions.printTradeInReceiptRO(req)),
  sendUPSEmailReceipt: (req) => dispatch(actions.sendUPSEmailReceipt(req)),
  showIndirectLoanDetail: (req) => dispatch(actions.showIndirectLoanDetail()),
  refreshActivationStatus: (req) => dispatch(actions.refreshAgreementRequest(req)),
  getLabelReceipt: (element) => dispatch(actions.getLabelReceipt(element)),
  regenerateReceipts: (history) => dispatch(regenerateReceipts(history))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key, saga });
const withConfirmSaga = injectSaga({ key: confirmKey, saga: confirmationSaga });

export default MapTo("vcg/components/soe-assisted/react/orderdocumentreceipts")(
  compose(withConnect, withSaga, withConfirmSaga, withRouterV6, withPeripherals)(OrderDocumentsReceipts),
  OrderDocumentsReceiptsEditConfig,
);
