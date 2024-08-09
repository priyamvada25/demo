import * as actions from "./actions";
import * as domService from "../../services/dom.service";
import * as landingActions from "../../pages/Landing/actions";

import { isEqual } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { GB_SCRIPT, NR_SCRIPT, SC_SCRIPT, mapInspicioHost } from '../../services/UrlMapperService';
import { HttpService, setCookie } from "../../services/HttpService";
import Modal, { ModalBody } from "@vz-soe-utils/modal";
import { Page, withModel } from "@adobe/cq-react-editable-components";
import { getCookiesAcssCareUIParams, getQueryParamByName, loadjscssfile, getCookieAcssRouterNsa } from "../../services/dom.service";

import AppLoader from "../common/AppLoader/AppLoader";
import AppMessage from "../common/AppMessage/AppMessage";
import AssignMTNReducer from "../../pages/AssignMTN/reducer";
import BootstrapPeripherals from "../BootstrapPeripherals/BootstrapPeripherals";
import CreditReducer from "../../components/Credit/reducer";
import CreditSaga from "./../../components/Credit/saga";
import SalesRecommenderNotificationSaga from "./../../components/SalesRecommenderNotification/saga";
import {ccaiIntentHandler, isEnableSalesNotification, isEnableSalesRecommender} from './../../components/SalesRecommenderNotification/SalesRecommenderUtils';
import React from "react";
import Trace from "../../services/NewRelicService";
import { UpdateOrderTabSoeGuiSubKeyValue } from "./util";
import _ from 'lodash';
import accessoryGWSaga from "./../../pages/AccessoryGridwall/saga";
import accessoryReducer from "./../../pages/AccessoryGridwall/reducer";
import apiConsoleReducer from "../common/ApiConsole/reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import customerInsightsReducer from "../../pages/CustomerInsights/reducer";
import customerInsightsSaga from "../../pages/CustomerInsights/saga";
import { executeShellFunction } from '../../services/dom.service';
import get from "lodash/get";
import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import landingReducer from "./../../pages/Landing/reducer";
import landingSaga from "./../../pages/Landing/saga";
import { loadEmptyState } from "../../pages/RefundExchange/SearchOrder/actions";
import { makeSelectLanding, getWHWRedeemFlow, getMidnightRedeem } from "./../../pages/Landing/selectors";
import orederReviewReducer from "../../pages/OrderReview/reducer";
import reducer from "./reducer";
import superPromoReducer from "../../pages/SuperPromoStore/reducer"
import superPromoSaga from "./../../pages/SuperPromoStore/saga";
import withPeripherals from "@vz-soe-utils/withperipherals";
import withRouterV6 from "../hoc/withRouterV6";
import SalesRecommenderNotification from "../SalesRecommenderNotification/SalesRecommenderNotification";
import isEmpty from 'lodash/isEmpty';
import * as EVENTS from '../common/TaggingDL/customEvents';
import { sendCustomEvent } from "../common/TaggingDL/tagging";

require("./App.css");

// This component is the application entry point
const key = "App";

export class App extends Page {

  showExtendSession = false;

  constructor(props) {
    super(props);
    if (props.wcmMode) {
      console.log("Setting wcmMode: ", props.wcmMode);
      sessionStorage.setItem("wcmMode", props.wcmMode);
    }
    if(props.unlockedPhones) {
      // sessionStorage.setItem("unlockedPhones", props.unlockedPhones);
      props.getUnlockedDeviceModalContent(props.unlockedPhones)
    }

    if(props.isProd){
      console.log("Setting isProd: ", props.isProd);
      sessionStorage.setItem("isProd",props.isProd);
    }

    if(props.keyText){
      props.setKeyText(props.keyText)
    }

    if(_.has(props,"enableAFO")){
      props.setEnableAFO(props.enableAFO);
    }
    
    //To do : add a global flag on AEM props
    sessionStorage.setItem("isSplitShipment",true);

    if (props.withoutNBS) {
      this.props.getNextBillSummaryLink(this.props.withoutNBS);
      console.log('Setting withoutNBS: ', props.withoutNBS);
      sessionStorage.setItem('withoutNBS', props.withoutNBS);
    } else {
      sessionStorage.removeItem('withoutNBS');
    }

    if (props.showClickToCall)
    {
      console.log("Setting showClickToCall: ", props.showClickToCall);
      sessionStorage.setItem("showClickToCall",props.showClickToCall);
    } else {
      sessionStorage.removeItem("showClickToCall");
    }

    if(sessionStorage.getItem("CustomerInsightsDisplayed")){
      sessionStorage.removeItem("CustomerInsightsDisplayed");
    }

    //setting 5g  as empty 
    if (sessionStorage.getItem('fiveGInternetSelected')) {
      sessionStorage.removeItem("fiveGInternetSelected");
    }
    //fowname as empty due to cache issue
    if (sessionStorage.getItem("visitedPageTG")) {
      sessionStorage.removeItem("visitedPageTG");
    }
     //ordertype as empty due to cache issue
     if (sessionStorage.getItem("orderTypeFlow")) { 
      sessionStorage.removeItem("orderTypeFlow");
    }
       //addonsUpdated as empty due to cache issue
       if (sessionStorage.getItem("addonsUpdated")) { 
        sessionStorage.removeItem("addonsUpdated");
      } 
       //FEAAdded as empty due to cache issue
       if (sessionStorage.getItem("FEAAdded")) { 
        sessionStorage.removeItem("FEAAdded");
      }
       //tagVIKI as empty due to cache issue
       if (sessionStorage.getItem("tagVIKI")) { 
        sessionStorage.removeItem("tagVIKI");
      }
         //tradeInApiSuccess as empty due to cache issue
         if (sessionStorage.getItem("tradeInApiSuccess")) { 
          sessionStorage.removeItem("tradeInApiSuccess");
        }
        if(sessionStorage.getItem('callcheckoutpurchase')){
          sessionStorage.removeItem("callcheckoutpurchase");
    }
    if (sessionStorage.getItem('tagReadOrderFlow')) {
      sessionStorage.removeItem("tagReadOrderFlow");
    }
   if (sessionStorage.getItem("tagRFEXFlowEmpty")) {
     sessionStorage.removeItem("tagRFEXFlowEmpty");
   }
        if (sessionStorage.getItem('devicePDPBYOD'))
        {
        sessionStorage.removeItem("devicePDPBYOD");
        } // VCGBK-1952 DevicePDPByod
    //propId and path seting as empty on initial page load 
    // if (sessionStorage.getItem("selPropId") || sessionStorage.getItem("selPath")) {
    //   sessionStorage.removeItem("selPropId");
    //   sessionStorage.removeItem("selPath");
    // }
    if (sessionStorage.getItem("primaryMtnofSecNumber")) {
      sessionStorage.removeItem("primaryMtnofSecNumber");
    } //for ACT-16 dual number
    if (sessionStorage.getItem('gTrackNo') || sessionStorage.getItem('gTracks')) {
      console.log("Setting gTrackNo & gTracks empty in App/index");
      sessionStorage.removeItem('gTrackNo', '');
      sessionStorage.removeItem('gTracks', '');
    }

    if(props.FCRAEnabled !== null || props.FCRAEnabled !== undefined){
      console.log("Setting FCRAEnabled", props.FCRAEnabled);
      sessionStorage.setItem("FCRAEnabled", props.FCRAEnabled);
    }
    else{
      sessionStorage.removeItem("FCRAEnabled");
    }

    if(props.enableSalesRecommender) {
      sessionStorage.setItem("enableSalesRecommender", props.enableSalesRecommender);
      sessionStorage.setItem("isNotificationEnabled", true);
    } else {
      sessionStorage.removeItem("enableSalesRecommender");
    }

    if(props.soeguiChannels){
      sessionStorage.setItem("soeguiChannels", props.soeguiChannels);
    } else{
      sessionStorage.removeItem("soeguiChannels");
    }
    // override for API Context
    //sessionStorage.setItem("enableMock", true);
    //sessionStorage.setItem("APIContext", "http://localhost:3001");
    //if (!sessionStorage.getItem("APIContext")) {
    if (window.location.hostname.includes("soeaem") || window.location.hostname.includes("localhost")) {
      if (props.apiServer) {
        console.log("Setting APIContext to: ", props.apiServer);
        console.log("LOG-DEBUG: App -> constructor -> props.apiServer", props.apiServer);
        sessionStorage.setItem("APIContext", props.apiServer);
      } else {
        sessionStorage.setItem("APIContext", `http://${window.location.host}/api`); // make api calls via proxy
      }
      // Update the baseURL. The default baseURL thats set has a race condition which causes some APIs
      // to have null base. In order to fix this, once we get the apiServer from AEM, we will inject the
      // same and override the baseURL.
      HttpService.defaults.baseURL = sessionStorage.getItem("APIContext");
      console.log("LOG-DEBUG: App -> Updated HttpService baseURL", HttpService.defaults.baseURL);
    } else {
      if (props.securePath) {
        console.log("LOG-DEBUG: App -> Inside secure path");
        let APIContext = window.location.origin + props.securePath;
        
        /**
         * Revert this below change as per the ask in email
         */
        // if(APIContext.indexOf('sposstore-bb') > -1) {
        //   APIContext = APIContext.replace('-soe','-soe-services');
        // }

        sessionStorage.setItem("APIContext", APIContext);
        console.log("LOG-DEBUG: App -> Inside secure path APIContext", APIContext);
      } else {
        console.log("LOG-DEBUG: App -> inside secure path ELSE scenario");
        if (window.location.hostname.includes(".vzwcorp.com") || window.location.hostname.includes(".verizonwireless.com")) {
          console.log("LOG-DEBUG: App -> inside secure path ELSE scenario vzwcorp.com condition");
          let APIContext = "https://" + document.location.hostname + "/secure/assisted/hivv/nsq2";
          sessionStorage.setItem("APIContext", APIContext);
        }
      }
      HttpService.defaults.baseURL = sessionStorage.getItem("APIContext"); // Don't comment this
    }
    //}

    let channel = localStorage.getItem("channel") || "";
    let url = document.URL.split('?')[0]; // removing Query param from URL
    if (url.includes("telestore"))
    {
      const parentUrl = document.referrer ? document.referrer : "";
      console.log("parentUrl",parentUrl);
      channel = parentUrl.includes("chat-home") || parentUrl.includes("ChatInit") || channel === "CHAT-STORE" ? "CHAT-STORE" : getQueryParamByName("channel") && getQueryParamByName("channel") === "CHAT-STORE" ?
        "CHAT-STORE" : "OMNI-TELESALES";
    } else if (url.includes("carestore")) {
      channel = "OMNI-CARE";
    } else if (url.includes("chatstore")) {
      channel = "CHAT-STORE";
      if (props.isProd === "true" || domService.getPieEnvironment() === "PRODUCTION") {
        let chatProdAPIContext = "https://chatstore-soe-services.vzwcorp.com" + props.securePath;
        sessionStorage.setItem("APIContext", chatProdAPIContext);
        HttpService.defaults.baseURL = sessionStorage.getItem("APIContext");
      }
      /*  try {
        let chatSeoGuiValue = getQueryParamByName("soeguivalue");
        let decodeChatSeoGuiValue = chatSeoGuiValue ? atob(chatSeoGuiValue) : chatSeoGuiValue;
        sessionStorage.setItem("chatSeoGuiValue", decodeChatSeoGuiValue);
      } 
      catch(e) {
        console.log(e)
      } */




    } else if (window.location.hostname.includes(".verizonwireless.com") || window.location.hostname.includes("-bb.vzwcorp.com") 
    || window.location.hostname.includes("-bb-soe") || window.location.hostname.includes("indirect") || url.includes("OMNI-INDIRECT")) {
      channel = domService.isIpad() ? "OMNI-INDIRECT-TAB" : "OMNI-INDIRECT"; 
    }else if((sessionStorage.getItem("channel") && sessionStorage.getItem("channel").includes("OMNI-D2D")) || getQueryParamByName("isDoorToDoorFlow") === "true"){
      let isIpad = domService.isIpad();
      console.log(sessionStorage.getItem("channel") , sessionStorage.getItem("channel")?.includes("OMNI-D2D"), getQueryParamByName("isDoorToDoorFlow"))
      channel = isIpad ? "OMNI-D2D-TAB" : "OMNI-D2D";
    } else if (url.includes("sposstore")) {
      let isIpad = domService.isIpad();
      	channel = isIpad ? "OMNI-RETAIL-TAB" : "OMNI-RETAIL";
    }

    // Clearing winback session variable for non-winback flow
    const winBackCustomer = domService.getQueryParamByName("flowType") === "winback";
    if (!winBackCustomer) {
      sessionStorage.setItem('winBackFlow','');
    }

    //Promo Bundle changes
    if(getQueryParamByName("isBundleFlow") === 'true'){
      sessionStorage.setItem("promoBundleFlow", true);
    }

    // ACSS channel expansion change    
    if (
      (window.location.pathname.includes("landing.html") && 
      (url.includes("carestore") || url.includes("OMNI-CARE"))) ||
      getQueryParamByName("isACSSFlexRedesign") === "Y"
    ) {
      sessionStorage.setItem("isACSSFlexRedesign", true);
    }

    const isRfexFlowParam = domService.getQueryParamByName("isRfexFlow")? true: false;
    //Channel ID set for the Refund Exchange.
    if (window.location.pathname.includes("refundexchange") || isRfexFlowParam) {
      sessionStorage.setItem("refundexchange", true);
    }else{
      if(sessionStorage.getItem("refundexchange")){
        sessionStorage.removeItem("refundexchange");
      }
    }

    try {
        if(getQueryParamByName("newPostToPreIndicator") !== "true"){
          console.log('postpayflow')
          let nsasoeguisubkey = getQueryParamByName("nsasoeguisubkey");
          let nsasoeguivalue = getQueryParamByName("nsasoeguivalue");
          if (
            sessionStorage.getItem("nsasoeguisubkey") &&
            sessionStorage.getItem("nsasoeguivalue") &&
            nsasoeguisubkey &&
            nsasoeguivalue
          ) {
            sessionStorage.removeItem("nsasoeguisubkey");
            sessionStorage.removeItem("nsasoeguivalue");
          }
          if(nsasoeguisubkey && nsasoeguivalue){
            sessionStorage.setItem("nsasoeguisubkey", nsasoeguisubkey);
            sessionStorage.setItem("nsasoeguivalue", nsasoeguivalue);
          } 
        }     
    } 
    catch(e) {
      console.log(e)
    } 
    

    if (channel) {
      HttpService.defaults.headers["channelId"] = channel;

      if (sessionStorage.getItem("channel") !== channel) {
        sessionStorage.setItem("channel", channel);
      }

      if (localStorage.getItem("channel") !== channel) {
        localStorage.setItem("channel", channel);
      }
    }
    console.log('customerType: ', getQueryParamByName("customerType"));


    
    //Set Channel id for NCflow..
    if(getQueryParamByName("customerType") === "N" || getQueryParamByName("isDoorToDoorFlow") === "true"
      || (getQueryParamByName("customerType") === "U" && getQueryParamByName("newPostToPreIndicator") === "true")) {
      localStorage.setItem("locationCode", getQueryParamByName("locationCode"));
      sessionStorage.setItem("customerType", getQueryParamByName("customerType"));
      sessionStorage.setItem("NcResume", getQueryParamByName("NcResume"));
      sessionStorage.setItem("existingD2DCustomer", getQueryParamByName("isDoorToDoorFlow"));
      localStorage.setItem("creditAppNum", getQueryParamByName("creditAppNum"));
      if ((window.location.pathname.search("/addLines") > 0 || window.location.pathname.search("/customerProfile") > 0 || 
      window.location.pathname.search("/numberselection") > 0) && (window.location.hostname.includes(".verizonwireless.com") || window.location.hostname.includes("-bb.vzwcorp.com") 
      || window.location.hostname.includes("-bb-soe") || window.location.hostname.includes("indirect") || url.includes("OMNI-INDIRECT"))) {
        channel = domService.isIpad() ? "OMNI-INDIRECT-TAB" : "OMNI-INDIRECT";
      } else if (url.includes("telestore") || url.includes("OMNI-TELESALES") || url.includes("TELESALES")){
        channel = localStorage.getItem("channel") === "CHAT-STORE" ? "CHAT-STORE" : getQueryParamByName("channel") && getQueryParamByName("channel") === "CHAT-STORE" ?
        "CHAT-STORE" : "OMNI-TELESALES";
      } else if (url.includes("chatstore")) {
        channel = "CHAT-STORE";
        if (props.isProd === "true" || domService.getPieEnvironment() === "PRODUCTION") {
          let chatProdAPIContext = "https://chatstore-soe-services.vzwcorp.com" + props.securePath;
          sessionStorage.setItem("APIContext", chatProdAPIContext);
          HttpService.defaults.baseURL = sessionStorage.getItem("APIContext");
        }
      } else if (url.includes("carestore") || url.includes("OMNI-CARE")){
        channel = "OMNI-CARE";
      }else if((sessionStorage.getItem("channel") && sessionStorage.getItem("channel").includes("OMNI-D2D")) || getQueryParamByName("isDoorToDoorFlow") === "true"){
        let isIpad = domService.isIpad();
        channel = isIpad ? "OMNI-D2D-TAB" : "OMNI-D2D";
      } else {
        channel = domService.isIpad() ? "OMNI-RETAIL-TAB" : "OMNI-RETAIL";
      }
    } else {
      //sessionStorage.removeItem('gb_flowType');
      //sessionStorage.removeItem("customerType");
      sessionStorage.getItem('gb_flowType') && sessionStorage.getItem('gb_flowType') == "NSE" ? sessionStorage.setItem("customerType", "N") : sessionStorage.setItem("customerType", "");
    }
    sessionStorage.setItem("channel", channel);
    localStorage.setItem("channel", channel);
    console.log("LOG-DEBUG: App -> constructor -> props.ChannelDisplayFlags", props.ChannelDisplayFlags);
    this.props.setChannelDisplayFlags({ ChannelDisplayFlags: props.ChannelDisplayFlags, channel });
    // Init Mock here to make sure baseURL is updated. Else mocks wont work
    // Ignore compilation of mock in PROD
    if (process.env.NODE_ENV !== "production") {
      const { initMock } = require("../../mock");
      // Enables mock if enableMock is set in sessionStorage.
      if (sessionStorage.getItem("enableMock")) {
        initMock(HttpService, sessionStorage.getItem("APIContext"));
      }
    }
    this.initApiCall = this.initApiCall.bind(this);
    //MachineName
    window.machineNameCallback = this.machineNameCallback.bind(this);
    //Glassbox
    window.doGlassboxCheck = this.doGlassboxCheck.bind(this);
    //Adobe Analytic
    window.doAdobeAnalyticCheck = this.doAdobeAnalyticCheck.bind(this);    
    // Pendo
    window.loadPendo = this.loadPendo.bind(this);
    window.initializePendo = this.initializePendo.bind(this);
    // PAX
    window.doPAXCheck = this.doPAXCheck.bind(this);
    // Lead info
    window.getLeadInfoData = this.getLeadInfoData.bind(this);
    // VZEngage flags
    window.setVZEClickToCall = this.setVZEClickToCall.bind(this);
    window.setFromVZEngage = this.setFromVZEngage.bind(this);
    //analyticssessionid
    window.doAnalyticssessionidCallback = this.doAnalyticssessionidCallback.bind(this);
    // Quote Flag check IPAD
    window.doQuoteFlagCallback = this.doQuoteFlagCallback.bind(this);
    // expose function for iosSessionInfo callback
    window.currentIOSSessionInfo = this.currentIOSSessionInfo.bind(this);
    // appproperties callback
    window.getAppProperties = this.getAppProperties.bind(this);
    // expose function for USER_PROFILE callback
    window.setUserProfile = this.setUserProfile.bind(this);
    //default sales rep callback
    window.defaultSalesRepCallback = this.defaultSalesRepCallback.bind(this);
    //content square flag
    window.doContentSquareCheck = this.doContentSquareCheck.bind(this);
    //Content Square changes - ER 22.07
    window._uxa = window._uxa || [];
    var dataSelectors = {
      PIISelectors: [".contains-PII"]
    };
    window._uxa.push(['setPIISelectors', dataSelectors]);
  }

