import React from 'react'
import Toastify from 'toastify-js'

function notifySuccess(message) {
 Toastify({
  text: message,
  className: "info",
  style:{
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  }
 }).showToast();
}

function notifyFail(message) {
  Toastify({
   text: message,
   className: "info",
   style:{
     background: "linear-gradient(to right, #cb2d3e, #ef473a)",
   }
  }).showToast();
 }

export {notifySuccess, notifyFail}