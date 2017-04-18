import Constants from '../constants';

let showStatusList = () => {
  return {
    type: Constants.SHOW_STATUS_LIST
  }
};

let hideStatusList = () => {
  return {
    type: Constants.HIDE_STATUS_LIST
  }
};

let switchTab = (nextTabId) => {
  return {
    type: Constants.SWITCH_TAB,
    nextTabId: nextTabId
  }
};

let chooseStatus = (statusId) => {
  return {
    type: Constants.SELECT_STATUS,
    statusId: statusId
  }
}

let changeMonth = (nextMonth) => {
  return {
    type: Constants.CHANGE_MONTH,
    nextMonth: nextMonth
  }
}

let submitStatus = (statusInfo) => {
  return {
    type: Constants.SUBMIT_STATUS,
    statusInfo: statusInfo
  }
}