  /*
    Add main pages here.. Any page that requires landing and cart to be available should not
    be added here.
  */
  isPageToSkipLandingCall (){

    // Homer service referral changes for new customer.
    let hsCustomerType = domService.getQueryParamByName('customerType');
    let hsFlowType = domService.getQueryParamByName('flowType');
    let isCLNRFlow = domService.getQueryParamByName('isCLNRFlow') || window.location.pathname.includes("clnr")
    if (hsCustomerType === "N" && hsFlowType === "homeSales")
      return false;

    let viewUsageFromApp = getQueryParamByName("fromApp") ? true : false;
    const fiverGInter = getQueryParamByName("fiveGInter") ? getQueryParamByName("fiveGInter") === "Y" : false;
    const fiveGHomeRFEX = getQueryParamByName("intendType") ? getQueryParamByName("intendType") === "5GHomeRFEX" : false;
    return !window.location.pathname.includes("home.html") &&
    !window.location.pathname.includes("caseDetails.html") &&
    !window.location.pathname.includes("Reorder.html") &&
    !window.location.pathname.includes("ChangeTradeIn.html") &&
    !window.location.pathname.includes("case-pending.html") &&
    !window.location.pathname.includes("qasalelandingpage") &&
    !window.location.pathname.includes("qaaccessory-gridwall") &&
    !window.location.pathname.includes("refundexchange") &&
    !isCLNRFlow &&
    !fiveGHomeRFEX &&
    !window.location.pathname.includes("hometest.html") &&
    !window.location.pathname.includes("promoInterstitial.html") &&
    !window.location.pathname.includes("loan-pay-off-details.html") &&
    !window.location.pathname.includes("scan-and-upload.html") &&
    !window.location.pathname.includes("view-upload-bill.html") &&
    !window.location.pathname.includes("fiveGInter") &&
    !window.location.pathname.includes("numberselection.html") &&
    !window.location.pathname.includes("read-order.html") &&
    !window.location.pathname.includes("truckRoll.html") &&
    !window.location.pathname.includes("EquipmentRecall.html") &&
    !window.location.pathname.includes("content-transfer.html") &&
    !window.location.pathname.includes("editUserInfo.html") &&
    !window.location.pathname.includes("addressqualification.html") &&
    (!viewUsageFromApp ? !window.location.pathname.includes("viewUsage.html") :
      window.location.pathname.includes("viewUsage.html")) && 
    !window.location.pathname.includes("customerProfile.html")&&
    !window.location.pathname.includes("landing.html")&&
    !window.location.pathname.includes("plan-comparison.html")&&
    !window.location.pathname.includes("readorderpostpay.html")&&
    !window.location.pathname.includes("promotions.html") &&
    !window.location.pathname.includes("prospecteligibledevices.html") &&
   //!window.location.pathname.includes("combinedgridwall.html") &&
    !window.location.pathname.includes("gridwallv2.html") &&
    !window.location.pathname.includes("compare-unlimited-plans.html") &&
    !window.location.pathname.includes("product-detail.html") &&
    !window.location.pathname.includes("aiquote.html")
;
  }

  disconnectBridge = () => {
    // disconnect verifone bridge; will reconnect on reload/opening new tab or window
    let device = this.props.deviceManager && this.props.deviceManager.getInstance();
    if(device && device.thermalPrint){
      console.log('disconnecting verifone bridge and resetting deviceManager');
      window.VZPeripheralDeviceManager = undefined;
      device.thermalPrint.disconnect();
    }
  }

