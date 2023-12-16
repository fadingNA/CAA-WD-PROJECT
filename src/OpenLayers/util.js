import * as React from "react";

function getOptions(props) {
  let options = {};
  for (let key in props) {
    if (
      key !== "children" &&
      typeof props[key] !== "undefined" &&
      !key.match(/^on[A-Z]/)
    ) {
      options[key] = props[key];
    }
  }
  return options;
}

function getPropsKey(eventName) {
  return (
    "on" +
    eventName
      .replace(/(\:[a-z])/g, ($1) => $1.toUpperCase())
      .replace(/^[a-z]/, ($1) => $1.toUpperCase())
      .replace(":", "")
  );
}

function getEvents(events = {}, props = {}) {
  let prop2EventMap = {};
  for (let key in events) {
    prop2EventMap[getPropsKey(key)] = key;
  }
  let ret = {};
  for (let propName in props) {
    let eventName = prop2EventMap[propName];
    let prop = props[propName];
    if (
      typeof prop !== "undefined" &&
      propName.match(/^on[A-Z]/) &&
      eventName
    ) {
      ret[eventName] = prop;
    }
  }
  return ret;
}

function typeOf(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

function cloneObject(obj) {
  var type = typeOf(obj);
  if (type === "object" || type === "array") {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type === "array" ? [] : {};
    for (var key in obj) {
      clone[key] = cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
}

function findChild(children, childType) {
  let found;
  let childrenArr = React.Children.toArray(children);
  for (let i = 0; i < childrenArr.length; i++) {
    let child = childrenArr[i];
    if (child.type === childType) {
      found = child;
      break;
    }
  }
  return found;
}

export const Util = {
  getOptions,
  getEvents,
  cloneObject,
  findChild,
};