  componentDidMount() {
    if(domService.getQueryParamByName("isWHWRedeem") == "true") {
      this.props.triggerGetWHWRedeemFlow(true);
    }
    if(domService.getQueryParamByName("isMidnightRedeem") == "true") {
      this.props.setMidnightRedeem(true);
    }
  window.store.dispatch(landingActions.setSpcChatRepQueryParam(getQueryParamByName('isSPCChatRep')));
  window.store.dispatch(landingActions.setSocialmediaRep(getQueryParamByName('isSocialMediaRep')));
  const allowedDomainsPattern = /^(https:\/\/(?:.*\.)?(vzwcorp\.com|verizon\.com|verizonwireless\.com))/i;

    setTimeout(() => {
      if (isEnableSalesRecommender()) {
        const windowName = 'flex-ordering-window';
        window.name = windowName;
        
        window?.opener?.postMessage({
          windowName: windowName,
        }, allowedDomainsPattern);
      }
    }, 5000)


    if(sessionStorage.getItem("channel") === "OMNI-CARE"){
      getCookiesAcssCareUIParams();
      getCookieAcssRouterNsa();
    }
    if(!sessionStorage.getItem("isBanner")) {
      sessionStorage.setItem("isBanner", 'true');
    }
    if (sessionStorage.getItem('location')) {
      const location = sessionStorage.getItem('location');
      sessionStorage.setItem("locationCode", location);
    }
    // Update current soeguisubkey value to session storage
    UpdateOrderTabSoeGuiSubKeyValue();
    this.disableGlobalNavRefresh();
    let isIpad = domService.isIpad();

    if ((sessionStorage.getItem("channel") === "OMNI-CARE" || localStorage.getItem("channel") === "OMNI-CARE") || (document.URL?.split('?')?.[0]?.includes('localhost') && window.location.href.includes('carestore'))) {
      try {
        const soeGuiCookie = domService.getCookie("soeguivalue");
        const isProd = sessionStorage.getItem('isProd') || domService.getPieEnvironment() === "PRODUCTION";
        const { acssWeb_params = {} } = (isProd) ? JSON.parse(decodeURIComponent(window.atob(soeGuiCookie?.split('.')[1]))) : JSON.parse(decodeURIComponent(window.atob(soeGuiCookie)));
        const acssUrl = acssWeb_params?.acssUrl || '';
        if (window.opener) {
          window.opener.postMessage('posWindowLaunchEvent', acssUrl);
          window.addEventListener('beforeunload', () => {
            window.opener.postMessage('posWindowCloseEvent', acssUrl);
          });
        }
      }
      catch (e) {
        console.log('error while checking soeguivalue and posting message for posWindowEvent', e)
      }
    }

    if(!isIpad) {
      this.events = [
        "click",
        "keypress"
      ];
      for (let i in this.events) {
        window.addEventListener(this.events[i], this.resetTimeout);
      }
      // NSADT-73235 : adding event to disconnect bridge when closing tab/window
      if(!window.location.hostname.includes("localhost") && localStorage.getItem("channel") && localStorage.getItem("channel").indexOf('TELESALES') < 0){
        window.removeEventListener('beforeunload', this.disconnectBridge);
        window.addEventListener('beforeunload', this.disconnectBridge);
      }
    }else{
      this.retrieveCurrentSessionInfo();
    }
    if(window.location.hostname.includes("localhost") && (window.location.pathname.search("/tradeInTracker") > 0 || (window.location.pathname.search("/addLines") > 0 && ( getQueryParamByName("customerType") === "N" || getQueryParamByName("newPostToPreIndicator")=== "true" && getQueryParamByName("customerType") === "U")))){
      let req = {
        "aud": "00098c72-d55a-1dd2-9d75-ac5d0a4d0000",
        "sub": "",
        "iss": "https://federationuat.verizon.com",
        "userid": ""
      };
      console.log("New customer generateAPI");
      this.generateJWTApi(req);
    }else{
      console.log("init API call");
      this.initApiCall();
    }
    if(isEnableSalesRecommender()){
      window.addEventListener(
        "message",
        this.handleNotifEvent
      );
    }
  }



  componentDidUpdate = (prevProps) => {
    //New relic related code - Start
    const loggedInUser = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.loggedInUser
    const prevLoggedInUser = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.loggedInUser
    if ((loggedInUser && !prevLoggedInUser) || (loggedInUser !== prevLoggedInUser))
    {
      Trace.traceCustomAttribute("loggedInUser", loggedInUser);
    }
    const orderLocationCode = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.orderLocationCode
    const prevOrderLocationCode = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.orderLocationCode
    if ((orderLocationCode && !prevOrderLocationCode) || (orderLocationCode !== prevOrderLocationCode))
    {
      Trace.traceCustomAttribute("ORDERLOC", orderLocationCode);
    }
    const homeLocationCode = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.homeLocationCode
    const prevHomeLocationCode = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.homeLocationCode
    if ((homeLocationCode && !prevHomeLocationCode) || (homeLocationCode !== prevHomeLocationCode))
    {
      Trace.traceCustomAttribute("HOMELOC", homeLocationCode);
    }
    const channel = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.channel
    const prevChannel = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.channel
    if ((channel && !prevChannel) || (channel !== prevChannel)) {
      Trace.traceCustomAttribute("channel", channel);
    }
    if (window.location.hostname.includes("localhost") &&
    ((channel && !prevChannel) || (channel !== prevChannel)))
    {
      HttpService.defaults.headers["channelId"] = localStorage.getItem("channel");
    }
    const serviceRegionId = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.serviceRegionId
    const prevServiceRegionId = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.serviceRegionId
    if ((serviceRegionId && !prevServiceRegionId) || serviceRegionId !== prevServiceRegionId) {
      Trace.traceCustomAttribute("serviceRegionId", channel);
    }
    const deptId = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.deptId
    const prevDeptId = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.deptId
    if ((deptId && !prevDeptId) || deptId !== prevDeptId) {
      Trace.traceCustomAttribute("deptId", deptId);
    }
    const ivrCallerId = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.ivrCallerId
    const prevIvrCallerId = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.ivrCallerId
    if ((ivrCallerId && !prevIvrCallerId) || ivrCallerId !== prevIvrCallerId) {
      Trace.traceCustomAttribute("ivrCallerId", ivrCallerId);
    }
    const callID = this.props.landing && this.props.landing.customerInfo && this.props.landing.customerInfo.callID
    const prevCallID = prevProps.landing && prevProps.landing.customerInfo && prevProps.landing.customerInfo.callID
    if ((callID && !prevCallID) || callID !== prevCallID) {
      Trace.traceCustomAttribute("callID", callID);
    }

    const mdn = this.props?.landing?.customerInfo?.lookupMtn
    const prevMdn = prevProps?.landing?.customerInfo?.lookupMtn
    if ((mdn && !prevMdn) || mdn !== prevMdn)
    {
      Trace.traceCustomAttribute("mdn", mdn);
    }

    const accountNumber = this.props?.landing?.customerInfo?.accountNo
    const prevAccountNumber = prevProps?.landing?.customerInfo?.accountNo
    if ((accountNumber && !prevAccountNumber) || accountNumber !== prevAccountNumber) {
      Trace.traceCustomAttribute("accountNumber", accountNumber);
    }

    //New relic related code - END
    if (get(this.props, "landing.customerInfo.chatId", "") !== get(prevProps, "landing.customerInfo.chatId", "")) {
      // console.log("chatId", get(this.props, "landing.customerInfo.chatId", ""));
      sessionStorage.setItem("chatId", get(this.props, "landing.customerInfo.chatId", ""));
    }

    // Cheking for the logged In User to make the call.
    if (get(prevProps, "landing.customerInfo.loggedInUser") !== get(this.props, "landing.customerInfo.loggedInUser") ) {
      // Check pendo 
      console.log('calling checkPendo');
      this.checkPendo(this.props.landing.customerInfo.loggedInUser);
    }
    const titleAppend = domService.getCookie("soedc")
    const sessionChannel = sessionStorage.getItem("channel")
    if ((channel === "OMNI-CARE" || sessionChannel === "OMNI-CARE") && titleAppend !== null && !document.title.includes(titleAppend))
    {
      const beforeTitle = document.title
      document.title = document.title + " - " + titleAppend
      console.log("OMNI-CARE : document title changed from \"" + beforeTitle + "\" to \"" +  document.title + "\"")
    }
  }

  disableGlobalNavRefresh() {
    const channel = localStorage.getItem("channel") ;
    if(window.opener && (channel == 'OMNI-TELESALES' || channel == 'CHAT-STORE')){
      const message = {
        iframe: "home",
        disableGlobalNavRefresh: "true"
      };
      window.opener.postMessage(message,window.parent.location.origin);
      if(window.opener.parent && window.opener.parent !== window.opener){
        window.opener.parent.postMessage(message,window.parent.location.origin);
      }
    }
  }

  handleNotifEvent = ({data}) => {
    const { type, message, duration, customStyle } = data;
    if(isEqual(type, "salesIntentNotification")) {

      if(Object.keys(message)?.[0] === 'settings') {
        const notificationEnabled = Object.values(message)?.[0];
        if(notificationEnabled === 'notifoff') {
          sessionStorage.setItem('isNotificationEnabled', false);
        } else if(notificationEnabled === 'notifon' || notificationEnabled === 'audiooff' || notificationEnabled === 'audioon') {
          return;
        }
      }
     
      const isCCAIIntent = typeof message !== 'string' ? Object.keys(message)?.[0] === 'ccaiIntent' : false;
      if(isEnableSalesNotification() && isEnableSalesRecommender() && isCCAIIntent) { 
        ccaiIntentHandler(message, this.props.history,  this.props.getAppPropertiesFromSessionStorage({}))
      } else {
        this.setState({
          showNotification: true,
          notificationMsg: message,
          duration: duration,
          customStyle: customStyle
        });
      }
     
    }
  };

  // 399
  retrieveCurrentSessionInfo() {
    const sessParam = { key: 'CURRENT_SESSION', callback: 'window.currentIOSSessionInfo' };
    const userProfParam = { key: 'USER_PROFILE', callback: 'window.setUserProfile', returnBase64: 'true' };
    const appProperties = { key: 'APP_PROPERTIES', callback: 'window.getAppProperties' };
    const comboParams = {
      params: [
          { class: 'SharedMemory', functionName: 'getData', params: sessParam },
          { class: 'SharedMemory', functionName: 'getData', params: userProfParam },
          { class: 'SharedMemory', functionName: 'getData', params: appProperties },
      ],
  };
   // set 1s timeout so that the previous executeShellFunction call does not get overwritten in the shared native iFrame
   setTimeout(() => {
    console.log('GN:app:currentIOSSessionInfo: getData');
    this.props.executeShellFunction('Shell', 'executeShellFunctions', 'none', comboParams);
  }, 1000);
}

setVZEClickToCall (value) {
  sessionStorage.setItem('VZEClickToCall', value);
}

setFromVZEngage (value) {
  sessionStorage.setItem('isFromVZEngage', value);
}

setUserProfile(value) {
  if (value) {
      try {
          console.info('OP:app:setUserProfile: got value, looking for JSON...');
          // Base64 check first
          let dataString = value;
          try {
              dataString = atob(value);
              console.info('OP:app:setUserProfile: base64 encoding detected and decoded');
          } catch (ex) {
              dataString = value;
              console.info('OP:app:setUserProfile: not base64 encoded...moving on');
          }
          // Parse JSON from string (or accept raw JSON obj directly)
          const userProf = /string/i.test(typeof dataString) ? JSON.parse(dataString) : dataString;
          if (userProf) {
              // set our user profile (setting a few custom fields needed for selectors)
              const { posRoleId } = userProf;
              sessionStorage.setItem('posRoleId', posRoleId);
          }
      } catch (er) {
          console.warn('User profile info not available');
      }
  } else {
      // Fallback to normal /userProfileGlobal call
      console.warn('OP:setUserProfile: unable to read USER_PROFILE from SharedMemory.');
  }
}

getAppProperties = (value) => {
  if (value) {
    try {
      const appProp = JSON.parse(value);
      console.log("--getAppProperties appProp",appProp)
      if (appProp) {
        sessionStorage.setItem('APP_PROPERTIES', JSON.stringify(appProp));
      }
    } catch (err) {
      console.log(err)
    }
}
}
  // callback for iPad to pass 'CURRENT_SESSION' JSON
  currentIOSSessionInfo = (value) => {
      if (value) {
          try {
              console.log(`GN:App:currentIOSSessionInfo: ${value}`);
              const sessionVal = JSON.parse(value);
              if (sessionVal) {
                  // set uswin/location/visitorId/machineName from iPad
                  window.userId = sessionVal.uswin ? sessionVal.uswin : '';
                  window.visitorId = sessionVal.visitorId ? sessionVal.visitorId : '';
                  window.machineName = sessionVal.machineName ? sessionVal.machineName : '';
                  let orderLocation = sessionVal.orderLocation ? sessionVal.orderLocation : '';
                  let salesRepIdVal = sessionVal.salesRepId ? sessionVal.salesRepId : '';
                  let mposAppVersionVal = sessionVal.mposAppVersion ? sessionVal.mposAppVersion : '';
                  let isDistributionAgent = sessionVal.isDistributionAgent ? sessionVal.isDistributionAgent : '';
                  let registerNumber = "51";
                  sessionStorage.setItem('userId', window.userId);
                  sessionStorage.setItem('location', orderLocation);
                  sessionStorage.setItem('visitorId', window.visitorId);
                  sessionStorage.setItem('machineName', window.machineName);
                  sessionStorage.setItem('salesRepId', salesRepIdVal);
                  sessionStorage.setItem('mposAppVersion', mposAppVersionVal);
                  sessionStorage.setItem('registerNumber', registerNumber);
                  console.log("set userId in sessionStorage",sessionStorage);
                  const userProfile = {}  
                  userProfile.userId = window.userId;          
                  userProfile.salesRepId = salesRepIdVal
                  userProfile.orderLocation = orderLocation;
                  userProfile.isDistributionAgent = (/true/i).test(isDistributionAgent);
                  this.props.loadUserProfileInfo(userProfile);
              }
          } catch (er) {
              console.warn('LP:App:currentIOSSessionInfo: unable to read "CURRENT_SESSION"', er);
          }
      }
  };

  doAnalyticssessionidCallback = (analyticsSessionData = null) => {
    console.log('doAnalyticssessionidCallback: ' + analyticsSessionData);
    try {
      // get string and object versions
      if (typeof analyticsSessionData === 'string') {
        const sessionId =_.toString(analyticsSessionData);
        sessionStorage.setItem('analyticssessionid',sessionId);
        window.vzdl.page.channelSession = sessionId;
        console.log("****pageViewChannelSession", window.vzdl.page.name, window.vzdl.page['name'] === "RFEX_OrderSearch", domService.isIpad(), !isEmpty(window.vzdl.page.channelSession), window.vzdl.page.channelSession)
        if(window.vzdl.page['name'] === "RFEX_OrderSearch" && domService.isIpad() && !isEmpty(window.vzdl.page.channelSession)) {
          sendCustomEvent(EVENTS.PAGE_VIEW, window.vzdl)
        }
      } else {
        sessionStorage.setItem('analyticssessionid', '');
      }
    } catch (ex) {
        console.warn('ordering postPay: Unable to read analyticssessionid', ex);
    }
  }

  // Pendo
  checkPendo = (uswinVal = '') => {
    let isIpad = domService.isIpad();
    try {
        let doPendo = sessionStorage.getItem('isPendoEnabled') || '';
        if ((doPendo && /true/i.test(doPendo)) || /welchba|gillron/i.test(uswinVal)) {
            console.info('Ordering Postpay:checkPendo:loading Pendo for: '+uswinVal);
            
            this.loadPendo();
            setTimeout(() => {
                this.initializePendo();
            }, 1500);
            // Set ipad/desktop flag
            sessionStorage.setItem('isPendoEnabled','true');
            if (isIpad) {
                const param = { key: "isPendoEnabled", value: "true" }
                executeShellFunction('SharedMemory', 'setData', 'none', param);
            }
        } else {
            console.info('Ordering Postpay:checkPendo: skipping pendo...');
            sessionStorage.setItem('isPendoEnabled','false');
            if (isIpad) {
                const param = { key: "isPendoEnabled", value: "false" }
                executeShellFunction('SharedMemory', 'setData', 'none', param);
            }
        }
    } catch (er) {
        console.warn('Ordering Postpay:checkPendo: error', er);
        sessionStorage.setItem('isPendoEnabled','false');
        if (isIpad) {
            const param = { key: "isPendoEnabled", value: "false" }
            executeShellFunction('SharedMemory', 'setData', 'none', param);
        }
    }
  };

  loadPendo = () => {
    try {
        (function (apiKey) {
            (function (p, e, n, d) {
                var v, w, x, y, z; o = p[d] || {}; o._q = [];
                v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track']; for (w = 0, x = v.length; w < x; ++w)(function (m) {
                    o[m] = o[m] || function () { o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0))); };
                })(v[w]);
                y = e.createElement(n); y.async = !0; y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
                z = e.getElementsByTagName(n)[0]; z.parentNode.insertBefore(y, z);
            })(window, document, 'script', 'pendo');
        })('ecf03a2d-39c7-4dbb-57f0-d162fad62920');
    } catch (er) {
        console.warn('Ordering Postpay:loadPendo: error', er);
    }
  };

  initializePendo = () => {
    try {
        window['pendo'] && window['pendo'].initialize({
            visitor: {
                // USWIN
                id: sessionStorage.getItem('userId')
            },
            account: {
                // Order location
                id: sessionStorage.getItem('location')
            }
        });
    } catch (er) {
        console.warn('Ordering Postpay:initializePendo: error', er);
    }
  };
// END Pendo

  generateJWTApi = (Request)=> {
    let soeGuiValue = {"mtn":"2602341685","accountNumber":"0280771298-00001","ORDERLOC":"2777301","HOMELOC":"2777301","channel":"OMNI-RETAIL","regNo":"10","repId":"ENC","loggedInUser":"","quickView":{"pendingOrderCount":0,"eligibleLineCount":1,"pastDue":"0.00","btaAmount":"750.00","dpEligibility":"Not Verified","tmpmdEligible":true}};

    let subkey = uuidv4()

    sessionStorage.setItem("soeguisubkey", subkey);
    sessionStorage.setItem("soeguivalue", btoa(JSON.stringify(soeGuiValue)));
    sessionStorage.setItem("assisted_ig_session", "f588abd7-4c3f-40c3-96de-65c14584e0eb-25429");
    
    let url = "https://onevzssosoe-east-gz-dit3.ebiz.verizon.com/generate/jwt";

    if(sessionStorage.getItem("APIContext").includes("localhost")){
      url = `http://${window.location.host}/generate/jwt`;
    }

    HttpService.post(url, Request)
      .then(response => {
        if (response && response.data && response.data.JWTToken) {
          sessionStorage.setItem("jwtToken", response.data.JWTToken);
        }
        this.initApiCall();
      })
      .catch(error => {
        console.log(error);
      });
  }

  initApiCall = () =>  {
    console.log("initApiCall");
    if(this.props.landing && this.props.landing.cartfiveGResponse){
      return;
    }
    const isIpad = domService.isIpad();
    const wikiPlanCompareLoad = window.location.pathname.includes("plan-comparison") || false;
    if (!isIpad && !wikiPlanCompareLoad) {
      this.setMaxUserIdleTime();
    }

    //Note: Included the refund-exchange html in below condition, to be removed later.
    if (this.isPageToSkipLandingCall()) {
      if (localStorage.getItem("channel")) {
        const BASE_URL = sessionStorage.getItem("APIContext");
        const EXTEND_SESSION_URL = "/peripheralsservice/extendSession";
        const req = {
          channel: localStorage.getItem("channel")//"OMNI-TELESALES"
        };
        HttpService.post(BASE_URL + EXTEND_SESSION_URL, req).then(data => {
          if (data) {
            if (localStorage.getItem("channel") !== null && localStorage.getItem("channel") !== "null")
              HttpService.defaults.headers["channelId"] = localStorage.getItem("channel");//"OMNI-TELESALES";
            this.makeLandingAPICall();
          }
        }).catch(() => {
          console.log("LOG-DEBUG: App -> componentDidMount -> Error while making initLandingRequest");
          this.makeLandingAPICall();
        });
      }
    }
    if(window.location.pathname.includes("fiveGInter")){
      const cartRequest = {
        history: this.props.history,
        cartId: getQueryParamByName("fiveGCartId")||sessionStorage.getItem("fiveGCartId"),
      };
      this.props.retriveCartfiveGRequest(cartRequest);
      //this.makeLandingAPICall();
    }
    const fiveGHomeRFEX = getQueryParamByName("intendType") ? getQueryParamByName("intendType") === "5GHomeRFEX" : false; 
    if(fiveGHomeRFEX){
      const propsHistory = {
        history: this.props.history,
      };
      this.props.initCreateCart(propsHistory);
      //this.makeLandingAPICall();
    }
  }
  makeLandingAPICall() {
    const path = window.location.pathname;
    // CXTDT-539258 : if sessionstorage value not there, pull from url param
    const winBackCustomer = /true/i.test(sessionStorage.getItem("winBackFlow")) || /winback/i.test(getQueryParamByName("flowType"));
    const newCustomerWithoutCredit = getQueryParamByName("newCustomerWithoutCredit") || getQueryParamByName('skipCreateCase');
    const postToPreExistingCustomer = (getQueryParamByName("customerType") === "U" && getQueryParamByName("newPostToPreIndicator")=== "true" )
    //const newPostToPreIndicator = getQueryParamByName("newPostToPreIndicator");
    console.log('winback flow: ' + winBackCustomer);
    if (localStorage.getItem("channel") != "OMNI-INDIRECT"){
      if (newCustomerWithoutCredit != "true") {
        if ((getQueryParamByName("customerType") === "N" || postToPreExistingCustomer || getQueryParamByName("isDoorToDoorFlow") === "true" || winBackCustomer)
        && path.search("/addLines") > 0) {
              this.props.initLandingRequestNc("", "", localStorage.getItem("channel"))
        } else {
          this.props.initLandingRequest();
        }
      }
  }

  if (localStorage.getItem("channel") === "OMNI-INDIRECT"){
    if (newCustomerWithoutCredit != null && newCustomerWithoutCredit != "true") {
      if ((getQueryParamByName("customerType") === "N" || getQueryParamByName("isDoorToDoorFlow") === "true" || winBackCustomer || postToPreExistingCustomer)
        && path.search("/addLines") > 0) {
            this.props.initLandingRequestNc("", "", localStorage.getItem("channel"))
      } else {
        this.props.initLandingRequest();
      }
    }
    else{
      console.log("OMNI_INDIRECT customerType", getQueryParamByName("customerType"));
      console.log("OMNI_INDIRECT path,localStorage_customerType ", path, localStorage.getItem("customerType"));
      if(( localStorage.getItem("customerType") === "N" || getQueryParamByName("customerType") === "N"   || postToPreExistingCustomer)  && ( window.location.pathname.search("/addLines") > 0 || path.search("/addLines") > 0)){
        //let editvar = window.vzdl.page.url ? window.vzdl.page.url.split("?") : null;
        console.log(window.location.href,"OMNI_INDIRECT Inside If1");
        if(window.location.href.includes("edit=true")){
          console.log(window.location.href,"OMNI_INDIRECT Inside If2");
          this.props.history.navigatePage(domService.getUIContextPath() + `/addLines.html?edit=true`);
          //Trace.tracePageAction('OrderLanding', { 'Lines': "AddALine" });
          this.props.initLandingRequest();
        }
        else{
          console.log(window.location.href,"OMNI_INDIRECT Inside else2");
          this.props.initLandingRequestNc("", "", localStorage.getItem("channel"));
        }
      }
      else{
        console.log(window.location.href,"OMNI_INDIRECT Inside else3");
        this.props.initLandingRequest();
      }
    }
  }

    
    // (localStorage.getItem("ETRAssistedAcct"),
    // localStorage.getItem("ETRAssistedMTN"),
    // localStorage.getItem("channel"),
    // localStorage.getItem("storeLoc"),
    // localStorage.getItem("salesRepId"),
    // localStorage.getItem("regNumber"),
    // localStorage.getItem("caseId"),
    // localStorage.getItem("cartId"));
  }

  componentWillMount() {
    if(domService.getQueryParamByName("isWHWRedeem") == "true") {
      this.props.triggerGetWHWRedeemFlow(true);
    }
    if(domService.getQueryParamByName("isMidnightRedeem") == "true") {
      this.props.setMidnightRedeem(true);
    }
    if (sessionStorage.getItem('location')) {
      const location = sessionStorage.getItem('location');
      sessionStorage.setItem("locationCode", location);
    }
    this.props.getUrlMapping(this.props.URLMapping);
    this.props.getHomeServiceLink(this.props.homeServiceLink);
    this.props.getAccessoryBundleFlag(this.props.accessoryBundleEnabled);
    this.props.getMiniCartEnabledFlag(this.props.miniCartEnabled);
    this.props.getLeadsUIEnabledFlag(this.props.leadsUIEnabled);
    this.props.getCreateQuoteBoxEnabled(this.props.createQuoteBoxEnabled);
    this.props.getViewQrCode(this.props.viewQrCode);
    this.props.getNewCustomerQuoteResumeEnabled(this.props.newCustomerQuoteResumeEnabled);
    this.props.getNewCustomerFlowEnabledFlag(this.props.newCustomerFlowEnabled);
    this.props.getNewCustomerInlineQuoteEnabledFlag(this.props.newCustomerInlineQuoteEnabled);
    this.props.getCompareQuoteEnabledFlag(this.props.compareQuoteEnabled);
    this.props.getPlanPerkIndEnableFlag(this.props.isPlanPerkIndEnable);
    this.props.getNoEmailQuoteCheckbox(this.props.enableNoEmailQuoteCheckbox);
    this.props.getEnableQuoteFeatureUserList(this.props.enableQuoteFeatureUserList);
    this.props.getEnableCompareQuoteTaxWithZipCode(this.props.enableCompareQuoteTaxWithZipCode);
    this.props.getEnableFeedbackFormUserList(this.props?.enableFeedbackFormUserList ?? "");
    this.props.getCompareQuotePdfEnabled(this.props.compareQuotePdfEnabled);
    this.props.getQuoteLowerBillEnabled(this.props.quoteLowerBillEnabled);
    this.props.getEnableAddNote(this.props.enableAddNote);
    this.props.getEnableSkipMdn(this.props.enableSkipMdn);
    this.props.getEnableTradeInFMILock(this.props.enableTradeInFMILock);
    this.props.getDiscountRequiringActionQuoteEnabled(this.props.discountRequiringActionQuoteEnabled);
    this.props.getApplyOffersQuoteEnabled(this.props.applyOffersQuoteEnabled);
    this.props.getEstimatedNextBillQuoteEnabled(this.props.estimatedNextBillQuoteEnabled);
    this.props.getCpeWithoutDeviceIdEnabled(this.props.cpeWithoutDeviceIdEnabled);
    this.props.getCpeWithoutDeviceIdFlow(this.props.cpeWithoutDeviceIdFlow);
    this.props.getLovUrl(mapInspicioHost());
    this.props.getIgAdaptiveAuthUrl(this.props.igAdaptiveAuthUrl);
    this.props.getcustomerAgreementDataUrl(this.props.customerAgreementDataUrl);
    this.props.getretailIndirectAgreementDataUrl(this.props.retailIndirectAgreementDataUrl);
    this.props.getimportantPlanInfoNonProdUrl(this.props.importantPlanInfoNonProdUrl);
    this.props.getimportantPlanInfoProdUrl(this.props.importantPlanInfoProdUrl);
    this.props.getimportantBroadBandInfoNonProdUrl(this.props.importantBroadBandInfoNonProdUrl)
    this.props.getimportantBroadBandInfoProdUrl(this.props.importantBroadBandInfoProdUrl)
    this.props.getdDisableAccessoryForTechCoachRep(this.props.disableAccessoryForTechCoachRep);
    this.props.getDisableTradeInForTechCoachRep(this.props.disableTradeInForTechCoachRep);
    this.props.getDisableMobilityForTechCoachRep(this.props.disableMobilityForTechCoachRep);
    this.props.getSkipTradeinDeviceIdQuoteFlag(this.props.skipTradeinDeviceIdQuote);
    this.props.getTradeInDeviceNotificationFlag(this.props.tradeInDeviceNotification);
    this.props.setIntendTypeForADEX(getQueryParamByName("intendType"));
    this.props.setNetworkBandWidthIndicator(getQueryParamByName("networkBandWidthIndicator"));
    this.props.setCustomerTypeForADEX(getQueryParamByName("customerType"));
    this.props.setfiveGInter({"fiveGInter":getQueryParamByName("fiveGInter")||sessionStorage.getItem("fiveGInter")});
    this.props.setfiveGCartId({"fiveGCartId":getQueryParamByName("fiveGCartId")||sessionStorage.getItem("fiveGCartId")});
    this.props.setCustomerType({ "CustomerType": getQueryParamByName("customerType") || sessionStorage.getItem("customerType") });
    this.props.setComboOrderAllowed({ "isComboOrderAllowed": getQueryParamByName("isComboOrderAllowed") });
    this.props.setLPCartId({ "LPCartId": getQueryParamByName("lpCartId") }); 
    this.props.setEcreditFlowType({ "ECreditFlowType": getQueryParamByName("flowtype") }); 
    this.props.setCreditAppNumber({"CreditAppNum":getQueryParamByName("creditAppNum")||sessionStorage.getItem("creditAppNum")});
    this.props.setLocationCode({"LocationCode":getQueryParamByName("locationCode")||sessionStorage.getItem("locationCode")});
    this.props.setRepId({"RepId":getQueryParamByName("salesRepId")||sessionStorage.getItem("salesRepId")});
    this.props.setLoggedInUser({"LoggedInUser":getQueryParamByName("salesRepUserId")||sessionStorage.getItem("userId")});
    this.props.setShellAccountSelected({ "shellAccountSelected": getQueryParamByName("shellAccountSelected") });
    this.props.setCustomerFlowType({"customerFlowType":getQueryParamByName("flowType")});
    this.props.getfeedbackwikiFlag(this.props.vikiFeedBack);
    this.props.getfeedbackwikiUserLocationList(this.props.enableFeedBackwikiUserLocationList);
    this.props.getFlexPPOEnabledFlag(this.props.flex_PPO_ENABLED);
    this.props.getMyOffersFlag(this.props.myOffersFlag);
    this.props.getEnableDeviceConfig(this.props.enableDeviceConfig);
    this.props.getEnableDeviceConfigLocAndUser(this.props.enableDeviceConfigLocAndUser);
    this.props.getDisableSharedPlanForNSE(this.props.disableSharedPlanForNSE);
    this.props.getAvaialbleStoresToggleEnabledUsers(this.props?.avaialbleStoresToggleEnabledUsers ?? "");
    this.props.getDisplayAvailableStoresToggle(this.props?.displayAvailableStoresToggle ?? "");
    this.props.getDisplayCustomerInsightsFromAEM(this.props?.displayCustomerInsightsFromAEM ?? "");
    this.props.getCustomerInsightsEnabledUsers(this.props?.customerInsightsEnabledUsers ?? "");
    this.props.getIsHomeInterntBannerEnabled(this.props.isHomeInterntBannerEnabled);
    this.props.getCpeWithoutDeviceIdChannelsEnabled(this.props.cpeWithoutDeviceIdChannelsEnabled);
    this.props.getIsReactiveVikiEnabled(this.props.isReactiveVikiEnabled)
    this.props.getAppPropertiesFromSessionStorage(JSON.parse(sessionStorage.getItem("APP_PROPERTIES")) || {})
    this.props.setDoorToDoorExistingCust({"doorTodoorCutomer": (getQueryParamByName("isDoorToDoorFlow") === 'true')?getQueryParamByName("isDoorToDoorFlow"):sessionStorage.getItem("channel")?.indexOf("OMNI-D2D") >-1?'true':'false'});
    this.props.setPromoBundleFlow({"promoBundleFlow":getQueryParamByName("isBundleFlow")||sessionStorage.getItem("promoBundleFlow")});
    this.props.setPromoBundlesku({"promoBundlesku":getQueryParamByName("sorId")});
    this.props.setPromoBundlesku2({"promoBundlesku2":getQueryParamByName("sorId2")});
    this.props.setPromoBundlemtn({"promoBundlemtn":getQueryParamByName("mtn")});
    this.props.setTysFlow({"isTysFlow":getQueryParamByName("isTysFlow")});
    this.props.getConflictNotificationFlag(this.props.enableConflictNotification);
    this.props.getShowNseNextBillSummary(this.props.showNseNextBillSummary);
    this.props.getProductionReadyUIChanges(this.props.productionReadyUIChanges);
    this.props.getShowQuoteOthVenAddon(this.props.showQuoteOthVenAddon); 
    this.props.getValidateEmailEnabled(this.props.validateEmailEnabled);
    this.props.getContractCompatibility(this.props.contractCompatibility);
    this.props.getAffirmFinancingEnabled(this.props.affirmFinancingEnabled);
    this.props.getIsLocalPreBackOrder(this.props.isLocalPreBackOrder);
    this.props.getAddNewQuoteEnabled(this.props.addNewQuoteEnabled);
    this.props.getDisableInspicioChangeRestrictionForTechCoachRep(this.props.disableInspicioChangeRestrictionForTechCoachRep);
    this.props.getDisableProfileChangeRestrictionForTechCoachRep(this.props.disableProfileChangeRestrictionForTechCoachRep);
    this.props.getDisableAALDeviceSelectionRestrictionForTechCoachRep(this.props.disableAALDeviceSelectionRestrictionForTechCoachRep);
    this.props.getLineDeleteOptionEnabled(this.props.lineDeleteOptionEnabled);
    
    if(sessionStorage.getItem("refundexchange")){    
    this.props.loadEmptyState();
    }   
     
    
    const inspicioData = {
      enableBAUReceiveMessage: this.props.enableBAUReceiveMessage,
      inspicioUATUrl: this.props.inspicioUATUrl,
      inspicioSDCUrl: this.props.inspicioSDCUrl,
      inspicioTDCUrl: this.props.inspicioTDCUrl,
      inspicioTPAUrl: this.props.inspicioTPAUrl,
      inspicioUrl: this.props.inspicioUrl,
      enableLOVMilestoneHeader: this.props.enableLOVMilestoneHeader,
      submitInspicioHostUrl: this.props.submitInspicioHostUrl,
      enableParallelPayment: this.props.enableParallelPayment,
      enableGiftCardInspicio: this.props.enableGiftCardInspicio,
      enableSavedWallet: this.props.enableSavedWallet,
      ivrQueueFlowEnabled: this.props.ivrQueueFlowEnabled,
      enableBackupPayment: this.props.enableBackupPayment
    };
    this.props.setReceiveMsgFlag(inspicioData);
    this.props.getChatStoreURL(this.props.accountDetailsChatStoreURL);
    this.props.getCovidFiveGApptBanner(this.props.covidBannerFiveGAppointment);
    this.props.getFiveGProfInstallCharges(this.props.fiveGProfInstallCharges);
  }

  clearTimeoutFunc = () => {
    if (this.warnTimeout)
      clearTimeout(this.warnTimeout);
  };

  setMaxUserIdleTime = () => {
    const maxUserIdleTime = 1000 * 15 * 60; // 15 mins.
    // const maxUserIdleTime = 1000; // 15 mins.
    this.warnTimeout = setTimeout(this.openExtendSessionModel, maxUserIdleTime);
  };

  resetTimeout = () => {
    this.clearTimeoutFunc();
    this.setMaxUserIdleTime();
    let channel = localStorage.getItem("channel") ;
    if(window.opener && (channel == 'OMNI-TELESALES' || channel == 'CHAT-STORE'))
    {
      const message = {
        iframe: "home",
        resetIdleTimer: true
      };
      window.opener.postMessage(message,window.parent.location.origin);
      if(window.opener.parent && window.opener.parent !== window.opener){
        window.opener.parent.postMessage(message,window.parent.location.origin);
      }
    }
  };

  openExtendSessionModel = () => {
    this.showExtendSession = true;
    const maxIdleTimeInModal = 1000 * 15 * 60;
    this.modalTimeout = setTimeout(this.closeSession, maxIdleTimeInModal)
    this.forceUpdate();
  };

  closeSession = () =>{
    this.showExtendSession = false;
    this.logout();
  };

  logout = () => {
    if(!domService.inIframe()){ 
      window.close();
    }
  };

  extendSession = () => {
    const BASE_URL = sessionStorage.getItem("APIContext");
    const EXTEND_SESSION_URL = "/peripheralsservice/extendSession";
    const req = {
      channel: localStorage.getItem("channel")//"OMNI-TELESALES"
    };
    HttpService.post(BASE_URL + EXTEND_SESSION_URL, req).then(() => {
      this.resetTimeout();
      this.showExtendSession = false;
    }).catch(() => {
      console.log("LOG-DEBUG: App -> extendSession -> Error while extending session");
    });

    this.resetTimeout();
    this.showExtendSession = false;
    if(this.modalTimeout){
      clearTimeout(this.modalTimeout);
    }
    let channel = localStorage.getItem("channel") ;
    if(window.opener && (channel == 'OMNI-TELESALES' || channel == 'CHAT-STORE'))
    {
      const message = {
        iframe: "home",
        resetIdleTimer: true,
        extendSession: true
      };
      window.opener.postMessage(message,window.parent.location.origin);
      if(window.opener.parent && window.opener.parent !== window.opener){
        window.opener.parent.postMessage(message,window.parent.location.origin);
      }
    }

    this.forceUpdate();
  };

  dontExtendSession = () => {
    this.showExtendSession = false;
    this.logout();
    this.forceUpdate();
  };


  toRenderOrNotToRender(justRender = false){
    let isIpad = domService.isIpad()
    let isToLoadPageAgain;
    if (justRender || (this.props.landing && this.props.landing.lineDetails && this.props.landing.lineDetails.length > 0
      && this.props.landing.cartDetails && this.props.landing.cartDetails.lineInfo)) { // lets wait for both landing & retrieve-cart api's success
      isToLoadPageAgain = (
        <div>
          <AppMessage />
          <AppLoader />
          <BootstrapPeripherals />
          {isToLoadPageAgain}
          {this.childComponents}
          {this.childPages}
        </div>
      );


    } else {
      isToLoadPageAgain = (
        <div> <AppLoader loader="true" /> </div>
      );
    }
    return isToLoadPageAgain;
  }

  machineNameCallback = (data) => {
    console.log("machineName", data);
    sessionStorage.setItem("machineName",data);
  }

  doAdobeAnalyticCheck = (adobe = "") => {
    if(adobe === 'true' || adobe ==="") {
      loadjscssfile(SC_SCRIPT, 'js');
    }
  }

  toLoadShellScripts = () => {
    let shellParams = {
     key: "machineName", callback: 'window.machineNameCallback'
    };
    let glassboxParams ={
      key: "isGlassboxEnabled", callback: 'window.doGlassboxCheck'
    }
    let nrParams ={
      key: "isNewrelicEnabled", callback: 'window.doNewrelicCheck'
    }
    let quoteParams = {
      key: "APP_PROPERTIES", callback: 'window.doQuoteFlagCallback'
     };
    let paxParams = {
      key: "isPAXEnabled", callback: 'window.doPAXCheck'
    };
    let adobeParams = {
      key: "isSitecatalystEnabled", callback: 'window.doAdobeAnalyticCheck'
    };
    let leadInfoParams = {
      key: "LEAD_INFO", callback: 'window.getLeadInfoData'
    };
    let analyticssessionParams = {
      key: 'analyticssessionid', callback: 'window.doAnalyticssessionidCallback'
    };
    let defaultSalesRepParams = {
      key: 'DEFAULT_SALES_REP', callback: 'window.defaultSalesRepCallback'
    };
    let contentSquareParams = {
      key: "isContentSquareEnabled", callback: 'window.doContentSquareCheck'
    };
    let clickToCallParams = { key: 'VZEClickToCall', callback: 'window.setVZEClickToCall' };
    let fromVZEParams = { key: 'isFromVZEngage', callback: 'window.setFromVZEngage' };
    const comboParams = {
      params: [
          { class: 'SharedMemory', functionName: 'getData', params: shellParams },
          { class: 'SharedMemory', functionName: 'getData', params: glassboxParams },
          { class: 'SharedMemory', functionName: 'getData', params: nrParams },
          { class: 'SharedMemory', functionName: 'getData', params: quoteParams },
          { class: 'SharedMemory', functionName: 'getData', params: adobeParams },
          { class: 'SharedMemory', functionName: 'getData', params: paxParams },
          { class: 'SharedMemory', functionName: 'getData', params: leadInfoParams },
          { class: 'SharedMemory', functionName: 'getData', params: analyticssessionParams },
          { class: 'SharedMemory', functionName: 'getData', params: defaultSalesRepParams },
          { class: 'SharedMemory', functionName: 'getData', params: contentSquareParams},
          { class: 'SharedMemory', functionName: 'getData', params: clickToCallParams },
          { class: 'SharedMemory', functionName: 'getData', params: fromVZEParams }
      ],
    };
    executeShellFunction('Shell', 'executeShellFunctions', 'none', comboParams);
    this.setState({isScriptAdded: true})
    console.log('executed shell scripts');
  }
  defaultSalesRepCallback = (defaultSalesRepData = null) => {
    console.log('defaultSalesRepCallback: ' + defaultSalesRepData);
    try {
      // get string and object versions
      if (typeof defaultSalesRepData === 'string') {
        const defaultSalesRep =_.toString(defaultSalesRepData);
        sessionStorage.setItem('defaultSalesRep', defaultSalesRep);
      } else {
        sessionStorage.setItem('defaultSalesRep', '');
      }
    } catch (ex) {
        console.warn('Unable to read default sales rep id from shell {}', ex);
    }
  }
  // Quote Callback (iPad)
  doQuoteFlagCallback = (data = {}) => {
      try {
        console.log('fetched data from app_properties ', data);
        const dataObj = JSON.parse(data);
        const { quoteEnabledFlag = false } = dataObj;
        console.log('quoteEnabledFlag ', quoteEnabledFlag);
        
        /* Storing the APP_PROPERTIES in redux for insights */
        this.props.getAppPropertiesFromSessionStorage(dataObj);
        
        this.props.getAssistedQuoteFlag(quoteEnabledFlag);
          } catch (er) {
            console.warn('Unable to read Quote enabled flag',er);
          }
    }

    /** Quantum metric changes */
    getAssistedFlags = () => {
      try {
        return JSON.parse(sessionStorage.getItem('assistedFlags'));
      } catch (error) {
        console.error('Error parsing assistedFlags', error);
        return null;
      }
    }
  
    getQMScriptURL = () => {
      const assistedFlags = this.getAssistedFlags();
      const isQMEnabled = /true/i.test(_.toString(assistedFlags?.isQuantumMetricEnabled));
  
      if(isQMEnabled) {
        return assistedFlags?.QM_URL;
      }
  
      return 'NOT_ENABLED';
    }
  
    loadQMetricScript = () => {
      const QM_URL = this.getQMScriptURL();
  
      if(QM_URL === 'NOT_ENABLED') return;
  
      try {
        console.info('ordering app: loading Quantum Metric...');
        loadjscssfile(QM_URL,'js');
      } catch (er) {
        console.warn('ordering app: Unable to load quantum Metric ',er);
      }
    }

   // Glassbox Callback (desktop and iPad)
   doGlassboxCheck = (glassboxFlag = null) => {
    if(glassboxFlag ==='') glassboxFlag = true;
    const URL = this.getGBScriptURL();
    if (glassboxFlag || (/carestore-soe-ns/i.test(window.location.hostname) && URL !== '')) {
      try {
          const loadGlassbox =
            /true/i.test(_.toString(glassboxFlag)) ||
            (/carestore-soe-ns/i.test(window.location.hostname) && URL !== "");
          if (loadGlassbox) {
              console.info('ordering postPay: loading glassbox...');
              loadjscssfile(URL,'js');
            }
          } catch (er) {
              console.warn('ordering postPay: Unable to read glassbox enabled flag',er);
            }
        }
    }

    getGBScriptURL = () => {
      const  { RETAIL, INDIRECT, CAREPROD, CARENONPROD } = GB_SCRIPT;
      const CAREURL = (sessionStorage.getItem('isProd') == "true") ? CAREPROD : CARENONPROD;
      const channel = sessionStorage.getItem('channel');
      let URL = RETAIL;
      const assistedFlags = sessionStorage.getItem("assistedFlags") ? JSON.parse(sessionStorage.getItem("assistedFlags")) : null;
      if (channel?.indexOf('INDIRECT') > -1) {
        URL = INDIRECT;
      }
      else if((channel == 'OMNI-TELESALES' || channel == "CHAT-STORE") && sessionStorage.getItem('TELE_GB_URL')){
        URL = sessionStorage.getItem('TELE_GB_URL');
      }
      else if (channel == "OMNI-CARE") {
        URL = CAREURL;
      }
      return URL;
    }

    // Enable PAX payment option
    doPAXCheck = (paxFlag = null) => {
      console.log('paxFlag: ' + paxFlag);
      if(paxFlag ==='') {
        paxFlag = false;
      }
      try {
        const paxEnabled = /true/i.test(_.toString(paxFlag));
        sessionStorage.setItem('isPAXEnabled', _.toString(paxEnabled));
        console.log('isPAXEnabled: ' + sessionStorage.getItem('isPAXEnabled'));
      } catch (er) {
        console.warn('ordering postPay: Unable to read PAX enabled flag',er);
      }
    }

    //Enable content square option
    doContentSquareCheck = (contentSquareFlag = null) => {
      console.log('contentSquareFlag: ' + contentSquareFlag);
      if(contentSquareFlag ==='') {
        contentSquareFlag = false;
      }
      try {
        const contentSquareEnabled = /true/i.test(_.toString(contentSquareFlag));
        sessionStorage.setItem('isContentSquareEnabled', _.toString(contentSquareEnabled));
        console.log('isContentSquareEnabled: ' + sessionStorage.getItem('isContentSquareEnabled'));
      } catch (er) {
        console.warn('ordering postPay: Unable to read Content Square enabled flag',er);
      }
    }

    // Newrelic Callback (desktop and iPad)
    doNewrelicCheck = (newrelicFlag = null) => {
      if(newrelicFlag === '') newrelicFlag = true;
      // console.info('Ordering PostPay:doNewrelicCheck: window.NREUM: '+_.has(window,'NREUM'));
      if (newrelicFlag) {
          try {
              // const loadNewrelic = /true/i.test(_.toString(newrelicFlag));
              // if (loadNewrelic && !_.has(window,'NREUM')) {
              //     console.info('Ordering PostPay: loading newrelic/siteCatalyst...');
              //     loadjscssfile(NR_SCRIPT,'js');
              //     //Adding Site Catalyst paralel to newRelic
              //     loadjscssfile(SC_SCRIPT,'js');
              // }
              const loadSiteCatalyst = /true/i.test(_.toString(newrelicFlag));
              const load_AdobeLocal = /localhost/i.test(window.location.hostname) ;
              if(loadSiteCatalyst) {
                if(load_AdobeLocal){//CXTDT-450114 changes
                  loadjscssfile(SC_SCRIPT,'js');
                }
              }
              // Set newrelic flag in sessionStorage
              sessionStorage.setItem('isSiteCatalystEnabled',_.toString(loadSiteCatalyst));
          } catch (er) {
              console.warn('Ordering PostPay: Unable to read newrelic/siteCatalyst enabled flag',er);
          }
      } else {
          sessionStorage.setItem('isNewrelicEnabled','false');
      }
    }

    // Get Lead Info data from shell, and set to Session storage
    getLeadInfoData = (leadInfoData = null) => {
        console.log('getLeadInfoData: ' + leadInfoData);
        try {
            // get string and object versions
            if (typeof leadInfoData === 'string') {
              leadInfoData = JSON.parse(leadInfoData);
              sessionStorage.setItem('LEAD_INFO', JSON.stringify(leadInfoData));
            } else {
              leadInfoData = JSON.stringify(leadInfoData);
              sessionStorage.setItem('LEAD_INFO', leadInfoData);
            }
        } catch (ex) {
            console.warn('ordering postPay: Unable to read laed info', ex);
        }
    }

    toLoadScripts = (isIpad) => {

      if(isIpad && !this.state.isScriptAdded) {
        this.toLoadShellScripts()
        this.loadQMetricScript();
        //loadjscssfile(SC_SCRIPT, 'js'); //Adobe script call for ipad issue fix
      } else if(!isIpad && !this.state.isScriptAdded) {
        this.setState({isScriptAdded: true}, 
        this.doGlassboxCheck(sessionStorage.getItem('isGlassboxEnabled')),
        this.loadQMetricScript(),
        this.doNewrelicCheck(true))
        console.log('To load scripts in desktop');
      }
    }

    handleNcRefresh(){
      let location = sessionStorage.getItem("path");
      let page = location && location.substring(location.lastIndexOf("/") + 1, location.length);
      this.props.setCustomerType({"CustomerType":getQueryParamByName("customerType")||sessionStorage.getItem("customerType")});
      this.props.setCreditAppNumber({ "CreditAppNum": getQueryParamByName("creditAppNum") });
      this.props.setLPCartId({ "LPCartId": getQueryParamByName("lpCartId") });
      this.props.setEcreditFlowType({ "ECreditFlowType": getQueryParamByName("flowtype") }); 
      sessionStorage.setItem('creditAppNum', getQueryParamByName("creditAppNum"));
      this.props.setLocationCode({"LocationCode":getQueryParamByName("locationCode")});
      this.props.setRepId({"RepId":getQueryParamByName("salesRepId")});
      this.props.setLoggedInUser({"LoggedInUser":getQueryParamByName("salesRepUserId")});
      this.props.setShellAccountSelected({ "shellAccountSelected": getQueryParamByName("shellAccountSelected") });
      this.props.setCustomerFlowType({"customerFlowType":getQueryParamByName("flowType")});
      this.props.setDoorToDoorExistingCust({"doorTodoorCutomer":getQueryParamByName("isDoorToDoorFlow")||sessionStorage.getItem("isDoorToDoorFlow")});
      this.props.setPromoBundleFlow({"promoBundleFlow":getQueryParamByName("isBundleFlow")||sessionStorage.getItem("promoBundleFlow")});
      this.props.setTysFlow({"isTysFlow":getQueryParamByName("isTysFlow")});
      console.log("QueryParamRemoving");
      domService.removeQueryParamsFromURL();
      if(page.includes('checkout')){
        sessionStorage.setItem('isCheckoutRefresh', true);
      } else { 
        sessionStorage.setItem('isCheckoutRefresh', false);
      }
      if(this.isRedirectNcToLanding(page)) {
        this.props.history.navigatePage(`${ domService.getUIContextPath() }/home.html`);
      } else {
       return this.props.history.navigatePage(`${ domService.getUIContextPath() }/${ page }`);
      } 
    }
    isRedirectNcToLanding(page){
      if(page.includes('shop') || page.includes('pdp') || page.includes('hummodal') || page.includes('ispustorefinder') || page.includes('deviceSimId') || page.includes('down-payment') || page.includes('cpe') || page.includes('discounts')
      || page.includes('viewUsage') || page.includes('e911validation') || page.includes('preferredpricing')){
        return true;
      }
      return false;
    }

  render() {
    let isToLoadPageAgain;
    let isIpad = domService.isIpad();
    const isNewCustomer = sessionStorage.getItem('customerType') === 'N';
    if (!(sessionStorage.getItem("wcmMode") === "DISABLED")) {
      console.log("LOG-DEBUG: App -> Waiting for landing and cart for", window.location.pathname);
      isToLoadPageAgain = this.toRenderOrNotToRender(true);
    } else {
      /*  This block is to retain the same page
          From where the page is refreshed
          in RETAIL application browser refresh button (manual refresh icon on the top right)
      */
      const isFromRetailRefresh = /true/i.test(getQueryParamByName("fromRetailRefresh"));
      if(getQueryParamByName("fromRetailRefresh") !== null && getQueryParamByName("fromRetailRefresh") !== undefined
            && isFromRetailRefresh && sessionStorage.getItem("location") ){
        let nsaLocation = sessionStorage.getItem("location");
        let page = nsaLocation.substring(nsaLocation.lastIndexOf("/") + 1, nsaLocation.length);
        domService.removeQueryParamsFromURL();
        this.props.history.navigatePage(page);
      }
      // else if(getQueryParamByName("refresh") !== null && sessionStorage.getItem('refundexchange') !== null && 
      // sessionStorage.getItem('channel')?.includes("OMNI-INDIRECT") && sessionStorage.getItem("path")!== null){
      else if ((getQueryParamByName("refresh") !==null) && !isNewCustomer &&
       sessionStorage.getItem("path")){
        let path = sessionStorage.getItem("path");
        if (path.substring(path.lastIndexOf("/") + 1, path.length)=="indirect-order-confirmation"){
          let Ocpage = path.substring(path.lastIndexOf("/") + 1, path.length);
          console.log(Ocpage,"came inside global refresh");
          domService.removeQueryParamsFromURL();
          return this.props.history.navigatePage(`${ domService.getUIContextPath() }/${Ocpage}`);
          }
      }
      /* 
        This is to reload same page on click of manual refresh for New customer flow
      */
      else if((getQueryParamByName("customerType") === "N" || getQueryParamByName("flowType") === "winback")
        && window.location.pathname.search("/addLines") > 0 && getQueryParamByName("refresh") !== null && getQueryParamByName("refresh") !== undefined 
        && sessionStorage.getItem('cartId') !== null && sessionStorage.getItem('cartId') !== undefined && sessionStorage.getItem("path") !== null && sessionStorage.getItem("path") !== undefined ){
          console.log("manual refresh came here");
         this.handleNcRefresh();
        }
      else if ((getQueryParamByName("customerType") === "N" || (getQueryParamByName("customerType") === "U" && getQueryParamByName("newPostToPreIndicator")=== "true") || getQueryParamByName("isDoorToDoorFlow") === "true" || getQueryParamByName("flowType") === "winback")
        && window.location.pathname.search("/addLines") > 0)  {
          console.log("manual refresh came here1");
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
      else if(window.location.pathname.search("/tradeInTracker") > 0){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
      else if(getQueryParamByName("isRfexFlow") === "Y"){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
      else if(getQueryParamByName("isCLNRFlow") === "Y"){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
      else if(((getQueryParamByName("customerType") === "N") || (getQueryParamByName("customerType") === "Y")) &&  window.location.pathname.search("/credit") > 0) {
        console.log("LOG-DEBUG: App -> Loading main page for", window.location.pathname);
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
      else if (!this.isPageToSkipLandingCall()) {
        console.log("LOG-DEBUG: App -> Loading main page for", window.location.pathname);
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      } else if (window.location.pathname.search("/customerProfile") > 0) {
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }else if(getQueryParamByName("prospectByodFlow") === "true"){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      } else if (getQueryParamByName("offerEligible")){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }else if (getQueryParamByName("fromLanding")){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }else if (window.location.pathname.search("/shop-accessories") > 0){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      } else if( getQueryParamByName("fromPage") === "CombinedGridwall" && getQueryParamByName("edit") === "true" && window.location.pathname.endsWith("addLines.html")) {
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      } else if(domService.getQueryParamByName("isWHWRedeem") == 'true') {
        isToLoadPageAgain = this.toRenderOrNotToRender();
      }  else if(domService.getQueryParamByName("isMidnightRedeem") == 'true') {
        isToLoadPageAgain = this.toRenderOrNotToRender();
      } else if (getQueryParamByName("isAALOffer") || getQueryParamByName("isAALOffer") === 'true'){
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      } else {
        console.log("LOG-DEBUG: App -> Waiting for landing and cart for", window.location.pathname);
        isToLoadPageAgain = this.toRenderOrNotToRender(true);
      }
    }


    return (
      <div className="session-page" data-testid="App">
        {isToLoadPageAgain}
        {this.toLoadScripts(isIpad)}
        {
          this.showExtendSession && <Modal
            showModal={this.showExtendSession}
            ariaLabel=""
            fullscreen={true}
            closeButton=""
            className="session-page-modal"
          >
            <ModalBody>
              <div className="sessionTimeOutDialog">
                Session timed out, do you want to extend session?
              </div>

              <button data-track="ok" className="sessionButtons sessionPrimaryButton u-text14 bold" type="button"
                onClick={this.extendSession}>
                Ok
              </button>
              <button data-track="cancel" className="sessionButtons sessionSecondButton u-text14 bold" type="button"
                onClick={this.dontExtendSession}>
                Cancel
              </button>
            </ModalBody>

          </Modal>
        }

        {isEnableSalesRecommender() && isEnableSalesNotification() && <SalesRecommenderNotification showNotification={this.state.showNotification} notificationMsg={this.state.notificationMsg} duration={this.state.duration}
        hideNotificaion={() => this.setState({showNotification: false})} customStyle={this.state.customStyle}/>
      }
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getUrlMapping: (data) => dispatch(actions.getUrlMapping(data)),
  getHomeServiceLink: (data) => dispatch(actions.getHomeServiceLink(data)),
  getAccessoryBundleFlag: (data) => dispatch(actions.getAccessoryBundleFlag(data)),
  getMiniCartEnabledFlag: (data) => dispatch(actions.getMiniCartEnabledFlag(data)),
  getLeadsUIEnabledFlag: (data) => dispatch(actions.getLeadsUIEnabledFlag(data)),
  getCreateQuoteBoxEnabled: (data) => dispatch(actions.getCreateQuoteBoxEnabled(data)),
  getViewQrCode: (data) => dispatch(actions.getViewQrCode(data)),
  getNewCustomerQuoteResumeEnabled: (data) => dispatch(actions.getNewCustomerQuoteResumeEnabled(data)),
  getNewCustomerFlowEnabledFlag: (data) => dispatch(actions.getNewCustomerFlowEnabledFlag(data)),
  getNewCustomerInlineQuoteEnabledFlag: (data) => dispatch(actions.getNewCustomerInlineQuoteEnabledFlag(data)),
  getCompareQuoteEnabledFlag: (data) => dispatch(actions.getCompareQuoteEnabledFlag(data)),
  getPlanPerkIndEnableFlag: (data) => dispatch(actions.getPlanPerkIndEnableFlag(data)),
  getNoEmailQuoteCheckbox: (data) => dispatch(actions.getNoEmailQuoteCheckbox(data)),
  getEnableQuoteFeatureUserList: (data) => dispatch(actions.getEnableQuoteFeatureUserList(data)),
  getEnableCompareQuoteTaxWithZipCode: (data) => dispatch(actions.getEnableCompareQuoteTaxWithZipCode(data)),
  getEnableFeedbackFormUserList:(data) => dispatch(actions.getEnableFeedbackFormUserList(data)),
  getCompareQuotePdfEnabled: (data) => dispatch(actions.getCompareQuotePdfEnabled(data)),
  getQuoteLowerBillEnabled: (data) => dispatch(actions.getQuoteLowerBillEnabled(data)),
  getEnableAddNote: (data) => dispatch(actions.getEnableAddNote(data)),
  getEnableSkipMdn: (data) => dispatch(actions.getEnableSkipMdn(data)),
  getEnableTradeInFMILock: (data) => dispatch(actions.getEnableTradeInFMILock(data)),
  getDiscountRequiringActionQuoteEnabled: (data) => dispatch(actions.getDiscountRequiringActionQuoteEnabled(data)),
  getApplyOffersQuoteEnabled: (data) => dispatch(actions.getApplyOffersQuoteEnabled(data)),
  getEstimatedNextBillQuoteEnabled: (data) => dispatch(actions.getEstimatedNextBillQuoteEnabled(data)),
  getCpeWithoutDeviceIdEnabled: (data) => dispatch(actions.getCpeWithoutDeviceIdEnabled(data)),
  getCpeWithoutDeviceIdFlow: (data) => dispatch(actions.getCpeWithoutDeviceIdFlow(data)),
  setChannelDisplayFlags: (data) => dispatch(actions.setChannelDisplayFlags(data)),
  getSkipTradeinDeviceIdQuoteFlag: (data) => dispatch(actions.getSkipTradeinDeviceIdQuoteFlag(data)),
  getTradeInDeviceNotificationFlag: (data) => dispatch(actions.getTradeInDeviceNotificationFlag(data)),
  setTysFlow : (data) => dispatch(actions.setTysFlow(data)),
  initLandingRequest: (accountNo, lookupMtn, channel, orderLocationCode, repId, regNo, caseId, cartId) =>
    dispatch(landingActions.initLandingRequest(accountNo, lookupMtn, channel, orderLocationCode, repId, regNo, caseId, cartId)),
  getLovUrl: (data) => dispatch(actions.getLovUrl(data)),
  initiateRetrieveCartRequest: (data) => dispatch(landingActions.initiateRetrieveCartRequest(data)),
  getIgAdaptiveAuthUrl: (data) =>dispatch(actions.getIgAdaptiveAuthUrl(data)),
  getcustomerAgreementDataUrl: (data) => dispatch(actions.getcustomerAgreementDataUrl(data)),
  getretailIndirectAgreementDataUrl: (data) => dispatch(actions.getretailIndirectAgreementDataUrl(data)),
  getimportantPlanInfoNonProdUrl: (data) => dispatch(actions.getimportantPlanInfoNonProdUrl(data)),
  getimportantPlanInfoProdUrl: (data) => dispatch(actions.getimportantPlanInfoProdUrl(data)),
  getimportantBroadBandInfoNonProdUrl: (data) => dispatch(actions.getimportantBroadBandInfoNonProdUrl(data)),
  getimportantBroadBandInfoProdUrl: (data) => dispatch(actions.getimportantBroadBandInfoProdUrl(data)),
  setCustomerType: (data) => dispatch(actions.setCustomerType(data)),
  setLPCartId: (data) => dispatch(actions.setLPCartId(data)),
  setEcreditFlowType : (data) => dispatch(actions.setEcreditFlowType(data)),
  setShellAccountSelected : (data) => dispatch(actions.setShellAccountSelected(data)),
  setCreditAppNumber : (data) => dispatch(actions.setCreditAppNumber(data)),
  setLocationCode : (data) => dispatch(actions.setLocationCode(data)),
  setRepId : (data) => dispatch(actions.setRepId(data)),
  setfiveGInter : (data) => dispatch(actions.setfiveGInter(data)),
  setfiveGCartId : (data) => dispatch(actions.setfiveGCartId(data)),
  loadEmptyState : () => dispatch(loadEmptyState()),
  setLoggedInUser : (data) => dispatch(actions.setLoggedInUser(data)),
  retriveCartfiveGRequest: (data) => dispatch(landingActions.retriveCartfiveGRequest(data)),
  initLandingRequestNc: (accountNo, lookupMtn, channel, orderLocationCode, repId, regNo, caseId, cartId) =>
    dispatch(landingActions.initLandingRequestNc(accountNo, lookupMtn, channel, orderLocationCode, repId, regNo, caseId, cartId)),
  setReceiveMsgFlag: (data) => dispatch(actions.setReceiveMsgFlag(data)),
  setKeyText: (data) => dispatch(actions.setKeyText(data)),
  getUnlockedDeviceModalContent: (data) => dispatch(actions.getUnlockedDeviceModalContent(data)),
  setEnableAFO: (data) => dispatch(actions.setEnableAFO(data)),
  getChatStoreURL: (data) => dispatch(actions.getChatStoreURL(data)),
  getCovidFiveGApptBanner: (data) => dispatch(actions.getCovidFiveGApptBanner(data)),
  setCustomerFlowType : (data) => dispatch(actions.setCustomerFlowType(data)),
  getfeedbackwikiFlag: (data) => dispatch(actions.getfeedbackwikiFlag(data)),
  getfeedbackwikiUserLocationList: (data) => dispatch(actions.getfeedbackwikiUserLocationList(data)),
  getAssistedQuoteFlag: (data) => dispatch(actions.getAssistedQuoteFlag(data)),
  getFlexPPOEnabledFlag: (data) => dispatch(actions.getFlexPPOEnabledFlag(data)),
  loadUserProfileInfo: (data) => dispatch(actions.loadUserProfileInfo(data)),
  getMyOffersFlag: (data) => dispatch(actions.getMyOffersFlag(data)),
  getEnableDeviceConfig: (data) => dispatch(actions.getEnableDeviceConfig(data)),
  getEnableDeviceConfigLocAndUser: (data) => dispatch(actions.getEnableDeviceConfigLocAndUser(data)),
  getAvaialbleStoresToggleEnabledUsers: (data) => dispatch(actions.getAvaialbleStoresToggleEnabledUsers(data)),
  getDisplayAvailableStoresToggle: (data) => dispatch(actions.getDisplayAvailableStoresToggle(data)),
  getDisplayCustomerInsightsFromAEM: (data) => dispatch(actions.getDisplayCustomerInsightsFromAEM(data)),
  getCustomerInsightsEnabledUsers: (data) => dispatch(actions.getCustomerInsightsEnabledUsers(data)),
  getAppPropertiesFromSessionStorage: (data) => dispatch(actions.getAppPropertiesFromSessionStorage(data)),
  getIsHomeInterntBannerEnabled: (data) => dispatch(actions.getIsHomeInterntBannerEnabled(data)),
  getCpeWithoutDeviceIdChannelsEnabled: (data) => dispatch(actions.getCpeWithoutDeviceIdChannelsEnabled(data)),
  setDoorToDoorExistingCust : (data) => dispatch(actions.setDoorToDoorExistingCust(data)),
  getIsReactiveVikiEnabled: (data) => dispatch(actions.getIsReactiveVikiEnabled(data)),
  setPromoBundleFlow: (data) => dispatch(actions.setPromoBundleFlow(data)),
  setPromoBundlesku: (data) => dispatch(actions.setPromoBundlesku(data)),
  setPromoBundlesku2: (data) => dispatch(actions.setPromoBundlesku2(data)),
  setPromoBundlemtn: (data) => dispatch(actions.setPromoBundlemtn(data)),
  getConflictNotificationFlag: (data) => dispatch(actions.getConflictNotificationFlag(data)),
  getDisableSharedPlanForNSE: (data) => dispatch(actions.getDisableSharedPlanForNSE(data)),
  getShowNseNextBillSummary: (data) => dispatch(actions.getShowNseNextBillSummary(data)),
  getProductionReadyUIChanges: (data) => dispatch(actions.getProductionReadyUIChanges(data)),
  getShowQuoteOthVenAddon: (data) => dispatch(actions.getShowQuoteOthVenAddon(data)),
  setIntendTypeForADEX: (data) => dispatch(actions.setIntendTypeForADEX(data)),
  setNetworkBandWidthIndicator: (data) => dispatch(actions.setNetworkBandWidthIndicator(data)),
  setCustomerTypeForADEX: (data) => dispatch(actions.setCustomerTypeForADEX(data)),
  setComboOrderAllowed: (data) => dispatch(actions.setComboOrderAllowed(data)),
  initCreateCart: (data) => dispatch(landingActions.initCreateCart(data)),
  getValidateEmailEnabled: (data) => dispatch(actions.getValidateEmailEnabled(data)),
  getDisableAALDeviceSelectionRestrictionForTechCoachRep:(data) => dispatch(actions.getDisableAALDeviceSelectionRestrictionForTechCoachRep(data)),
  getDisableProfileChangeRestrictionForTechCoachRep:(data) => dispatch(actions.getDisableProfileChangeRestrictionForTechCoachRep(data)),
  getDisableInspicioChangeRestrictionForTechCoachRep:(data) => dispatch(actions.getDisableInspicioChangeRestrictionForTechCoachRep(data)),
  getdDisableAccessoryForTechCoachRep: (data) => dispatch(actions.getDisableAccessoryForTechCoachRep(data)),
  getDisableTradeInForTechCoachRep: (data) => dispatch(actions.getDisableTradeInForTechCoachRep(data)),
  getDisableMobilityForTechCoachRep: (data) => dispatch(actions.getDisableMobilityForTechCoachRep(data)),
  getContractCompatibility: (data) => dispatch(actions.getContractCompatibility(data)),
  getAffirmFinancingEnabled: (data) => dispatch(actions.getAffirmFinancingEnabled(data)),
  getIsLocalPreBackOrder: (data) => dispatch(actions.getIsLocalPreBackOrder(data)),
  getAddNewQuoteEnabled: (data) => dispatch(actions.getAddNewQuoteEnabled(data)),
  getLineDeleteOptionEnabled: (data) => dispatch(actions.getLineDeleteOptionEnabled(data)),
  getNextBillSummaryLink: (data) => dispatch(actions.getNextBillSummaryLink(data)),
  getFiveGProfInstallCharges: (data) => dispatch(actions.getFiveGProfInstallCharges(data)),
  triggerGetWHWRedeemFlow: (payload) => dispatch(landingActions.triggerGetWHWRedeemFlow(payload)),
  setMidnightRedeem: (payload) => dispatch(landingActions.setMidnightRedeem(payload))
});

const mapStateToProps = createStructuredSelector({
  landing: makeSelectLanding(),
  getWHWRedeemFlow: getWHWRedeemFlow(),
  isMidnightRedeem: getMidnightRedeem()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const landingKey = "landing";
const superPromoKey = "SuperPromoStore";
const insightsKey = "CustomerInsights";
const apiConsoleKey = "apiConsole";
const CreditKey = "Credit";
const OrderReviewKey = "OrderReview";
const accessoryGWKey = "accessoryGridwall";
const salesRecommenderNotificationKey = "salesRecommenderNotification";

const withReducer = injectReducer({ key, reducer });
const withLandingReducer = injectReducer({ key: landingKey, reducer: landingReducer });
const withSuperPromoReducer = injectReducer({ key:superPromoKey, reducer: superPromoReducer});
const withApiConsoleReducer = injectReducer({ key: apiConsoleKey, reducer: apiConsoleReducer });
const withLandingSaga = injectSaga({ key: landingKey, saga: landingSaga });
const withSuperPromoSaga = injectSaga({ key: superPromoKey, saga: superPromoSaga });
const withInsightsSaga = injectSaga({ key: insightsKey, saga: customerInsightsSaga });
const withInsightsReducer = injectReducer({ key: insightsKey, reducer: customerInsightsReducer });
const withCreditReducer = injectReducer({ key: CreditKey, reducer: CreditReducer });
const withCreditSaga = injectSaga({ key: CreditKey, saga: CreditSaga });
const withAccessoryGWSaga = injectSaga({ key: accessoryGWKey, saga: accessoryGWSaga });
const withAccessoryGWReducer = injectReducer({ key: accessoryGWKey, reducer: accessoryReducer });
const withOrderReviewReducer = injectReducer({ key: OrderReviewKey , reducer: orederReviewReducer });
const WithSalesRecommenderNotificationSaga = injectSaga({ key: salesRecommenderNotificationKey, saga: SalesRecommenderNotificationSaga });

export default (
  compose(
    withRouterV6,
    withReducer,
    withLandingReducer,
    withInsightsSaga,
    withInsightsReducer,
    withSuperPromoReducer,
    withCreditReducer,
    withOrderReviewReducer,
    withApiConsoleReducer,
    withLandingSaga,
    withSuperPromoSaga,
    withAccessoryGWSaga,
    withAccessoryGWReducer,
    withModel,
    withConnect,
    withPeripherals,
    withCreditSaga,
    WithSalesRecommenderNotificationSaga
  )(App)
);
